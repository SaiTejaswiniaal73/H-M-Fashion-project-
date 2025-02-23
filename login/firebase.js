import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZt47GRTL-XU0kqWLslCr6DAIVPFicH5A",
  authDomain: "fir-project-try.firebaseapp.com",
  projectId: "fir-project-try",
  storageBucket: "fir-project-try.appspot.com", // Corrected
  messagingSenderId: "675417671619",
  appId: "1:675417671619:web:4247bca1f91bd42ad99f76",
  measurementId: "G-RBB5QSDNH0",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 


// Sign Up Event
document.getElementById("signup-btn").addEventListener("click", (e) => {
  let email = document.getElementById("signup-email").value;
  let password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("User registered successfully");
      localStorage.removeItem("guest");
      window.location.href = "../main.html"; // Go up one level to access main.html


    })
    .catch((error) => {
      alert(error.message);
    });
});

// Sign In Event
document.getElementById("signin-btn").addEventListener("click", (e) => {
  let email = document.getElementById("signin-email").value;
  let password = document.getElementById("signin-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login successful");
      localStorage.removeItem("guest");
      window.location.href = "../main.html"; // Go up one level to access main.html
    })
    .catch((error) => {
      alert("Invalid credentials");
    });
});




