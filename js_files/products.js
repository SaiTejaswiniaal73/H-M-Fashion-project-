



// //cart count and fav

// // Function to add product to favorites

// // Function to add product to favorites
// function addToFavorites(productId) {
//   let favCount = parseInt(localStorage.getItem("favCount") || "0");
//   favCount += 1;
//   localStorage.setItem("favCount", favCount); // Store in localStorage
//   updateNavBar(); // Update the navbar count dynamically
// }

// // Function to add product to cart
// function addToCart(productId) {
//   let cartCount = parseInt(localStorage.getItem("cartCount") || "0");
//   cartCount += 1;
//   localStorage.setItem("cartCount", cartCount); // Store in localStorage
//   updateNavBar(); // Update the navbar count dynamically
// }

// // Function to update the navbar counts
// function updateNavBar() {
//   const favCount = parseInt(localStorage.getItem("favCount") || "0");
//   const cartCount = parseInt(localStorage.getItem("cartCount") || "0");

//   document.getElementById("fav-count").innerText = favCount;
//   document.getElementById("bag-count").innerText = cartCount;
// }


// document.addEventListener("DOMContentLoaded", function () {
//   updateNavBar(); // Update the counts when the page is loaded
// });




// Call fetchProducts initially
fetchProducts();

document.addEventListener("DOMContentLoaded", function () {
  // Get search query from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search");

  if (searchQuery) {
      fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH")
          .then(response => response.json())
          .then(products => {
              let filteredProducts = [];

              const availableCategories = ["women", "men", "kids", "baby"];
              // Check each category for the product name match
              availableCategories.forEach(category => {
                  if (products[0].products[category]) {
                      // Filter the products matching the search query
                      const product = products[0].products[category].filter(p =>
                          p.name.toLowerCase().includes(searchQuery.toLowerCase())
                      );
                      filteredProducts = [...filteredProducts, ...product];
                  }
              });

              // Display matching products
              if (filteredProducts.length > 0) {
                  displayProducts(filteredProducts);
              } else {
                  document.getElementById("no-results").style.display = "block"; // Show "No results" message if no products are found
              }
          })
          .catch(error => console.error("Error fetching products:", error));
  }
});

// Function to display the products
function displayProducts(products) {
  const mainDiv = document.getElementById("products-container");
  mainDiv.innerHTML = ''; // Clear previous products

  products.forEach(product => {
      let productBox = document.createElement("div");
      productBox.classList.add("product-box");

      productBox.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="product-image"/>
          <h3 class="product-title">${product.name}</h3>
          <h4 class="product-price">₹${product.price}</h4>
          <p class="product-description">${product.description}</p>
          <p class="product-sizes">Sizes: ${product.sizes.join(", ")}</p>
          <p class="product-colors">Colors: ${product.colors.join(", ")}</p>
      `;

      mainDiv.appendChild(productBox);
  });
}
