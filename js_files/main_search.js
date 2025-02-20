// document.addEventListener("DOMContentLoaded", function () {
//     const productContainer = document.getElementById("products-container");

//     // Function to fetch and display products based on search query
//     function fetchAndDisplayProducts() {
//         const urlParams = new URLSearchParams(window.location.search);
//         const searchQuery = urlParams.get("search")?.toLowerCase().trim();

//         if (!searchQuery) {
//             productContainer.innerHTML = "<p>Please enter a search term.</p>";
//             return;
//         }

//         fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH")
//             .then(response => response.json())
//             .then(products => {
//                 let filteredProducts = [];

//                 if (products.length > 0) {
//                     const availableCategories = ["women", "men", "kids", "baby"];
//                     availableCategories.forEach(category => {
//                         if (products[0]?.products?.[category]) {
//                             filteredProducts = [
//                                 ...filteredProducts,
//                                 ...products[0].products[category].filter(product =>
//                                     product.name.toLowerCase().includes(searchQuery) ||
//                                     product.description.toLowerCase().includes(searchQuery)
//                                 ),
//                             ];
//                         }
//                     });
//                 }

//                 displayProducts(filteredProducts);
//             })
//             .catch(error => {
//                 console.error("Error fetching products:", error);
//                 productContainer.innerHTML = "<p>Failed to load products. Please try again later.</p>";
//             });
//     }

//     // Function to display filtered products
//     function displayProducts(products) {
//         productContainer.innerHTML = ""; // Clear previous results

//         if (products.length === 0) {
//             productContainer.innerHTML = "<p>No products found.</p>";
//             return;
//         }

//         products.forEach(product => {
//             let box = document.createElement("div");
//             box.classList.add("product-box");

//             let title = document.createElement("h3");
//             let poster = document.createElement("img");
//             let price = document.createElement("h4");
//             let description = document.createElement("p");
//             let sizes = document.createElement("p");
//             let colors = document.createElement("p");
//             let buttonsDiv = document.createElement("div");
//             buttonsDiv.classList.add("product-buttons");

//             // Set product details
//             title.textContent = product.name;
//             title.classList.add("product-title");

//             poster.src = product.image;
//             poster.classList.add("product-image");
//             poster.alt = product.name;

//             price.textContent = `₹${product.price}`;
//             price.classList.add("product-price");

//             description.textContent = product.description;
//             description.classList.add("product-description");

//             sizes.textContent = `Sizes: ${product.sizes.join(", ")}`;
//             sizes.classList.add("product-sizes");

//             colors.textContent = `Colors: ${product.colors.join(", ")}`;
//             colors.classList.add("product-colors");

//             // Create buttons
//             let heartButton = document.createElement("button");
//             heartButton.textContent = "❤️ Add to Favorites";
//             heartButton.classList.add("heart-button");
//             heartButton.onclick = () => addToFavorites(product);

//             let cartButton = document.createElement("button");
//             cartButton.textContent = "🛒 Add to Cart";
//             cartButton.classList.add("cart-button");
//             cartButton.onclick = () => addToCart(product);

//             buttonsDiv.append(heartButton, cartButton);

//             // Assemble product box
//             box.append(poster, title, price, description, sizes, colors, buttonsDiv);
//             productContainer.append(box);
//         });
//     }

//     // Functions to handle adding products to favorites and cart
//     function addToFavorites(product) {
//         let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//         if (!favorites.some(item => item.id === product.id)) {
//             favorites.push(product);
//             localStorage.setItem("favorites", JSON.stringify(favorites));
//             alert("Added to Favorites! ❤️");
//         } else {
//             alert("This item is already in Favorites.");
//         }
//     }

//     function addToCart(product) {
//         let cart = JSON.parse(localStorage.getItem("cart")) || [];
//         if (!cart.some(item => item.id === product.id)) {
//             cart.push(product);
//             localStorage.setItem("cart", JSON.stringify(cart));
//             alert("Added to Cart! 🛒");
//         } else {
//             alert("This item is already in your Cart.");
//         }
//     }

//     // Call function to fetch and display products
//     fetchAndDisplayProducts();
// });


document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input"); // Ensure the ID matches your input field
    const searchButton = document.getElementById("searchBtn");

    searchButton.addEventListener("click", function () {
        const query = searchInput.value.trim();
        if (query) {
            localStorage.setItem("searchQuery", query); // Store the query
            window.location.href = "product.html"; // Redirect to product.html
        }
    });

    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const query = searchInput.value.trim();
            if (query) {
                localStorage.setItem("searchQuery", query);
                window.location.href = "product.html";
            }
        }
    });
});
