// // Global variable to store fetched product data
// let globalProductData = null;

// // Fetch products from API and display them based on category or search query
// async function fetchProducts() {
//     try {
//         const response = await fetch("https://679ba6ae33d316846324a4ae.mockapi.io/practise");
//         const data = await response.json();
//         console.log("Fetched data:", data);
        
//         // Adjusted validation: check for data[0].products instead of productsByCategory
//         let productData;
//         if (Array.isArray(data) && data.length > 0 && data[0].products) {
//             productData = data[0];
//         } else if (data.products) {
//             productData = data;
//         } else {
//             throw new Error("Invalid product data");
//         }
        
//         // Store globally for use in functions like findProductById
//         globalProductData = productData;
        
//         // Get category and search query from URL parameters
//         const urlParams = new URLSearchParams(window.location.search);
//         const category = urlParams.get("category") || "all";
//         const searchQuery = urlParams.get("search")?.trim()?.toLowerCase();
        
//         const filteredProducts = filterProducts(productData, category, searchQuery);
//         displayProducts(filteredProducts);
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         document.getElementById("products-container").innerHTML = "<p>Error loading products.</p>";
//     }
// }

// // Filter products based on category or search query
// function filterProducts(productData, category, searchQuery) {
//     const availableCategories = ["women", "men", "kids", "baby"];
//     let filteredProducts = [];
    
//     // Use productData.products (the key returned by the API)
//     if (category !== "all" && availableCategories.includes(category)) {
//         filteredProducts = productData.products[category] || [];
//     } else {
//         // Combine all products from all categories when "all" is selected
//         availableCategories.forEach(cat => {
//             if (productData.products[cat]) {
//                 filteredProducts = [...filteredProducts, ...productData.products[cat]];
//             }
//         });
//     }
    
//     if (searchQuery) {
//         filteredProducts = filteredProducts.filter(product =>
//             product.name.toLowerCase().includes(searchQuery) ||
//             product.description.toLowerCase().includes(searchQuery)
//         );
//     }
    
//     return filteredProducts;
// }

// // Display products in the DOM
// function displayProducts(products) {
//     const container = document.getElementById("products-container");
//     container.innerHTML = ""; // Clear previous content
    
//     if (!products || products.length === 0) {
//         container.innerHTML = "<p id='no-results'>No products found.</p>";
//         return;
//     }
    
//     products.forEach(product => {
//         const productBox = document.createElement("div");
//         productBox.classList.add("product-box");
//         productBox.innerHTML = `
//             <img src="${product.image}" alt="${product.name}" class="product-image"/>
//             <h3 class="product-title">${product.name}</h3>
//             <h4 class="product-price">₹${product.price}</h4>
//             <p class="product-description">${product.description}</p>
//             <p class="product-sizes">Sizes: ${product.sizes.join(", ")}</p>
//             <p class="product-colors">Colors: ${product.colors.join(", ")}</p>
//             <div class="product-buttons">
//                 <button class="heart-button" onclick="addToFavorites(${product.id})">❤️ Add to Favorites</button>
//                 <button class="cart-button" onclick="addToCart(${product.id})">🛒 Add to Cart</button>
//             </div>
//         `;
//         container.appendChild(productBox);
//     });
// }

// // Handle category change without reloading the page
// function handleCategoryChange(category) {
//     const url = new URL(window.location);
//     url.searchParams.set("category", category);
//     history.pushState({}, "", url);
//     fetchProducts();
// }

// // Add product to favorites using localStorage
// function addToFavorites(productId) {
//     const product = findProductById(productId);
//     let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//     if (!favorites.find(item => item.id === product.id)) {
//         favorites.push(product);
//         localStorage.setItem('favorites', JSON.stringify(favorites));
//         alert(`${product.name} added to favorites!`);
//     } else {
//         alert(`${product.name} is already in favorites.`);
//     }
// }

