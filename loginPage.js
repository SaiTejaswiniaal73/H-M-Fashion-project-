
document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup");
    const signinForm = document.getElementById("signin");
    const switchToSignIn = document.getElementById("switchToSignIn");
    const switchToSignUp = document.getElementById("switchToSignUp");
  
    // Smooth form transition between Sign Up and Sign In
    switchToSignIn.addEventListener("click", function () {
      signupForm.style.opacity = "0";
      setTimeout(() => {
        signupForm.style.display = "none";
        signinForm.style.display = "block";
        setTimeout(() => (signinForm.style.opacity = "1"), 100);
      }, 300);
    });
  
    switchToSignUp.addEventListener("click", function () {
      signinForm.style.opacity = "0";
      setTimeout(() => {
        signinForm.style.display = "none";
        signupForm.style.display = "block";
        setTimeout(() => (signupForm.style.opacity = "1"), 100);
      }, 300);
    });
  
    // Input Effects
    document.querySelectorAll("input").forEach((input) => {
      input.addEventListener("focus", () => {
        input.style.border = "2px solid #ff4081";
      });
      input.addEventListener("blur", () => {
        input.style.border = "1px solid #ccc";
      });
      input.addEventListener("keyup", () => {
        input.style.backgroundColor = "#f9f9f9";
      });
      input.addEventListener("keydown", () => {
        input.style.backgroundColor = "#fff";
      });
    });
  
    // Button Hover Effects
    document.querySelectorAll(".btn").forEach((button) => {
      button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "#e91e63";
      });
      button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "#ff4081";
      });
    });
  });
  

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "#e91e63";
  });
  button.addEventListener("mouseout", () => {
    button.style.backgroundColor = "#ff4081";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup");
  const signinForm = document.getElementById("signin");
  const switchToSignIn = document.getElementById("switchToSignIn");
  const switchToSignUp = document.getElementById("switchToSignUp");
  const guestButton = document.getElementById("guest-btn");

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

  // Guest Login
  guestButton.addEventListener("click", () => {
    localStorage.setItem("guest", "true");
    window.location.href = "main.html"; // Redirect as guest
  });
});
