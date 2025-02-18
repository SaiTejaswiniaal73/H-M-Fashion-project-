document.addEventListener("DOMContentLoaded", function () {
    displayCart();
});

function displayCart() {
    const cartContainer = document.getElementById("cart-container");
    const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-item");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <span>${product.price}</span>
            <button class="remove-from-cart" data-product-id="${product.id}">Remove</button>
        `;
        cartContainer.appendChild(productElement);
    });

    // Remove from cart event listener
    document.querySelectorAll(".remove-from-cart").forEach(button => {
        button.addEventListener("click", function () {
            removeFromCart(this.dataset.productId);
        });
    });
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cartItems", JSON.stringify(cart));

    // Update count
    localStorage.setItem("cartCount", cart.length);
    updateNavBar();
    displayCart();
}
