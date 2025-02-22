function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.querySelector(".cart");
    
    cart.forEach(item => {
        let itemDiv = document.createElement("div");
        itemDiv.innerHTML = `
            <h2>${item.name}</h2>
            <img src="${item.image}" alt="${item.name}">
            <p>Price: ₹${item.price}</p>
        `;
        cartContainer.appendChild(itemDiv);
    });

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    }
}

displayCart();
