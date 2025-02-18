document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const addToFavButtons = document.querySelectorAll(".add-to-fav");
  
    // Fetch product data from the API (assuming your API endpoint is set up to deliver the product data in your format)
    fetch("https://your-api-endpoint.com/products")  // Replace with your actual API URL
      .then(response => response.json())
      .then(data => {
        // Process the product data and display it on your page
        displayProducts(data);
      })
      .catch(error => console.error("Error fetching product data:", error));
  
    // Check login status
    const userId = localStorage.getItem("userId");
  
    // Default cart and favorite counts for guests
    if (!userId) {
      setCartAndFavCounts(0, 0);
    } else {
      // If logged in, fetch actual cart/fav counts from storage or database
      const cartCount = parseInt(localStorage.getItem("cartCount") || 0, 10);
      const favCount = parseInt(localStorage.getItem("favCount") || 0, 10);
      setCartAndFavCounts(cartCount, favCount);
    }
  
    // Event listener for "Add to Cart" buttons
    addToCartButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        if (!userId) {
          alert("Please log in to add products to your cart.");
          window.location.href = "./login/loginPage.html";  // Redirect to login page
        } else {
          const productId = e.target.dataset.productId;
          addToCart(productId);
        }
      });
    });
  
    // Event listener for "Add to Favorites" buttons
    addToFavButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        if (!userId) {
          alert("Please log in to add products to your favorites.");
          window.location.href = "./login/loginPage.html";  // Redirect to login page
        } else {
          const productId = e.target.dataset.productId;
          addToFavorites(productId);
        }
      });
    });
  });
  
  // Function to display products dynamically
  function displayProducts(data) {
    const productContainer = document.getElementById("product-container");
    data.forEach(product => {
      const productElement = document.createElement("div");
      productElement.classList.add("product-item");
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <span>$${product.price}</span>
        <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
        <button class="add-to-fav" data-product-id="${product.id}">Add to Favorites</button>
      `;
      productContainer.appendChild(productElement);
    });
  }
  
  // Function to set cart and favorite counts
  function setCartAndFavCounts(cartCount, favCount) {
    document.getElementById("cart-count").textContent = cartCount;
    document.getElementById("fav-count").textContent = favCount;
  }
  
  // Function to add item to the cart (update count in local storage)
  function addToCart(productId) {
    let cartCount = parseInt(localStorage.getItem("cartCount") || 0, 10);
    cartCount++;
    localStorage.setItem("cartCount", cartCount);
    setCartAndFavCounts(cartCount, parseInt(localStorage.getItem("favCount") || 0, 10));
  }
  
  // Function to add item to favorites (update count in local storage)
  function addToFavorites(productId) {
    let favCount = parseInt(localStorage.getItem("favCount") || 0, 10);
    favCount++;
    localStorage.setItem("favCount", favCount);
    setCartAndFavCounts(parseInt(localStorage.getItem("cartCount") || 0, 10), favCount);
  }
  
































// function addToCart() {
//     console.log("Adding to cart...");
//     cartCount++;
//     cartCountElement.innerText = cartCount;
//     localStorage.setItem("cartCount", cartCount);
// }

// function addToFavorites(productId) {
//     console.log("Adding to favorites...");
//     let favItems = JSON.parse(localStorage.getItem("favItems")) || [];
//     if (!favItems.includes(productId)) {
//         favItems.push(productId);
//         favCount++;
//         localStorage.setItem("favItems", JSON.stringify(favItems));
//         localStorage.setItem("favCount", favCount);
//         favCountElement.innerText = favCount;
//     }
// }
