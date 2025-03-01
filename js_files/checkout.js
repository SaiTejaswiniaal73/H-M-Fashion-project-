// document.addEventListener("DOMContentLoaded", function () {
//   // Function to update the order summary
//   function updateSummary() {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     let totalPrice = 0;

//     // Iterate over the cart and calculate total price, considering quantity
//     cart.forEach(product => {
//       totalPrice += product.price * (product.quantity || 1); // Multiply price by quantity
//     });

//     // Example discount/delivery logic
//     let discount = totalPrice > 0 ? 200 : 0; // Flat discount logic
//     let deliveryFee = 0; // Delivery fee logic can be added here
//     let finalTotal = totalPrice - discount + deliveryFee;

//     // Update the DOM elements with calculated values
//     document.getElementById("order-value").textContent = `Rs. ${totalPrice}`;
//     document.getElementById("discount-amount").textContent = `-Rs. ${discount}`;
//     document.getElementById("delivery-fee").textContent = `Rs. ${deliveryFee}`;
//     document.getElementById("total-amount").textContent = `Rs. ${finalTotal > 0 ? finalTotal : 0}`;
//   }

//   // Call updateSummary on page load
//   updateSummary();

//   // Handle form submission for checkout
//   const checkoutForm = document.getElementById("checkout-form");
//   checkoutForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     // Collect user data from the form
//     const formData = new FormData(checkoutForm);
//     const userInfo = Object.fromEntries(formData.entries());
//     console.log("User Info:", userInfo);

//     // Redirect to payment page after order is placed
//     window.location.href = "payment.html"; // Redirect to a payment page (or process backend)
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  // Function to update the order summary
  function updateSummary() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;

    // Iterate over the cart and calculate total price, considering quantity
    cart.forEach(product => {
      totalPrice += product.price * (product.quantity || 1); // Multiply price by quantity
    });

    // Example discount/delivery logic
    let discount = totalPrice > 0 ? 200 : 0; // Flat discount logic
    let deliveryFee = 0; // Delivery fee logic can be added here
    let finalTotal = totalPrice - discount + deliveryFee;

    // Store finalTotal in localStorage to pass it to the payment page
    localStorage.setItem("finalTotal", finalTotal);

    // Update the DOM elements with calculated values
    document.getElementById("order-value").textContent = `Rs. ${totalPrice}`;
    document.getElementById("discount-amount").textContent = `-Rs. ${discount}`;
    document.getElementById("delivery-fee").textContent = `Rs. ${deliveryFee}`;
    document.getElementById("total-amount").textContent = `Rs. ${finalTotal > 0 ? finalTotal : 0}`;
  }

  // Call updateSummary on page load
  updateSummary();

  // Handle form submission for checkout
  const checkoutForm = document.getElementById("checkout-form");
  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect user data from the form
    const formData = new FormData(checkoutForm);
    const userInfo = Object.fromEntries(formData.entries());
    console.log("User Info:", userInfo);

    // Redirect to payment page after order is placed
    window.location.href = "payment.html"; // Redirect to a payment page (or process backend)
  });
});
