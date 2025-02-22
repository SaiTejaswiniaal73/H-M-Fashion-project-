

// with buttons

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input") || document.getElementById("searchInput");
    const searchButton = document.getElementById("searchBtn");
    const productContainer = document.getElementById("products-container");
    const searchForm = document.querySelector(".search-container");

    let allProducts = [];

    // Function to fetch and store products
    function fetchProducts() {
        fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH")
            .then(response => response.json())
            .then(products => {
                if (products.length > 0) {
                    const availableCategories = ["women", "men", "kids", "baby"];
                    allProducts = [];

                    availableCategories.forEach(category => {
                        if (products[0]?.products?.[category]) {
                            allProducts = [...allProducts, ...products[0].products[category]];
                        }
                    });

                    displayProducts(allProducts);
                }
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                productContainer.innerHTML = "<p>Failed to load products. Please try again later.</p>";
            });
    }

    // Function to handle search
    function handleSearch(event) {
        if (event) event.preventDefault(); // Prevent form submission if triggered from a form

        const searchQuery = searchInput?.value.toLowerCase().trim();
        
        if (!searchQuery) {
            productContainer.innerHTML = "<p>Please enter a search term.</p>";
            return;
        }

        const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery) ||
            product.description.toLowerCase().includes(searchQuery)
        );

        displayProducts(filteredProducts);
    }

    // Function to display filtered products
    // function displayProducts(products) {
    //     productContainer.innerHTML = ""; // Clear previous results

    //     if (products.length === 0) {
    //         productContainer.innerHTML = "<p>No products found.</p>";
    //         return;
    //     }

    //     products.forEach(product => {
    //         let box = document.createElement("div");
    //         box.classList.add("product-box");

    //         let title = document.createElement("h3");
    //         let poster = document.createElement("img");
    //         let price = document.createElement("h4");
    //         let description = document.createElement("p");
    //         let sizes = document.createElement("p");
    //         let colors = document.createElement("p");
    //         let buttonsDiv = document.createElement("div");
    //         buttonsDiv.classList.add("product-buttons");

    //         // Set product details
    //         title.textContent = product.name;
    //         title.classList.add("product-title");

    //         poster.src = product.image;
    //         poster.classList.add("product-image");
    //         poster.alt = product.name;

    //         price.textContent = `₹${product.price}`;
    //         price.classList.add("product-price");

    //         description.textContent = product.description;
    //         description.classList.add("product-description");

    //         sizes.textContent = `Sizes: ${product.sizes.join(", ")}`;
    //         sizes.classList.add("product-sizes");

    //         colors.textContent = `Colors: ${product.colors.join(", ")}`;
    //         colors.classList.add("product-colors");

    //         // Create buttons
    //         let heartButton = document.createElement("button");
    //         heartButton.textContent = "❤️ Add to Favorites";
    //         heartButton.classList.add("heart-button");
    //         heartButton.onclick = () => addToFavorites(product.id, product);

    //         let cartButton = document.createElement("button");
    //         cartButton.textContent = "🛒 Add to Cart";
    //         cartButton.classList.add("cart-button");
    //         cartButton.onclick = () => addToCart(product.id, product);

    //         buttonsDiv.append(heartButton, cartButton);

    //         // Assemble product box
    //         box.append(poster, title, price, description, sizes, colors, buttonsDiv);
    //         productContainer.append(box);
    //     });
    // }

  


    // Attach event listeners
    searchButton?.addEventListener("click", handleSearch);
    searchInput?.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            handleSearch(event);
        }
    });
    searchForm?.addEventListener("submit", handleSearch);

    // Load products initially
    fetchProducts();
});

