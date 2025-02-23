

// Function to fetch and display wishlist items
function displayWishlist() {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const wishlistContainer = document.getElementById("wishlist-items");
  wishlistContainer.innerHTML = "";

  if (wishlist.length === 0) {
      wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
      return;
  }

  wishlist.forEach(product => {
      let wishlistItem = document.createElement("div");
      wishlistItem.classList.add("wishlist-item");
      wishlistItem.innerHTML = `
          <div class="wishlist-card">
              <img src="${product.image}" alt="${product.name}" class="wishlist-img">
              <div class="wishlist-details">
                  <h3>${product.name}</h3>
                  <p>₹${product.price}</p>
                  <button class="remove-btn" onclick="removeFromWishlist(${product.id})">Remove</button>
              </div>
          </div>
      `;
      wishlistContainer.appendChild(wishlistItem);
  });

  updateWishlistCount(); // Update count in the navbar
}

// Function to add a product to the wishlist
function addToWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let product = findProductById(productId); // Fetch product details

  if (!product) {
      console.error("Product not found!");
      return;
  }

  let existingProduct = wishlist.find(item => item.id === product.id);
  if (!existingProduct) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      updateWishlistCount(); // Update count in navbar
      alert("Added to wishlist!");
  } else {
      alert("Already in wishlist!");
  }
}

// Function to remove an item from the wishlist
function removeFromWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter(product => product.id !== productId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  displayWishlist();
  updateWishlistCount();
}

// Function to update the wishlist count in the navbar
function updateWishlistCount() {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let count = wishlist.length;
  
  document.getElementById("fav-count-large").textContent = count;
  document.getElementById("fav-count-small").textContent = count;
}

// Load wishlist and update count when the page loads
document.addEventListener("DOMContentLoaded", () => {
  displayWishlist();
  updateWishlistCount();
});


// Global variable to hold all products (assumed to be loaded from your API)
let allProducts = []; // Ensure this gets populated from your API fetch

// Helper function to find a product by its ID from the aggregated data
function findProductById(productId) {
  // Example: Search within allProducts (you may also have a global structure for productsByCategory)
  return allProducts.find(product => product.id === productId);
}

// Function to update badge counts in the navigation for favorites and cart
function updateBadgeCount(type, count) {
  // type should be 'fav' for favorites and 'bag' for cart
  const badgeElements = document.querySelectorAll(`#${type}-count-large, #${type}-count-small`);
  badgeElements.forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? "block" : "none";
  });
}

// Function to show a simple notification (can be used for both actions)
function showNotification(message) {
  const container = document.getElementById("notification-container");
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  container.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 2000);
}

// Function to add a product to Favorites
function addToFavorites(productId, product) {
  // If the product is not passed, try to look it up
  if (!product) {
    product = findProductById(productId);
  }
  if (!product) return; // If product not found, exit

  // Retrieve existing favorites from localStorage or initialize an empty array
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Check if the product is already in favorites
  if (!favorites.find(item => item.id === productId)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateBadgeCount("fav", favorites.length);
    showNotification("Added to Favorites");
  } else {
    showNotification("Product already in Favorites");
  }
}

// Function to add a product to Cart
function addToCart(productId, product) {
  // If the product is not passed, try to look it up
  if (!product) {
    product = findProductById(productId);
  }
  if (!product) return; // If product not found, exit

  // Retrieve existing cart items from localStorage or initialize an empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the product is already in the cart
  if (!cart.find(item => item.id === productId)) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateBadgeCount("bag", cart.length);
    showNotification("Added to Cart");
  } else {
    showNotification("Product already in Cart");
  }
}

// Example: Attach these functions to buttons in your dynamically created product cards.
// For instance, in your product display code you might have:
// <button class="heart-button" onclick="addToFavorites(product.id, product)">❤️ Add to Favorites</button>
// <button class="cart-button" onclick="addToCart(product.id, product)">🛒 Add to Cart</button>

// Optionally, on page load, update the badge counts from localStorage:
document.addEventListener("DOMContentLoaded", function() {
  const favCount = JSON.parse(localStorage.getItem("favorites"))?.length || 0;
  const cartCount = JSON.parse(localStorage.getItem("cart"))?.length || 0;
  updateBadgeCount("fav", favCount);
  updateBadgeCount("bag", cartCount);
});
