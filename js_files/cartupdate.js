// cartupdate.js - Fixed Version

document.addEventListener("DOMContentLoaded", displayCart);

function displayCart() {
    let cartData = localStorage.getItem("cart");
    let cartItems = cartData ? JSON.parse(cartData) : [];
    let cartContainer = document.getElementById("cart-items");
    let totalContainer = document.getElementById("cart-total");
    cartContainer.innerHTML = ""; // Clear previous items

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalContainer.innerText = "Total: ₹0";
        return;
    }

    let totalPrice = 0;
    cartItems.forEach((product, index) => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${product.name}</h4>
                <p>Price: ₹${product.price}</p>
                <button class="remove-button" onclick="removeFromCart(${index})">❌ Remove</button>
            </div>
        `;
        cartContainer.appendChild(cartItem);
        totalPrice += product.price;
    });

    totalContainer.innerText = `Total: ₹${totalPrice}`;
}

function removeFromCart(index) {
    let cartData = localStorage.getItem("cart");
    let cartItems = cartData ? JSON.parse(cartData) : [];

    if (index >= 0 && index < cartItems.length) {
        cartItems.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        displayCart();
    }
}
