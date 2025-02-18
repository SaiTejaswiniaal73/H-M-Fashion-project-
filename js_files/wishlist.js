document.addEventListener("DOMContentLoaded", function () {
    displayFavorites();
});

function displayFavorites() {
    const favContainer = document.getElementById("wishlist-container");
    const favorites = JSON.parse(localStorage.getItem("favItems") || "[]");

    favContainer.innerHTML = "";

    if (favorites.length === 0) {
        favContainer.innerHTML = "<p>Your favorites list is empty.</p>";
        return;
    }

    favorites.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-item");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <span>${product.price}</span>
            <button class="remove-from-fav" data-product-id="${product.id}">Remove</button>
        `;
        favContainer.appendChild(productElement);
    });

    // Remove from favorites event listener
    document.querySelectorAll(".remove-from-fav").forEach(button => {
        button.addEventListener("click", function () {
            removeFromFavorites(this.dataset.productId);
        });
    });
}

function removeFromFavorites(productId) {
    let favorites = JSON.parse(localStorage.getItem("favItems") || "[]");
    favorites = favorites.filter(item => item.id !== productId);
    localStorage.setItem("favItems", JSON.stringify(favorites));

    // Update count
    localStorage.setItem("favCount", favorites.length);
    updateNavBar();
    displayFavorites();
}
