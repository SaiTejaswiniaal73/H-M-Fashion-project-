// Global variables to store fetched product data
let globalProductData = null;
let allProducts = [];

/* -------------------------------
   API Fetch & Display Products
---------------------------------*/
// async function fetchProducts() {
//   try {
//     const response = await fetch("https://679ba6ae33d316846324a4ae.mockapi.io/practise");
//     const data = await response.json();
//     console.log("Fetched data:", data);

//     // Validate data format
//     if (!Array.isArray(data) || data.length === 0 || !data[0]?.products) {
//       console.error("Invalid data returned from API");
//       throw new Error("Invalid product data");
//     }

//     // Store complete data for product lookup
//     globalProductData = data[0];

//     // Aggregate all products from available categories
//     const availableCategories = ["women", "men", "kids", "baby"];
//     allProducts = [];
//     availableCategories.forEach((category) => {
//       if (data[0].products[category]) {
//         allProducts = [...allProducts, ...data[0].products[category]];
//       }
//     });

//     // Get URL parameters for filtering
//     const urlParams = new URLSearchParams(window.location.search);
//     const categoryParam = urlParams.get("category")?.toLowerCase() || "all";
//     const searchQuery = urlParams.get("search")?.trim()?.toLowerCase();

//     // Filter products based on category and search query
//     let filteredProducts = filterProducts(globalProductData.products, categoryParam, searchQuery);
//     if (!filteredProducts.length && categoryParam === "all" && !searchQuery) {
//       filteredProducts = allProducts;
//     }

//     displayProducts(filteredProducts);
//   } 
// catch (error) {
//   console.error("Error fetching products:", error);
//   const container = document.getElementById("products-container");

//   if (container) {
//       container.innerHTML = "<p>Error loading products.</p>";
//   }
// }

// }
async function fetchProducts() {
  try {
    const response = await fetch("https://679ba6ae33d316846324a4ae.mockapi.io/practise");
    const data = await response.json();
    console.log("Fetched data:", data);

    // Validate data format
    if (!Array.isArray(data) || data.length === 0 || !data[0]?.products) {
      console.error("Invalid data returned from API");
      throw new Error("Invalid product data");
    }

    // Store complete data for product lookup
    globalProductData = data[0];

    // Aggregate all products from available categories
    const availableCategories = ["women", "men", "kids", "baby"];
    allProducts = [];
    availableCategories.forEach((category) => {
      if (data[0].products[category]) {
        allProducts = [...allProducts, ...data[0].products[category]];
      }
    });

    // Get URL parameters for filtering
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category")?.toLowerCase() || "all";
    const searchQuery = urlParams.get("search")?.trim()?.toLowerCase();

    // Filter products based on category and search query
    let filteredProducts = filterProducts(globalProductData.products, categoryParam, searchQuery);
    if (!filteredProducts.length && categoryParam === "all" && !searchQuery) {
      filteredProducts = allProducts;
    }

    displayProducts(filteredProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    const container = document.getElementById("products-container");
    if (container) {
      container.innerHTML = "<p>Error loading products.</p>";
    }
  }
}
// function filterProducts(productsData, category, searchQuery) {
//   const availableCategories = ["women", "men", "kids", "baby"];
//   let filtered = [];

//   if (category !== "all" && availableCategories.includes(category)) {
//     filtered = productsData[category] || [];
//   } else {
//     availableCategories.forEach((cat) => {
//       if (productsData[cat]) {
//         filtered = [...filtered, ...productsData[cat]];
//       }
//     });
//   }

//   if (searchQuery) {
//     filtered = filtered.filter(
//       (product) =>
//         product.name.toLowerCase().includes(searchQuery) ||
//         product.description.toLowerCase().includes(searchQuery)
//     );
//   }

//   return filtered;
// }
function filterProducts(productsData, category, searchQuery) {
  const availableCategories = ["women", "men", "kids", "baby"];
  let filtered = [];

  if (category !== "all" && availableCategories.includes(category)) {
    filtered = productsData[category] || [];
  } else {
    availableCategories.forEach((cat) => {
      if (productsData[cat]) {
        filtered = [...filtered, ...productsData[cat]];
      }
    });
  }

  if (searchQuery) {
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery)
    );
  }

  return filtered;
}
// function displayProducts(products) {
//   const container = document.getElementById("products-container");
//   container.innerHTML = ""; // Clear previous content

//   if (!products || products.length === 0) {
//     container.innerHTML = "<p>No products found.</p>";
//     return;
//   }

//   products.forEach((product) => {
//     const productBox = document.createElement("div");
//     productBox.classList.add("product-box");

//     // Product Image
//     const img = document.createElement("img");
//     img.src = product.image;
//     img.alt = product.name;
//     img.classList.add("product-image");

//     // Product Title
//     const title = document.createElement("h3");
//     title.classList.add("product-title");
//     title.textContent = product.name;

//     // Product Price
//     const price = document.createElement("h4");
//     price.classList.add("product-price");
//     price.textContent = `₹${product.price}`;

//     // Description
//     const description = document.createElement("p");
//     description.classList.add("product-description");
//     description.textContent = product.description;

//     // Sizes
//     const sizes = document.createElement("p");
//     sizes.classList.add("product-sizes");
//     sizes.textContent = `Sizes: ${product.sizes.join(", ")}`;

//     // Colors
//     const colors = document.createElement("p");
//     colors.classList.add("product-colors");
//     colors.textContent = `Colors: ${product.colors.join(", ")}`;

