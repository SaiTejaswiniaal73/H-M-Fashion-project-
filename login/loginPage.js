document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup");
  const signinForm = document.getElementById("signin");
  const switchToSignIn = document.getElementById("switchToSignIn");
  const switchToSignUp = document.getElementById("switchToSignUp");
  const guestButton = document.getElementById("guest-btn");
  const signupButton = document.getElementById("signup-btn");
  const signinButton = document.getElementById("signin-btn");

  // Toggle to Sign In Form
  switchToSignIn.addEventListener("click", () => {
      signinForm.style.display = "block";
      signupForm.style.display = "none";
  });

  // Toggle to Sign Up Form
  switchToSignUp.addEventListener("click", () => {
      signupForm.style.display = "block";
      signinForm.style.display = "none";
  });

  // Guest Login - Redirect to main.html
  guestButton.addEventListener("click", () => {
      localStorage.setItem("guest", "true");
      window.location.href = "../main.html";
  });

  // Sign Up
  signupButton.addEventListener("click", () => {
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      if (email && password) {
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userPassword", password);
          alert("Sign-up successful! Redirecting...");
          window.location.href = "../main.html";  // Redirect after sign-up
      } else {
          alert("Please enter valid credentials.");
      }
  });

  // Sign In
  signinButton.addEventListener("click", () => {
      const email = document.getElementById("signin-email").value;
      const password = document.getElementById("signin-password").value;

      const storedEmail = localStorage.getItem("userEmail");
      const storedPassword = localStorage.getItem("userPassword");

      if (email === storedEmail && password === storedPassword) {
          alert("Login successful! Redirecting...");
          window.location.href = "../main.html";  // Redirect after sign-in
      } else {
          alert("Invalid credentials. Please try again.");
      }
  });
});
