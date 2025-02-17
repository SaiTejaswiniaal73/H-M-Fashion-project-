// Fetch products from API
function fetchProducts(category = "") {
  fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH")
    .then((response) => response.json())
    .then((products) => {
      let main_div = document.getElementById("products-container");
      main_div.innerHTML = ""; // Clear previous products

      let categories = ["women", "men", "kids", "baby"];
      let filteredProducts = [];

      if (category && categories.includes(category)) {
        filteredProducts = products[0].products[category]; // Get products for selected category
      } else {
        // If no category is selected, display all products
        categories.forEach((cat) => {
          filteredProducts = [
            ...filteredProducts,
            ...products[0].products[cat],
          ];
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

        // Title (Product name)
        title.innerHTML = product.name;
        title.classList.add("product-title");

        // Product image
        poster.src = product.image;
        poster.classList.add("product-image");

        // Price
        price.innerHTML = `₹${product.price}`;
        price.classList.add("product-price");
        price.style.color = "green";
        price.style.backgroundColor = "red";
        price.style.fontWeight = "bold"; // Makes the text bold
        price.style.fontSize = "20px"; // Increases the font size to 20px (you can adjust as needed)

        // Description
        description.innerHTML = product.description;
        description.classList.add("product-description");

        // Change background color using JavaScript
        description.style.backgroundColor = "yellow";

        // Sizes
        sizes.innerHTML = `Sizes: ${product.sizes.join(", ")}`;
        sizes.classList.add("product-sizes");
        sizes.style.backgroundColor = "violet";

        // Colors
        colors.innerHTML = `Colors: ${product.colors.join(", ")}`;
        colors.classList.add("product-colors");
        colors.style.backgroundColor = "aqua";

        // For the heart button (add to favorites)
        let heartButton = document.createElement("button");
        heartButton.innerHTML = "❤️ Add to Favorites"; // Button text
        heartButton.classList.add("heart-button"); // Apply default heart button class
        heartButton.onclick = function () {
          addToFavorites(product.id);
        };
        heartButton.style.backgroundColor = "#ffcc00";

        // For the cart button (add to cart)
        let cartButton = document.createElement("button");
        cartButton.innerHTML = "🛒 Add to Cart"; // Button text
        cartButton.classList.add("cart-button"); // Apply default cart button class
        cartButton.onclick = function () {
          addToCart(product.id);
        };
        cartButton.style.backgroundColor = "green";

        // Append buttons to buttonsDiv
        buttonsDiv.append(heartButton, cartButton);

        // Append elements to the product box
        box.append(
          poster,
          title,
          price,
          description,
          sizes,
          colors,
          buttonsDiv
        );

        // Append the product box to the main div
        main_div.append(box);
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

// Event listeners for category clicks
document
  .getElementById("women")
  .addEventListener("click", () => fetchProducts("women"));
document
  .getElementById("men")
  .addEventListener("click", () => fetchProducts("men"));
document
  .getElementById("kids")
  .addEventListener("click", () => fetchProducts("kids"));
document
  .getElementById("baby")
  .addEventListener("click", () => fetchProducts("baby"));

// Default display: show all products on page load
fetchProducts();

// Function to handle adding to favorites
function addToFavorites(productId) {
  console.log(`Product ${productId} added to Favorites!`);
}

// Function to handle adding to cart
function addToCart(productId) {
  console.log(`Product ${productId} added to Cart!`);
}