// // Add product to cart using localStorage
// function addToCart(productId) {
//     const product = findProductById(productId);
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     if (!cart.find(item => item.id === product.id)) {
//         cart.push(product);
//         localStorage.setItem('cart', JSON.stringify(cart));
//         alert(`${product.name} added to cart!`);
//     } else {
//         alert(`${product.name} is already in the cart.`);
//     }
// }

// // Find a product by its ID from allProducts or products by category
// function findProductById(productId) {
//     if (globalProductData && globalProductData.allProducts) {
//         const found = globalProductData.allProducts.find(product => product.id === productId);
//         if (found) return found;
//     }
//     if (globalProductData && globalProductData.products) {
//         for (let cat in globalProductData.products) {
//             const product = globalProductData.products[cat].find(p => p.id === productId);
//             if (product) return product;
//         }
//     }
//     return null;
// }

// // Initialize fetch when the DOM is fully loaded
// document.addEventListener("DOMContentLoaded", fetchProducts);






// Global variable to store fetched product data for later use (e.g. in findProductById)
let globalProductData = null;

// Fetch products from API and display them based on category or search query
async function fetchProducts() {
    try {
        const response = await fetch("https://679ba6ae33d316846324a4ae.mockapi.io/practise");
        const data = await response.json();
        console.log("Fetched data:", data);
        
        // Check that data was returned
        if (!data.length) {
            throw new Error("No data returned");
        }
        
        // Determine which key holds the category products
        let productsForFiltering = null;
        // New API model uses "productsByCategory"
        if (data[0].productsByCategory) {
            productsForFiltering = data[0].productsByCategory;
        }
        // Fallback to the past API structure which uses "products"
        else if (data[0].products) {
            productsForFiltering = data[0].products;
        } else {
            throw new Error("Invalid product data");
        }
        
        // Save full data globally for functions like findProductById (using allProducts)
        globalProductData = data[0];
        
        // Get URL parameters for category and search query
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get("category") || "all";
        const searchQuery = urlParams.get("search")?.trim()?.toLowerCase();
        
        // Filter and display the products
        const filtered = filterProducts(productsForFiltering, category, searchQuery);
        displayProducts(filtered);
    } catch (error) {
        console.error("Error fetching products:", error);
        document.getElementById("products-container").innerHTML = "<p>Error loading products.</p>";
    }
}

// Filter products based on category or search query
function filterProducts(products, category, searchQuery) {
    const availableCategories = ["women", "men", "kids", "baby"];
    let filteredProducts = [];
    
    // If a specific category is selected, use that; otherwise combine all categories.
    if (category !== "all" && availableCategories.includes(category)) {
        filteredProducts = products[category] || [];
    } else {
        availableCategories.forEach(cat => {
            if (products[cat]) {
                filteredProducts = [...filteredProducts, ...products[cat]];
            }
        });
    }
    
    // Apply search query filtering if provided
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery) ||
            product.description.toLowerCase().includes(searchQuery)
        );
    }
    
    return filteredProducts;
}

// Display products in the DOM
function displayProducts(products) {
    const container = document.getElementById("products-container");
    container.innerHTML = ""; // Clear previous content
    
    if (!products || products.length === 0) {
        container.innerHTML = "<p id='no-results'>No products found.</p>";
        return;
    }
    
    products.forEach(product => {
        const productBox = document.createElement("div");
        productBox.classList.add("product-box");
        productBox.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image"/>
            <h3 class="product-title">${product.name}</h3>
            <h4 class="product-price">₹${product.price}</h4>
            <p class="product-description">${product.description}</p>
            <p class="product-sizes">Sizes: ${product.sizes.join(", ")}</p>
            <p class="product-colors">Colors: ${product.colors.join(", ")}</p>
            <div class="product-buttons">
                <button class="heart-button" onclick="addToFavorites(${product.id})">❤️ Add to Favorites</button>
                <button class="cart-button" onclick="addToCart(${product.id})">🛒 Add to Cart</button>
            </div>
        `;
        container.appendChild(productBox);
    });
}

// Handle category change without reloading the page
function handleCategoryChange(category) {
    const url = new URL(window.location);
    url.searchParams.set("category", category);
    history.pushState({}, "", url);
    fetchProducts();
}

// Add a product to favorites using localStorage
function addToFavorites(productId) {
    const product = findProductById(productId);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Check if the product is already in favorites
    if (!favorites.find(item => item.id === product.id)) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${product.name} added to favorites!`);
    } else {
        alert(`${product.name} is already in favorites.`);
    }
}

// Add a product to cart using localStorage
function addToCart(productId) {
    const product = findProductById(productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if the product is already in the cart
    if (!cart.find(item => item.id === product.id)) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    } else {
        alert(`${product.name} is already in the cart.`);
    }
}

// Find a product by its ID using the global data (searches in allProducts first, then by category)
function findProductById(productId) {
    if (globalProductData && globalProductData.allProducts) {
        const found = globalProductData.allProducts.find(product => product.id === productId);
        if (found) return found;
    }
    if (globalProductData) {
        // Determine which key holds the category products (could be productsByCategory or products)
        const productGroups = globalProductData.productsByCategory || globalProductData.products;
        if (productGroups) {
            for (let cat in productGroups) {
                const product = productGroups[cat].find(p => p.id === productId);
                if (product) return product;
            }
        }
    }
    return null;
}

