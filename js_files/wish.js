document.addEventListener("DOMContentLoaded", function() {
    // Get wishlist items from localStorage (cart items are stored here as well)
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let wishlistContainer = document.getElementById("wishlist-items-container");
    
    if (cartItems.length === 0) {
        wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
    } else {
        cartItems.forEach(item => {
            let wishlistItemDiv = document.createElement("div");
            wishlistItemDiv.classList.add("wishlist-item");
            wishlistItemDiv.innerHTML = `
                <p>Product: ${item.productName}</p>
                <p>Price: ₹${item.productPrice}</p>
                <button onclick="removeFromWishlist(${item.productId})">Remove</button>
            `;
            wishlistContainer.appendChild(wishlistItemDiv);
        });
    }

    // Update the favorites count in the navbar
    document.getElementById("fav-count").innerText = cartItems.length;
});

// Function to remove product from wishlist
function removeFromWishlist(productId) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems = cartItems.filter(item => item.productId !== productId);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    location.reload();  // Reload to reflect changes
}
