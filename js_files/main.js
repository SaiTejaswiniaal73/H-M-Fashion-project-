
// slide JSONs

let sliding_products = document.getElementById("sliding_products");

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
    console.log(data); // Check API response in console

    data.forEach((product, index) => {
      let card = document.createElement("div");
      card.className = "card";
      card.style.setProperty("--card-color", colors[index % colors.length]);

      let p_name = document.createElement("p");
      p_name.className = "product-name";
      p_name.innerHTML = product.name || "No Name"; // Ensure fallback value

      let p_image = document.createElement("img");
      p_image.src = product.image || "fallback-image.jpg"; // Ensure fallback
      p_image.alt = product.name || "Product Image";

      let p_category = document.createElement("p");
      p_category.innerHTML = `<b>Category:</b> ${product.category || "N/A"}`; // Replace brand with category

      let p_price = document.createElement("p");
      p_price.className = "price";
      p_price.innerHTML = `₹${
        product.price !== undefined ? product.price : "N/A"
      }`; // Fix price

      let p_size = document.createElement("p");
      p_size.className = "size";
      p_size.innerHTML = `<b>Size:</b> ${
        product.sizes ? product.sizes.join(", ") : "N/A"
      }`; // Fix size

      card.append(p_name, p_image, p_category, p_price, p_size);
      sliding_products.append(card);
    });
  })
  .catch((error) => {
    console.error("Error fetching API data:", error);
    sliding_products.innerHTML = "API data isn't fetched.";
  });

function handleSearch(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH")
        .then(response => response.json())
        .then(products => {
            let main_div = document.getElementById("products-container");
            main_div.innerHTML = ""; // Clear previous products

            const availableCategories = ["women", "men", "kids", "baby"];
            let filteredProducts = [];

            // Loop through categories and filter by product name based on the search term
            availableCategories.forEach((cat) => {
                if (products[0].products[cat]) {
                    filteredProducts = [
                        ...filteredProducts,
                        ...products[0].products[cat].filter(product =>
                            product.name.toLowerCase().includes(searchTerm)
                        ),
                    ];
                }
            });

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