// Initial fetch on page load
document.addEventListener("DOMContentLoaded", fetchProducts);



// new api

// Global variable to store fetched product data for later use
let globalProductData = null;

// Fetch products from API and display them based on category or search query
async function fetchProducts() {
    try {
        const response = await fetch("https://679ba6ae33d316846324a4ae.mockapi.io/practise");
        const data = await response.json();
        console.log("Fetched data:", data);
        
        // Check if data is valid; we expect an array with an object containing a "products" key
        if (!Array.isArray(data) || data.length === 0 || !data[0]?.products) {
            console.error("No or invalid data returned from API");
            throw new Error("Invalid product data");
        }
        
        // Use the "products" key from the first element of the array
        const productsData = data[0].products;
        // Save full data globally for lookup functions (e.g., using allProducts)
        globalProductData = data[0];
        
        // Get URL parameters for category and search query
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get("category") || "all";
        const searchQuery = urlParams.get("search")?.trim()?.toLowerCase();
        
        // Filter and display the products
        const filteredProducts = filterProducts(productsData, category, searchQuery);
        displayProducts(filteredProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
        document.getElementById("products-container").innerHTML = "<p>Error loading products.</p>";
    }
}

// Filter products based on category or search query
function filterProducts(products, category, searchQuery) {
    const availableCategories = ["women", "men", "kids", "baby"];
    let filteredProducts = [];
    
    // If a specific category is selected and exists, use that array; otherwise, combine all categories
    if (category !== "all" && availableCategories.includes(category)) {
        filteredProducts = products[category] || [];
    } else {
        availableCategories.forEach(cat => {
            if (products[cat]) {
                filteredProducts = [...filteredProducts, ...products[cat]];
            }
        });
    }
    
    // Apply search filter if provided
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery) ||
            product.description.toLowerCase().includes(searchQuery)
        );
    }
    
    return filteredProducts;
}

// Display products in the DOM in a grid format
function displayProducts(products) {
    const container = document.getElementById("products-container");
    container.innerHTML = ""; // Clear previous content
    
    if (!products || products.length === 0) {
        container.innerHTML = "<p id='no-results'>No products found.</p>";
        return;
    }
    
    products.forEach(product => {
        const productBox = document.createElement("div");
        productBox.classList.add("product-box");
        productBox.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image"/>
            <h3 class="product-title">${product.name}</h3>
            <h4 class="product-price">₹${product.price}</h4>
            <p class="product-description">${product.description}</p>
            <p class="product-sizes">Sizes: ${product.sizes.join(", ")}</p>
            <p class="product-colors">Colors: ${product.colors.join(", ")}</p>
            <div class="product-buttons">
                <button class="heart-button" onclick="addToFavorites(${product.id})">❤️ Add to Favorites</button>
                <button class="cart-button" onclick="addToCart(${product.id})">🛒 Add to Cart</button>
            </div>
        `;
        container.appendChild(productBox);
    });
}

// Handle category change without reloading the page
function handleCategoryChange(category) {
    const url = new URL(window.location);
    url.searchParams.set("category", category);
    history.pushState({}, "", url);
    fetchProducts();
}

// Add a product to favorites using localStorage
function addToFavorites(productId) {
    const product = findProductById(productId);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.find(item => item.id === product.id)) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${product.name} added to favorites!`);
    }
}

// Add a product to the cart using localStorage
function addToCart(productId) {
    const product = findProductById(productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.find(item => item.id === product.id)) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    }
}

// Find a product by its ID from global data (searches in allProducts then by category)
function findProductById(productId) {
    if (globalProductData && globalProductData.allProducts) {
        const found = globalProductData.allProducts.find(product => product.id === productId);
        if (found) return found;
    }
    if (globalProductData && globalProductData.products) {
        const productsByCategory = globalProductData.products;
        const availableCategories = ["women", "men", "kids", "baby"];
        for (let cat of availableCategories) {
            if (productsByCategory[cat]) {
                const product = productsByCategory[cat].find(p => p.id === productId);
                if (product) return product;
            }
        }
    }
    return null;
}

// Initial fetch on page load
document.addEventListener("DOMContentLoaded", fetchProducts);


//after rocu coart fav
// Global variable to store fetched product data for later use
let globalProductData = null;

