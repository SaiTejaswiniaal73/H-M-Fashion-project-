

// // Function to handle search
// function handleSearch(event) {
//     if (event) event.preventDefault(); // Prevent form submission if triggered from a form

//     // Get search query from both search bars
//     let searchQuery = document.getElementById("search-input")?.value.toLowerCase().trim() || 
//                       document.getElementById("searchInput")?.value.toLowerCase().trim();

//     if (!searchQuery) {
//         alert("Please enter a search term.");
//         return;
//     }

//     // Fetch products from API
//     fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH")
//         .then(response => response.json())
//         .then(products => {
//             let filteredProducts = [];

//             const availableCategories = ["women", "men", "kids", "baby"];
//             availableCategories.forEach(category => {
//                 if (products[0].products[category]) {
//                     filteredProducts = [
//                         ...filteredProducts,
//                         ...products[0].products[category].filter(product =>
//                             product.name.toLowerCase().includes(searchQuery)
//                         ),
//                     ];
//                 }
//             });

//             displayProducts(filteredProducts);
//         })
//         .catch(error => console.error("Error fetching products:", error));
// }

// // Attach event listener to **desktop search form**
// document.querySelector(".search-container").addEventListener("submit", handleSearch);

// // Attach event listener to **mobile search button**
// document.getElementById("searchBtn").addEventListener("click", function () {
//     handleSearch();
// });

// // Allow **Enter key** to trigger search in mobile input field
// document.getElementById("searchInput").addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//         handleSearch();
//     }
// });

// // Function to display filtered products
// function displayProducts(filteredProducts) {
//     const mainDiv = document.getElementById("products-container"); 
//     mainDiv.innerHTML = ""; // Clear any previously displayed products

//     if (filteredProducts.length === 0) {
//         mainDiv.innerHTML = "<p>No products found.</p>"; // Show message if no results
//         return;
//     }

//     // Display the filtered products
//     filteredProducts.forEach(product => {
//         let box = document.createElement("div");
//         box.classList.add("product-box");

//         let title = document.createElement("h3");
//         let poster = document.createElement("img");
//         let price = document.createElement("h4");
//         let description = document.createElement("p");
//         let sizes = document.createElement("p");
//         let colors = document.createElement("p");
//         let buttonsDiv = document.createElement("div");
//         buttonsDiv.classList.add("product-buttons");

//         // Set product details
//         title.innerHTML = product.name;
//         title.classList.add("product-title");

//         poster.src = product.image;
//         poster.classList.add("product-image");

//         price.innerHTML = `₹${product.price}`;
//         price.classList.add("product-price");

//         description.innerHTML = product.description;
//         description.classList.add("product-description");

//         sizes.innerHTML = `Sizes: ${product.sizes.join(", ")}`;
//         sizes.classList.add("product-sizes");

//         colors.innerHTML = `Colors: ${product.colors.join(", ")}`;
//         colors.classList.add("product-colors");

//         // Create buttons
//         let heartButton = document.createElement("button");
//         heartButton.innerHTML = "❤️ Add to Favorites";
//         heartButton.classList.add("heart-button");
//         heartButton.onclick = () => addToFavorites(product.id);

//         let cartButton = document.createElement("button");
//         cartButton.innerHTML = "🛒 Add to Cart";
//         cartButton.classList.add("cart-button");
//         cartButton.onclick = () => addToCart(product.id);

//         buttonsDiv.append(heartButton, cartButton);

//         // Assemble product box
//         box.append(poster, title, price, description, sizes, colors, buttonsDiv);
//         mainDiv.append(box);
//     });
// }

// // Attach event listener to the mobile search button
// document.getElementById("searchBtn").addEventListener("click", function () {
//     handleSearch(new Event("submit")); // Simulate form submission
// });

// // Allow "Enter" key to trigger search in the mobile input field
// document.getElementById("searchInput").addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//         handleSearch(event);
//     }
// });



// with all the thing 

// // Function to handle search
// function handleSearch(event) {
//     if (event) event.preventDefault(); // Prevent form submission if triggered from a form

//     // Get search query from both search bars
//     let searchQuery = document.getElementById("search-input")?.value.toLowerCase().trim() || 
//                       document.getElementById("searchInput")?.value.toLowerCase().trim();

//     if (!searchQuery) {
//         document.getElementById("products-container").innerHTML = "<p>Please enter a search term.</p>";
//         return;
//     }

//     // Fetch products from API
//     fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH")
//         .then(response => response.json())
//         .then(products => {
//             let filteredProducts = [];

//             if (products.length > 0) {
//                 const availableCategories = ["women", "men", "kids", "baby"];
//                 availableCategories.forEach(category => {
//                     if (products[0]?.products?.[category]) {
//                         filteredProducts = [
//                             ...filteredProducts,
//                             ...products[0].products[category].filter(product =>
//                                 product.name.toLowerCase().includes(searchQuery)
//                             ),
//                         ];
//                     }
//                 });
//             }

//             displayProducts(filteredProducts);
//         })
//         .catch(error => console.error("Error fetching products:", error));
// }

// // Attach event listeners
// document.querySelector(".search-container")?.addEventListener("submit", handleSearch);
// document.getElementById("searchBtn")?.addEventListener("click", handleSearch);
// document.getElementById("searchInput")?.addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//         handleSearch(event);
//     }
// });

// // Function to display filtered products
// function displayProducts(filteredProducts) {
//     const mainDiv = document.getElementById("products-container"); 
//     mainDiv.innerHTML = ""; // Clear any previously displayed products

//     if (!filteredProducts.length) {
//         mainDiv.innerHTML = "<p>No products found.</p>"; // Show message if no results
//         return;
//     }

