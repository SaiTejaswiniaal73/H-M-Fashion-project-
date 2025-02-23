// On DOM load, display the order summary based on the cart
document.addEventListener("DOMContentLoaded", function () {
    // Example: read from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Calculate total price
    let totalPrice = 0;
    cart.forEach((product) => {
      totalPrice += product.price;
    });
  
    // Example discount/delivery logic
    let discount = totalPrice > 0 ? 200 : 0;
    let deliveryFee = 0; // or some condition-based logic
    let finalTotal = totalPrice - discount + deliveryFee;
  
    // Update the DOM
    document.getElementById("order-value").textContent = `Rs. ${totalPrice}`;
    document.getElementById("discount-amount").textContent = `-Rs. ${discount}`;
    document.getElementById("delivery-fee").textContent = `Rs. ${deliveryFee}`;
    document.getElementById("total-amount").textContent = `Rs. ${finalTotal > 0 ? finalTotal : 0}`;
  
    // Handle form submission
    const checkoutForm = document.getElementById("checkout-form");
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Example: Collect user data
      const formData = new FormData(checkoutForm);
      const userInfo = Object.fromEntries(formData.entries());
      console.log("User info:", userInfo);
  
      // TODO: Send userInfo & cart data to your backend or proceed to a success page
      alert("Order placed successfully!");
    });
  });
  