// Fetch products from API and display them based on category or search query
async function fetchProducts() {
    try {
        const response = await fetch("https://679ba6ae33d316846324a4ae.mockapi.io/practise");
        const data = await response.json();
        console.log("Fetched data:", data);
        
        // Check if data is valid; we expect an array with an object containing a "products" key
        if (!Array.isArray(data) || data.length === 0 || !data[0]?.products) {
            console.error("No or invalid data returned from API");
            throw new Error("Invalid product data");
        }
        
        // Use the "products" key from the first element of the array
        const productsData = data[0].products;
        // Save full data globally for lookup functions (e.g., using allProducts)
        globalProductData = data[0];
        
        // Get URL parameters for category and search query
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get("category") || "all";
        const searchQuery = urlParams.get("search")?.trim()?.toLowerCase();
        
        // Filter and display the products
        const filteredProducts = filterProducts(productsData, category, searchQuery);
        displayProducts(filteredProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
        document.getElementById("products-container").innerHTML = "<p>Error loading products.</p>";
    }
}

// Filter products based on category or search query
function filterProducts(products, category, searchQuery) {
    const availableCategories = ["women", "men", "kids", "baby"];
    let filteredProducts = [];
    
    // If a specific category is selected and exists, use that array; otherwise, combine all categories
    if (category !== "all" && availableCategories.includes(category)) {
        filteredProducts = products[category] || [];
    } else {
        availableCategories.forEach(cat => {
            if (products[cat]) {
                filteredProducts = [...filteredProducts, ...products[cat]];
            }
        });
    }
    
    // Apply search filter if provided
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery) ||
            product.description.toLowerCase().includes(searchQuery)
        );
    }
    
    return filteredProducts;
}

// Display products in the DOM in a grid format
function displayProducts(products) {
    const container = document.getElementById("products-container");
    container.innerHTML = ""; // Clear previous content
    
    if (!products || products.length === 0) {
        container.innerHTML = "<p id='no-results'>No products found.</p>";
        return;
    }
    
    products.forEach(product => {
        const productBox = document.createElement("div");
        productBox.classList.add("product-box");
        productBox.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image"/>
            <h3 class="product-title">${product.name}</h3>
            <h4 class="product-price">₹${product.price}</h4>
            <p class="product-description">${product.description}</p>
            <p class="product-sizes">Sizes: ${product.sizes.join(", ")}</p>
            <p class="product-colors">Colors: ${product.colors.join(", ")}</p>
            <div class="product-buttons">
                <button class="heart-button" onclick="addToFavorites(${product.id})">❤️ Add to Favorites</button>
                <button class="cart-button" onclick="addToCart(${product.id})">🛒 Add to Cart</button>
            </div>
        `;
        container.appendChild(productBox);
    });
}

// Handle category change without reloading the page
function handleCategoryChange(category) {
    const url = new URL(window.location);
    url.searchParams.set("category", category);
    history.pushState({}, "", url);
    fetchProducts();
}

// Find a product by its ID from global data (searches in allProducts then by category)
function findProductById(productId) {
    if (globalProductData && globalProductData.allProducts) {
        const found = globalProductData.allProducts.find(product => product.id === productId);
        if (found) return found;
    }
    if (globalProductData && globalProductData.products) {
        const productsByCategory = globalProductData.products;
        const availableCategories = ["women", "men", "kids", "baby"];
        for (let cat of availableCategories) {
            if (productsByCategory[cat]) {
                const product = productsByCategory[cat].find(p => p.id === productId);
                if (product) return product;
            }
        }
    }
    return null;
}



// Initial fetch on page load
document.addEventListener("DOMContentLoaded", fetchProducts);

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = findProductById(productId);

    if (!product) {
        console.error("Product not found!");
        return;
    }

    let existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Show Toast Notification
function showNotification(message) {
    let notification = document.createElement("div");
    notification.className = "toast-notification";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("fade-out");
        setTimeout(() => notification.remove(), 500);
    }, 2000);
}

// Update Cart Count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}

// Call updateCartCount on page load
document.addEventListener("DOMContentLoaded", updateCartCount);


function addToFavorites(productId) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let product = findProductById(productId);

    if (!product) {
        console.error("Product not found!");
        return;
    }

    if (!wishlist.some(item => item.id === product.id)) {
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert("Added to Wishlist!");
    } else {
        alert("Already in Wishlist!");
    }
}
document.addEventListener("DOMContentLoaded", updateCartCount);
