// Sliding Products Section

const sliding_products = document.getElementById("sliding_products");

// Array of colors for product backgrounds
const colors = [
  "#FFB6C1",
  "#E6E6FA",
  "#D8BFD8",
  "#F0E6FA",
  "#FFD1DC",
  "#C3B1E1",
];

fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/clothing")
  .then((response) => response.json())
  .then((data) => {
    console.log("Sliding products data:", data);

    data.forEach((product, index) => {
      let card = document.createElement("div");
      card.className = "card";
      card.style.setProperty("--card-color", colors[index % colors.length]);

      let p_name = document.createElement("p");
      p_name.className = "product-name";
      p_name.textContent = product.name || "No Name";

      let p_image = document.createElement("img");
      p_image.src = product.image || "fallback-image.jpg";
      p_image.alt = product.name || "Product Image";

      let p_category = document.createElement("p");
      p_category.innerHTML = `<b>Category:</b> ${product.category || "N/A"}`;

      let p_price = document.createElement("p");
      p_price.className = "price";
      p_price.textContent =
        product.price !== undefined ? `₹${product.price}` : "₹N/A";

      let p_size = document.createElement("p");
      p_size.className = "size";
      p_size.innerHTML = `<b>Size:</b> ${
        product.sizes && product.sizes.length > 0
          ? product.sizes.join(", ")
          : "N/A"
      }`;

      card.append(p_name, p_image, p_category, p_price, p_size);
      sliding_products.append(card);
    });
  })
  .catch((error) => {
    console.error("Error fetching sliding products API data:", error);
    sliding_products.textContent = "API data isn't fetched.";
  });

// Search Handler Function

function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (!searchTerm) {
    alert("Please enter a search term.");
    return;
  }

  fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH")
    .then((response) => response.json())
    .then((products) => {
      const main_div = document.getElementById("products-container");
      main_div.innerHTML = ""; // Clear previous products

      const availableCategories = ["women", "men", "kids", "baby"];
      let filteredProducts = [];

      // Loop through categories and filter by product name based on the search term
      availableCategories.forEach((cat) => {
        if (products[0] && products[0].products && products[0].products[cat]) {
          filteredProducts = [
            ...filteredProducts,
            ...products[0].products[cat].filter((product) =>
              product.name.toLowerCase().includes(searchTerm)
            ),
          ];
        }
      });

      if (filteredProducts.length === 0) {
        main_div.textContent = "No products found.";
        return;
      }

      // Display the filtered products
      filteredProducts.forEach((product) => {
        let box = document.createElement("div");
        box.classList.add("product-box");

        let title = document.createElement("h3");
        title.classList.add("product-title");
        title.textContent = product.name;

        let poster = document.createElement("img");
        poster.classList.add("product-image");
        poster.src = product.image || "fallback-image.jpg";
        poster.alt = product.name;

        let price = document.createElement("h4");
        price.classList.add("product-price");
        price.textContent = `₹${product.price}`;

        let description = document.createElement("p");
        description.classList.add("product-description");
        description.textContent = product.description || "";

        let sizes = document.createElement("p");
        sizes.classList.add("product-sizes");
        sizes.textContent =
          product.sizes && product.sizes.length > 0
            ? `Sizes: ${product.sizes.join(", ")}`
            : "Sizes: N/A";

        let colors = document.createElement("p");
        colors.classList.add("product-colors");
        colors.textContent =
          product.colors && product.colors.length > 0
            ? `Colors: ${product.colors.join(", ")}`
            : "Colors: N/A";

        // Create buttons for favorites and cart
        let buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("product-buttons");

        let heartButton = document.createElement("button");
        heartButton.classList.add("heart-button");
        heartButton.textContent = "❤️ Add to Favorites";
        heartButton.onclick = () => addToFavorites(product.id);

        let cartButton = document.createElement("button");
        cartButton.classList.add("cart-button");
        cartButton.textContent = "🛒 Add to Cart";
        cartButton.onclick = () => addToCart(product.id);

        buttonsDiv.append(heartButton, cartButton);

        // Assemble the product box
        box.append(poster, title, price, description, sizes, colors, buttonsDiv);
        main_div.append(box);
      });
    })
    .catch((error) => {
      console.error("Error fetching search products:", error);
    });
}
