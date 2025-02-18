// cart.js

document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");

    // If user is logged in, update counts, else redirect to login
    if (userId) {
        updateNavBar();  // Update the navbar with cart and favorites counts
    } else {
        // If not logged in, redirect to login page
        window.location.href = "./login/loginPage.html";
    }

    // Fetch product data from API (replace with your actual API URL)
    fetch("https://your-api-endpoint.com/products")
        .then(response => response.json())
        .then(data => {
            // Display the products
            displayProducts(data);
        })
        .catch(error => console.error("Error fetching product data:", error));

    // Event listener for adding to cart
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = e.target.dataset.productId;
            addToCart(productId);  // Call function to add to cart
        });
    });

    // Event listener for adding to favorites
    document.querySelectorAll(".add-to-fav").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = e.target.dataset.productId;
            addToFavorites(productId);  // Call function to add to favorites
        });
    });
});

// Function to add product to cart
function addToCart(productId) {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("Please log in to add products to your cart.");
        window.location.href = "./login/loginPage.html";  // Redirect to login page if not logged in
        return;
    }

    let cartCount = parseInt(localStorage.getItem("cartCount") || "0");
    cartCount++;  // Increment the cart count
    localStorage.setItem("cartCount", cartCount);  // Save updated count in localStorage

    updateNavBar();  // Update the navbar count dynamically
}

// Function to add product to favorites
function addToFavorites(productId) {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("Please log in to add products to your favorites.");
        window.location.href = "./login/loginPage.html";  // Redirect to login page if not logged in
        return;
    }

    let favCount = parseInt(localStorage.getItem("favCount") || "0");
    favCount++;  // Increment the favorites count
    localStorage.setItem("favCount", favCount);  // Save updated count in localStorage

    updateNavBar();  // Update the navbar count dynamically
}

// Function to update navbar with cart and favorites count
function updateNavBar() {
    const favCount = parseInt(localStorage.getItem("favCount") || "0");
    const cartCount = parseInt(localStorage.getItem("cartCount") || "0");

    document.getElementById("fav-count").innerText = favCount;
    document.getElementById("bag-count").innerText = cartCount;
}

// Function to display products dynamically
function displayProducts(data) {
    const productContainer = document.getElementById("product-container");
    data.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-item");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span>$${product.price}</span>
            <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            <button class="add-to-fav" data-product-id="${product.id}">Add to Favorites</button>
        `;
        productContainer.appendChild(productElement);
    });
}
