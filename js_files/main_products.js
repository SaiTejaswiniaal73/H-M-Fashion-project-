
// Function to fetch products based on category from the URL
function fetchProducts() {
  // Get category from the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category") || "all"; // Default to 'all' if no category is passed

  fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH")
    .then((response) => response.json())
    .then((products) => {
      let main_div = document.getElementById("products-container");
      main_div.innerHTML = ""; // Clear previous products

      const availableCategories = ["women", "men", "kids", "baby"];
      let filteredProducts = [];

      if (category !== "all" && availableCategories.includes(category)) {
        filteredProducts = products[0].products[category] || [];
      } else {
        // If "all" is selected, combine products from all categories
        availableCategories.forEach((cat) => {
          if (products[0].products[cat]) {
            filteredProducts = [
              ...filteredProducts,
              ...products[0].products[cat],
            ];
          }
        });
      }

      // Display the filtered products
      filteredProducts.forEach((product) => {
        let box = document.createElement("div");
        box.classList.add("product-box");

        let title = document.createElement("h3");
        let poster = document.createElement("img");
        let price = document.createElement("h4");
        let description = document.createElement("p");
        let sizes = document.createElement("p");
        let colors = document.createElement("p");
        let buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("product-buttons");

        // Set product details
        title.innerHTML = product.name;
        title.classList.add("product-title");

        poster.src = product.image;
        poster.classList.add("product-image");

        price.innerHTML = `₹${product.price}`;
        price.classList.add("product-price");

        description.innerHTML = product.description;
        description.classList.add("product-description");

        sizes.innerHTML = `Sizes: ${product.sizes.join(", ")}`;
        sizes.classList.add("product-sizes");

        colors.innerHTML = `Colors: ${product.colors.join(", ")}`;
        colors.classList.add("product-colors");

        // Create buttons
        let heartButton = document.createElement("button");
        heartButton.innerHTML = "❤️ Add to Favorites";
        heartButton.classList.add("heart-button");
        heartButton.onclick = () => addToFavorites(product.id);

        let cartButton = document.createElement("button");
        cartButton.innerHTML = "🛒 Add to Cart";
        cartButton.classList.add("cart-button");
        cartButton.onclick = () => addToCart(product.id);

        buttonsDiv.append(heartButton, cartButton);

        // Assemble product box
        box.append(
          poster,
          title,
          price,
          description,
          sizes,
          colors,
          buttonsDiv
        );
        main_div.append(box);
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

// Update the function to handle category changes on button click
function handleCategoryChange(category) {
  // Update the URL to reflect the selected category
  window.location.href = `products.html?category=${category}`;
}

// Call the function to fetch products initially
fetchProducts();
document.addEventListener("DOMContentLoaded", function() {
  updateCartBadgeCount();
});
