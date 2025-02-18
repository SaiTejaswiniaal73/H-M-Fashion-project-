document.addEventListener("DOMContentLoaded", function() {
    // Get cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let cartContainer = document.getElementById("cart-items-container");

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cartItems.forEach(item => {
            let cartItemDiv = document.createElement("div");
            cartItemDiv.classList.add("cart-item");
            cartItemDiv.innerHTML = `
                <p>Product: ${item.productName}</p>
                <p>Price: ₹${item.productPrice}</p>
                <button onclick="removeFromCart(${item.productId})">Remove</button>
            `;
            cartContainer.appendChild(cartItemDiv);
        });
    }

    // Update the cart count in the navbar
    document.getElementById("bag-count").innerText = cartItems.length;
});

// Function to remove product from cart
function removeFromCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems = cartItems.filter(item => item.productId !== productId);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    location.reload();  // Reload to reflect changes
}
function addToCart(productId, productName, productPrice) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if product is already in cart
    let existingProductIndex = cartItems.findIndex(item => item.productId === productId);

    if (existingProductIndex === -1) {
        // Add new product to cart
        cartItems.push({ productId, productName, productPrice });
    }

    // Save updated cart items in localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Update cart count in the navbar
    document.getElementById("bag-count").innerText = cartItems.length;
}
