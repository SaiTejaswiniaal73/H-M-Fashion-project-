// On DOM load, display the cart items from localStorage
document.addEventListener("DOMContentLoaded", displayCartItems);

function displayCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");

  cartItemsContainer.innerHTML = "";

  // If cart is empty
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    updateSummary(0);
    return;
  }

  let totalPrice = 0;

  cart.forEach((product) => {
    // Example of discount: let's assume originalPrice is product.price + 200, or set your own logic
    const originalPrice = product.price + 200; 
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="cart-item-details">
        <h3 class="item-name">${product.name}</h3>
        <p class="item-price">
          Rs. ${product.price} 
          <span class="original-price">Rs. ${originalPrice}</span>
        </p>
        <p class="item-size">Size: ${product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'N/A'}</p>
        <p class="item-color">Color: ${product.colors && product.colors.length > 0 ? product.colors[0] : 'N/A'}</p>
        <p class="item-offer">Weekend offer</p>
        <button class="remove-btn" onclick="removeFromCart(${product.id})">Remove</button>
      </div>
    `;

    cartItemsContainer.appendChild(itemDiv);
    totalPrice += product.price;
  });

  // Update summary
  updateSummary(totalPrice);
}

// function removeFromCart(productId) {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];
//   cart = cart.filter((item) => item.id !== productId);
//   localStorage.setItem("cart", JSON.stringify(cart));
//   displayCartItems(); // Refresh the cart UI
// }

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems(); // Refresh cart UI
  
    // Update the nav badge count
    updateCartBadgeCount();
  }
  
function updateSummary(totalPrice) {
  // For demonstration, let's say discount is a flat 200 if totalPrice > 0
  const discount = totalPrice > 0 ? 200 : 0;
  const deliveryFee = 0; // e.g., free delivery
  const finalTotal = totalPrice - discount + deliveryFee;

  document.getElementById("order-value").textContent = `Rs. ${totalPrice}`;
  document.getElementById("discount-amount").textContent = `-Rs. ${discount}`;
  document.getElementById("delivery-fee").textContent = `Rs. ${deliveryFee}`;
  document.getElementById("total-amount").textContent = `Rs. ${finalTotal > 0 ? finalTotal : 0}`;
}
document.addEventListener("DOMContentLoaded", function() {
    updateCartBadgeCount();
  });
  