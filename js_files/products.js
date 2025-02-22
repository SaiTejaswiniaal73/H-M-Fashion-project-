

// Fetch products from API and display based on category or search query
async function fetchProducts() {
    try {
        const response = await fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH");
        const data = await response.json();
        if (!data.length || !data[0]?.products) throw new Error("Invalid product data");
        
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get("category") || "all";
        const searchQuery = urlParams.get("search")?.trim()?.toLowerCase();
        
        displayProducts(filterProducts(data[0].products, category, searchQuery));
    } catch (error) {
        console.error("Error fetching products:", error);
        document.getElementById("products-container").innerHTML = "<p>Error loading products.</p>";
    }
}

// Filter products based on category or search query
function filterProducts(products, category, searchQuery) {
    const availableCategories = ["women", "men", "kids", "baby"];
    let filteredProducts = [];
    
    if (category !== "all" && availableCategories.includes(category)) {
        filteredProducts = products[category] || [];
    } else {
        availableCategories.forEach(cat => {
            if (products[cat]) {
                filteredProducts = [...filteredProducts, ...products[cat]];
            }
        });
    }
    
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
    const mainDiv = document.getElementById("products-container");
    mainDiv.innerHTML = ""; // Clear previous content
    
    if (products.length === 0) {
        mainDiv.innerHTML = "<p id='no-results'>No products found.</p>";
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
        
        mainDiv.appendChild(productBox);
    });
}

// Handle category change without reloading the page
function handleCategoryChange(category) {
    const url = new URL(window.location);
    url.searchParams.set("category", category);
    history.pushState({}, "", url);
    fetchProducts();
}

// Initial fetch on page load
document.addEventListener("DOMContentLoaded", fetchProducts);

// Function to add a product to favorites
function addToFavorites(productId) {
    const product = findProductById(productId);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if the product is already in favorites
    if (!favorites.find(item => item.id === product.id)) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${product.name} added to favorites!`); // Optional: Show a message
    }
}


// just know adding thiz 22-2-25

//adding know foe cars

// Add product to favorites
function addToFavorites(productId) {
    let product = findProductById(productId);
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.find(item => item.id === product.id)) {
        favorites.push(product);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert(`${product.name} added to wishlist!`);
    }
    updateCounts();
}

// Add product to cart
function addToCart(productId) {
    let product = findProductById(productId);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
    updateCounts();
}

// Find product by ID
function findProductById(productId) {
    let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
    return allProducts.find(product => product.id === productId);
}

// Update cart & wishlist counts
function updateCounts() {
    document.getElementById("cart-count").innerText = JSON.parse(localStorage.getItem("cart"))?.length || 0;
    document.getElementById("wishlist-count").innerText = JSON.parse(localStorage.getItem("favorites"))?.length || 0;
}
