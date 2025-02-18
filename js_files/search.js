

// Function to handle search
function handleSearch(event) {
    if (event) event.preventDefault(); // Prevent form submission if triggered from a form

    // Get search query from both search bars
    let searchQuery = document.getElementById("search-input")?.value.toLowerCase().trim() || 
                      document.getElementById("searchInput")?.value.toLowerCase().trim();

    if (!searchQuery) {
        alert("Please enter a search term.");
        return;
    }

    // Fetch products from API
    fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH")
        .then(response => response.json())
        .then(products => {
            let filteredProducts = [];

            const availableCategories = ["women", "men", "kids", "baby"];
            availableCategories.forEach(category => {
                if (products[0].products[category]) {
                    filteredProducts = [
                        ...filteredProducts,
                        ...products[0].products[category].filter(product =>
                            product.name.toLowerCase().includes(searchQuery)
                        ),
                    ];
                }
            });

            displayProducts(filteredProducts);
        })
        .catch(error => console.error("Error fetching products:", error));
}

// Attach event listener to **desktop search form**
document.querySelector(".search-container").addEventListener("submit", handleSearch);

// Attach event listener to **mobile search button**
document.getElementById("searchBtn").addEventListener("click", function () {
    handleSearch();
});

// Allow **Enter key** to trigger search in mobile input field
document.getElementById("searchInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        handleSearch();
    }
});

// Function to display filtered products
function displayProducts(filteredProducts) {
    const mainDiv = document.getElementById("products-container"); 
    mainDiv.innerHTML = ""; // Clear any previously displayed products

    if (filteredProducts.length === 0) {
        mainDiv.innerHTML = "<p>No products found.</p>"; // Show message if no results
        return;
    }

    // Display the filtered products
    filteredProducts.forEach(product => {
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
        box.append(poster, title, price, description, sizes, colors, buttonsDiv);
        mainDiv.append(box);
    });
}

// Attach event listener to the mobile search button
document.getElementById("searchBtn").addEventListener("click", function () {
    handleSearch(new Event("submit")); // Simulate form submission
});

// Allow "Enter" key to trigger search in the mobile input field
document.getElementById("searchInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        handleSearch(event);
    }
});
