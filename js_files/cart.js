document.addEventListener("DOMContentLoaded", function () {
  displayCartItems();
  updateCartBadgeCount();
});

// Function to display cart items
function displayCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    updateSummary(0);
    return;
  }

  let totalPrice = 0;

  cart.forEach((product) => {
    if (!product.quantity) {
      product.quantity = 1;
    }

    let productTotal = product.price * product.quantity;
    totalPrice += productTotal;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="cart-item-details">
        <h3 class="item-name">${product.name}</h3>
        <p class="item-price" style="color: green; font-weight: bold;">
          Rs. <span class="item-total">${productTotal}</span>
        </p>
        <div class="quantity-controls">
          <button class="minus-btn" onclick="updateQuantity(${product.id}, 'decrease')">–</button>
          <span class="quantity-display" id="quantity-${product.id}">${product.quantity}</span>
          <button class="plus-btn" onclick="updateQuantity(${product.id}, 'increase')">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${product.id})" 
          style="background-color: red; color: white; border: none; padding: 5px 10px; cursor: pointer;">
          Remove
        </button>
      </div>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  updateSummary(totalPrice);
  updateCartBadgeCount();
}

// Function to update quantity (increase or decrease)
function updateQuantity(productId, action) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = cart.find(item => item.id === productId);

  if (product) {
    if (action === "increase") {
      product.quantity += 1;
    } else if (action === "decrease" && product.quantity > 1) {
      product.quantity -= 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
  }
}

// Function to remove item from cart
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
}

// Function to update order summary
function updateSummary(totalPrice) {
  const discount = totalPrice > 0 ? 200 : 0;
  const deliveryFee = 0;
  const finalTotal = totalPrice - discount + deliveryFee;

  document.getElementById("order-value").textContent = `Rs. ${totalPrice}`;
  document.getElementById("discount-amount").textContent = `-Rs. ${discount}`;
  document.getElementById("delivery-fee").textContent = `Rs. ${deliveryFee}`;
  document.getElementById("total-amount").textContent = `Rs. ${finalTotal > 0 ? finalTotal : 0}`;
}

// Function to update cart badge count
function updateCartBadgeCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  const largeBadge = document.getElementById("bag-count-large");
  const smallBadge = document.getElementById("bag-count-small");

  if (largeBadge) {
    largeBadge.textContent = count;
    largeBadge.style.display = count > 0 ? "block" : "none";
  }

  if (smallBadge) {
    smallBadge.textContent = count;
    smallBadge.style.display = count > 0 ? "block" : "none";
  }
}
