document.addEventListener("DOMContentLoaded", function () {
  // Fetch products when the page loads
  fetchProducts();
  
  // Get the current text of <h1 class="text-center">
  const h1Text = document.querySelector("h1.text-center").textContent;
  console.log("Current H1 Text:", h1Text); // Logs: "Fashion Recommendation App"
  
  // Set a new text for the <h1>
  document.querySelector("h1.text-center").textContent = "Welcome to Our Fashion Recommendation App";
});

// Global variables for pagination and data storage
let currentPage = 1; // Declare currentPage once
let allProducts = [];
const productsPerPage = 12; // Number of products per page

// Fetch products from the API
async function fetchProducts(query = '') {
  try {
    const response = await fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH");
    const data = await response.json();
    allProducts = data;

    // Filter products based on search query
    if (query) {
      allProducts = data.filter(product =>
        product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query)
      );
    }

    displayProductsPaginated(); // Display first set of products
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Function to display products with pagination
function displayProductsPaginated() {
  const container = document.getElementById("products-container");
  container.innerHTML = ""; // Clear existing products

  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const productsToDisplay = allProducts.slice(start, end);

  productsToDisplay.forEach((product) => {
    const productCard = `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="product card h-100">
          <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${product.name}</h5>
            <p>Category: ${product.category}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Sizes: ${product.sizes.join(", ")}</p>
            <p>Colors: ${product.colors.join(", ")}</p>
            <div class="d-flex justify-content-center gap-2">
              <button class="btn btn-outline-danger btn-custom" onclick="addToFavorites('${product.id}')">❤️ Favorite</button>
              <button class="btn btn-outline-primary btn-custom" onclick="addToCart('${product.id}')">🛒 Cart</button>
            </div>
          </div>
        </div>
      </div>`;
    container.innerHTML += productCard;
  });

  // Pagination controls
  document.getElementById("previous-btn").disabled = currentPage === 1;
  document.getElementById("next-btn").disabled = end >= allProducts.length;
}

// Pagination Functions
function nextPage() {
  if (currentPage * productsPerPage < allProducts.length) {
    currentPage++;
    displayProductsPaginated();
  }
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    displayProductsPaginated();
  }
}

// Dummy Functions for buttons
function addToFavorites(id) {
  alert("Added to Favorites!");
}

function addToCart(id) {
  alert("Added to Cart!");
}

// Handle the search functionality
function handleSearch(event) {
  event.preventDefault(); // Prevent form submission
  const query = document.getElementById("search-input").value.trim().toLowerCase(); // Get user input

  fetchProducts(query); // Fetch products with the search query
}

// let favCountLarge = 0; // For large screen
// let favCountSmall = 0; // For small screen
// let cartCountLarge = 0; // For large screen
// let cartCountSmall = 0; // For small screen

// // Function to add to favorites
// function addToFavorites() {
//   favCountLarge++; // Increase the favorite count for large screen
//   favCountSmall++; // Increase the favorite count for small screen
//   updateFavCount(); // Update the display for both screens
//   console.log("Favorites Count: " + favCountLarge);
// }

// // Function to add to cart
// function addToCart() {
//   cartCountLarge++; // Increase the cart count for large screen
//   cartCountSmall++; // Increase the cart count for small screen
//   updateCartCount(); // Update the display for both screens
//   console.log("Cart Count: " + cartCountLarge);
// }

// // Update the favorite count display
// function updateFavCount() {
//   document.getElementById("fav-count-large").textContent = favCountLarge;
//   document.getElementById("fav-count-small").textContent = favCountSmall;
// }

// // Update the cart count display
// function updateCartCount() {
//   document.getElementById("cart-count-large").textContent = cartCountLarge;
//   document.getElementById("cart-count-small").textContent = cartCountSmall;
// }
let favCountLarge = 0; // For large screen
let favCountSmall = 0; // For small screen
let cartCountLarge = 0; // For large screen
let cartCountSmall = 0; // For small screen

let favorites = []; // Array to store favorite product IDs
let cart = []; // Array to store cart product IDs

// Function to add to favorites
function addToFavorites(productId) {
  if (!favorites.includes(productId)) {  // Check if the product is already in favorites
    favorites.push(productId);  // Add to favorites
    favCountLarge++;  // Increment the favorite count for large screen
    favCountSmall++;  // Increment the favorite count for small screen
    updateFavCount();  // Update the display for both screens
    console.log("Added to Favorites. Total count: " + favCountLarge);
  } else {
    console.log("This product is already in favorites.");
  }
}

// Function to add to cart
function addToCart(productId) {
  if (!cart.includes(productId)) {  // Check if the product is already in the cart
    cart.push(productId);  // Add to cart
    cartCountLarge++;  // Increment the cart count for large screen
    cartCountSmall++;  // Increment the cart count for small screen
    updateCartCount();  // Update the display for both screens
    console.log("Added to Cart. Total count: " + cartCountLarge);
  } else {
    console.log("This product is already in the cart.");
  }
}

// Update the favorite count display
function updateFavCount() {
  document.getElementById("fav-count-large").textContent = favCountLarge;
  document.getElementById("fav-count-small").textContent = favCountSmall;
}

// Update the cart count display
function updateCartCount() {
  document.getElementById("cart-count-large").textContent = cartCountLarge;
  document.getElementById("cart-count-small").textContent = cartCountSmall;
}
