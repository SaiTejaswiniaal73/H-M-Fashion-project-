const cartCountElement = document.getElementById("bag-count");
const favCountElement = document.getElementById("fav-count");

// Check if elements exist
if (!cartCountElement || !favCountElement) {
    console.error("Error: Navbar count elements not found!");
}

// Get cart and favorite count elements from the navbar
// const cartCountElement = document.getElementById("bag-count");
// const favCountElement = document.getElementById("fav-count");

// Retrieve stored counts from localStorage (if available)
let cartCount = localStorage.getItem("cartCount") ? parseInt(localStorage.getItem("cartCount")) : 0;
let favCount = localStorage.getItem("favCount") ? parseInt(localStorage.getItem("favCount")) : 0;

// Display the counts when the page loads
cartCountElement.innerText = cartCount;
favCountElement.innerText = favCount;

// Function to add a product to cart
function addToCart(productId) {
    cartCount++;
    cartCountElement.innerText = cartCount;
    localStorage.setItem("cartCount", cartCount);
}

// Function to add a product to favorites
function addToFavorites(productId) {
    favCount++;
    favCountElement.innerText = favCount;
    localStorage.setItem("favCount", favCount);
}

// Function to fetch and display products
function fetchProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category") || "all";
    
    fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH")
        .then(response => response.json())
        .then(products => {
            const availableCategories = ["women", "men", "kids", "baby"];
            let filteredProducts = [];
            
            if (category !== "all" && availableCategories.includes(category)) {
                filteredProducts = products[0].products[category] || [];
            } else {
                availableCategories.forEach(cat => {
                    if (products[0].products[cat]) {
                        filteredProducts = [...filteredProducts, ...products[0].products[cat]];
                    }
                });
            }
            
            displayProducts(filteredProducts);
        })
        .catch(error => console.error("Error fetching products:", error));
}

// Function to display products
function displayProducts(filteredProducts) {
    const mainDiv = document.getElementById("products-container");
    mainDiv.innerHTML = "";
    
    filteredProducts.forEach(product => {
        let productBox = document.createElement("div");
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

// Function to handle category changes
function handleCategoryChange(category) {
    window.location.href = `products.html?category=${category}`;
}

// Function to handle search functionality
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");
    
    if (searchQuery) {
        fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH")
            .then(response => response.json())
            .then(products => {
                let filteredProducts = [];
                const availableCategories = ["women", "men", "kids", "baby"];
                
                availableCategories.forEach(category => {
                    if (products[0].products[category]) {
                        const matchingProducts = products[0].products[category].filter(p => 
                            p.name.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                        filteredProducts = [...filteredProducts, ...matchingProducts];
                    }
                });
                
                if (filteredProducts.length > 0) {
                    displayProducts(filteredProducts);
                } else {
                    document.getElementById("no-results").style.display = "block";
                }
            })
            .catch(error => console.error("Error fetching products:", error));
    }
});

// Call fetchProducts initially
fetchProducts();
