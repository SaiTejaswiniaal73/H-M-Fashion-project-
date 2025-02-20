document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signup");
  const signinForm = document.getElementById("signin");
  const switchToSignIn = document.getElementById("switchToSignIn");
  const switchToSignUp = document.getElementById("switchToSignUp");
  const guestButton = document.getElementById("guest-btn");

  // Function to toggle between sign-in and sign-up
  function toggleForms(showForm, hideForm) {
    hideForm.style.opacity = "0";
    setTimeout(() => {
      hideForm.style.display = "none";
      showForm.style.display = "block";
      setTimeout(() => (showForm.style.opacity = "1"), 100);
    }, 300);
  }

  // Event Listeners for Switching Forms
  switchToSignIn.addEventListener("click", () => toggleForms(signinForm, signupForm));
  switchToSignUp.addEventListener("click", () => toggleForms(signupForm, signinForm));

  // Guest Login
  guestButton.addEventListener("click", () => {
    localStorage.setItem("guest", "true");
    // window.location.href = "/main.html"; // Absolute path from the server root
    window.location.href = "../main.html"; // Go up one level to access main.html

// 

  });

  // Input Effects
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("focus", () => (input.style.border = "2px solid #ff4081"));
    input.addEventListener("blur", () => (input.style.border = "1px solid #ccc"));
    input.addEventListener("keyup", () => (input.style.backgroundColor = "#f9f9f9"));
    input.addEventListener("keydown", () => (input.style.backgroundColor = "#fff"));
  });

  // Button Hover Effects
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("mouseover", () => (button.style.backgroundColor = "#e91e63"));
    button.addEventListener("mouseout", () => (button.style.backgroundColor = "#ff4081"));
  });
});