//     // Display the filtered products
//     filteredProducts.forEach(product => {
//         let box = document.createElement("div");
//         box.classList.add("product-box");

//         let title = document.createElement("h3");
//         let poster = document.createElement("img");
//         let price = document.createElement("h4");
//         let description = document.createElement("p");
//         let sizes = document.createElement("p");
//         let colors = document.createElement("p");
//         let buttonsDiv = document.createElement("div");
//         buttonsDiv.classList.add("product-buttons");

//         // Set product details
//         title.textContent = product.name;
//         title.classList.add("product-title");

//         poster.src = product.image;
//         poster.classList.add("product-image");
//         poster.alt = product.name;

//         price.textContent = `₹${product.price}`;
//         price.classList.add("product-price");

//         description.textContent = product.description;
//         description.classList.add("product-description");

//         sizes.textContent = `Sizes: ${product.sizes.join(", ")}`;
//         sizes.classList.add("product-sizes");

//         colors.textContent = `Colors: ${product.colors.join(", ")}`;
//         colors.classList.add("product-colors");

//         // Create buttons
//         let heartButton = document.createElement("button");
//         heartButton.textContent = "❤️ Add to Favorites";
//         heartButton.classList.add("heart-button");
//         heartButton.onclick = () => addToFavorites(product.id);

//         let cartButton = document.createElement("button");
//         cartButton.textContent = "🛒 Add to Cart";
//         cartButton.classList.add("cart-button");
//         cartButton.onclick = () => addToCart(product.id);

//         buttonsDiv.append(heartButton, cartButton);

//         // Assemble product box
//         box.append(poster, title, price, description, sizes, colors, buttonsDiv);
//         mainDiv.append(box);
//     });
// }

// // Placeholder functions for adding items
// function addToFavorites(productId) {
//     console.log(`Added product ${productId} to favorites`);
// }

// function addToCart(productId) {
//     console.log(`Added product ${productId} to cart`);
// }


//with buttons

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input") || document.getElementById("searchInput");
    const searchButton = document.getElementById("searchBtn");
    const productContainer = document.getElementById("products-container");
    const searchForm = document.querySelector(".search-container");

    let allProducts = [];

    // Function to fetch and store products
    function fetchProducts() {
        fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH")
            .then(response => response.json())
            .then(products => {
                if (products.length > 0) {
                    const availableCategories = ["women", "men", "kids", "baby"];
                    allProducts = [];

                    availableCategories.forEach(category => {
                        if (products[0]?.products?.[category]) {
                            allProducts = [...allProducts, ...products[0].products[category]];
                        }
                    });

                    displayProducts(allProducts);
                }
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                productContainer.innerHTML = "<p>Failed to load products. Please try again later.</p>";
            });
    }

    // Function to handle search
    function handleSearch(event) {
        if (event) event.preventDefault(); // Prevent form submission if triggered from a form

        const searchQuery = searchInput?.value.toLowerCase().trim();
        
        if (!searchQuery) {
            productContainer.innerHTML = "<p>Please enter a search term.</p>";
            return;
        }

        const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery) ||
            product.description.toLowerCase().includes(searchQuery)
        );

        displayProducts(filteredProducts);
    }

    // Function to display filtered products
    function displayProducts(products) {
        productContainer.innerHTML = ""; // Clear previous results

        if (products.length === 0) {
            productContainer.innerHTML = "<p>No products found.</p>";
            return;
        }

        products.forEach(product => {
            let box = document.createElement("div");
            box.classList.add("product-box");

            let title = document.createElement("h3");
            let poster = document.createElement("img");
            let price = document.createElement("h4");
            let description = document.createElement("p");
            let sizes = document.createElement("p");
            let colors = document.createElement("p");
            let buttonsDiv = document.createElement("div");
            buttonsDiv.classList.add("product-buttons");

            // Set product details
            title.textContent = product.name;
            title.classList.add("product-title");

            poster.src = product.image;
            poster.classList.add("product-image");
            poster.alt = product.name;

            price.textContent = `₹${product.price}`;
            price.classList.add("product-price");

            description.textContent = product.description;
            description.classList.add("product-description");

            sizes.textContent = `Sizes: ${product.sizes.join(", ")}`;
            sizes.classList.add("product-sizes");

            colors.textContent = `Colors: ${product.colors.join(", ")}`;
            colors.classList.add("product-colors");

            // Create buttons
            let heartButton = document.createElement("button");
            heartButton.textContent = "❤️ Add to Favorites";
            heartButton.classList.add("heart-button");
            heartButton.onclick = () => addToFavorites(product.id, product);

            let cartButton = document.createElement("button");
            cartButton.textContent = "🛒 Add to Cart";
            cartButton.classList.add("cart-button");
            cartButton.onclick = () => addToCart(product.id, product);

            buttonsDiv.append(heartButton, cartButton);

            // Assemble product box
            box.append(poster, title, price, description, sizes, colors, buttonsDiv);
            productContainer.append(box);
        });
    }

    // Placeholder functions for adding items to Favorites and Cart
    function addToFavorites(productId, product) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (!favorites.some(item => item.id === productId)) {
            favorites.push(product);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            alert("Added to Favorites! ❤️");
        } else {
            alert("This item is already in Favorites.");
        }
    }

    function addToCart(productId, product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (!cart.some(item => item.id === productId)) {
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Added to Cart! 🛒");
        } else {
            alert("This item is already in your Cart.");
        }
    }

    // Attach event listeners
    searchButton?.addEventListener("click", handleSearch);
    searchInput?.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            handleSearch(event);
        }
    });
    searchForm?.addEventListener("submit", handleSearch);

    // Load products initially
    fetchProducts();
});