//     // Buttons Container
//     const buttonsDiv = document.createElement("div");
//     buttonsDiv.classList.add("product-buttons");

//     // Add to Favorites Button
//     const favButton = document.createElement("button");
//     favButton.classList.add("heart-button");
//     favButton.textContent = "❤️ Add to Favorites";
//     favButton.addEventListener("click", () => addToFavorites(product.id, product));

//     // Add to Cart Button
//     const cartButton = document.createElement("button");
//     cartButton.classList.add("cart-button");
//     cartButton.textContent = "🛒 Add to Cart";
//     cartButton.addEventListener("click", () => addToCart(product.id, product));

//     buttonsDiv.appendChild(favButton);
//     buttonsDiv.appendChild(cartButton);

//     // Assemble product box
//     productBox.appendChild(img);
//     productBox.appendChild(title);
//     productBox.appendChild(price);
//     productBox.appendChild(description);
//     productBox.appendChild(sizes);
//     productBox.appendChild(colors);
//     productBox.appendChild(buttonsDiv);

//     container.appendChild(productBox);
//   });
// }
function displayProducts(products) {
  const container = document.getElementById("products-container");
  if (!container) {
    console.error("Error: #products-container element not found!");
    return;
  }
  container.innerHTML = ""; // Clear previous content

  if (!products || products.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach((product) => {
    const productBox = document.createElement("div");
    productBox.classList.add("product-box");

    // Product Image
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.classList.add("product-image");

    // Product Title
    const title = document.createElement("h3");
    title.classList.add("product-title");
    title.textContent = product.name;

    // Product Price
    const price = document.createElement("h4");
    price.classList.add("product-price");
    price.textContent = `₹${product.price}`;

    // Description
    const description = document.createElement("p");
    description.classList.add("product-description");
    description.textContent = product.description;

    // Sizes
    const sizes = document.createElement("p");
    sizes.classList.add("product-sizes");
    sizes.textContent = `Sizes: ${product.sizes.join(", ")}`;

    // Colors
    const colors = document.createElement("p");
    colors.classList.add("product-colors");
    colors.textContent = `Colors: ${product.colors.join(", ")}`;

    // Buttons Container
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("product-buttons");

    // Add to Favorites Button
    const favButton = document.createElement("button");
    favButton.classList.add("heart-button");
    favButton.textContent = "❤️ Add to Favorites";
    favButton.addEventListener("click", () => addToFavorites(product.id, product));

    // Add to Cart Button
    const cartButton = document.createElement("button");
    cartButton.classList.add("cart-button");
    cartButton.textContent = "🛒 Add to Cart";
    cartButton.addEventListener("click", () => addToCart(product.id, product));

    buttonsDiv.appendChild(favButton);
    buttonsDiv.appendChild(cartButton);

    // Assemble product box
    productBox.appendChild(img);
    productBox.appendChild(title);
    productBox.appendChild(price);
    productBox.appendChild(description);
    productBox.appendChild(sizes);
    productBox.appendChild(colors);
    productBox.appendChild(buttonsDiv);

    container.appendChild(productBox);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  fetchProducts();
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  updateBadgeCount("fav", favorites.length);
  updateCartBadgeCount();
});

/* -------------------------------
   Helper & Notification Functions
---------------------------------*/

// Helper function to find a product by its ID (using aggregated allProducts)
function findProductById(productId) {
  return allProducts.find(product => product.id === productId);
}

// Function to update the badge count for favorites or cart
function updateBadgeCount(type, count) {
  // type should be "fav" for favorites or "bag" for cart
  const countElements = document.querySelectorAll(`#${type}-count-large, #${type}-count-small`);
  countElements.forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? "block" : "none";
  });
}

// Function to update the cart badge count (for the nav bar)
function updateCartBadgeCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.length;

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

// Function to show a temporary notification
function showNotification(message) {
  const container = document.getElementById("notification-container");
  if (!container) return;
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  container.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 2000);
}





/* -------------------------------
   Login Check Helper
---------------------------------*/
// Helper function to ensure the user is logged in (not as a guest)
function ensureUserLoggedIn() {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    showNotification("Please sign in to add products to cart or favorites.");
    setTimeout(function() {
      window.location.href = "login/loginPage.html";
    }, 1500);
    return false;
  }
  return true;
}

/* -------------------------------
   Favorites & Cart Functions
---------------------------------*/
// Function to add product to favorites
function addToFavorites(productId, product) {
  if (!ensureUserLoggedIn()) return;  // Check login first

  if (!product) {
    product = findProductById(productId);
  }
  if (!product) return;

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.find(item => item.id === productId)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateBadgeCount("fav", favorites.length);
    showNotification("Added to Favorites");
  } else {
    showNotification("Product already in Favorites");
  }
}

// Function to add a product to the cart
function addToCart(productId, product) {
  if (!ensureUserLoggedIn()) return;  // Check login first

  if (!product) {
    product = findProductById(productId);
  }
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.find(item => item.id === productId)) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    showNotification("Added to Cart");
  } else {
    showNotification("Product already in Cart");
  }
  
  updateCartBadgeCount();
}

/* -------------------------------
   Initial Setup
---------------------------------*/
document.addEventListener("DOMContentLoaded", function() {
  // Fetch products from API
  fetchProducts();
  // Update badge counts for favorites and cart on load
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  updateBadgeCount("fav", favorites.length);
  updateCartBadgeCount();
});

