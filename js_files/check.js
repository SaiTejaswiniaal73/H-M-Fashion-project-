function addToCart() {
    console.log("Adding to cart...");
    cartCount++;
    cartCountElement.innerText = cartCount;
    localStorage.setItem("cartCount", cartCount);
}

function addToFavorites(productId) {
    console.log("Adding to favorites...");
    let favItems = JSON.parse(localStorage.getItem("favItems")) || [];
    if (!favItems.includes(productId)) {
        favItems.push(productId);
        favCount++;
        localStorage.setItem("favItems", JSON.stringify(favItems));
        localStorage.setItem("favCount", favCount);
        favCountElement.innerText = favCount;
    }
}
