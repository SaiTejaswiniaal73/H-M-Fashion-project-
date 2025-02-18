
// function handleSearch(event) {
//     if (event) event.preventDefault(); // Prevent form submission if triggered from a form
  
//     // Get search query from both search bars
//     let searchQuery = document.getElementById("search-input")?.value.toLowerCase().trim() || 
//                       document.getElementById("searchInput")?.value.toLowerCase().trim();
  
//     if (!searchQuery) {
//         alert("Please enter a search term.");
//         return;
//     }
  
//     // Fetch products from API
//     fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH")
//         .then(response => response.json())
//         .then(products => {
//             let filteredProducts = [];
  
//             const availableCategories = ["women", "men", "kids", "baby"];
//             availableCategories.forEach(category => {
//                 if (products[0].products[category]) {
//                     filteredProducts = [
//                         ...filteredProducts,
//                         ...products[0].products[category].filter(product =>
//                             product.name.toLowerCase().includes(searchQuery)
//                         ),
//                     ];
//                 }
//             });
  
//             // Store the filtered products and search query in localStorage
//             localStorage.setItem('searchQuery', searchQuery); // Store search term
//             localStorage.setItem('searchResults', JSON.stringify(filteredProducts)); // Store filtered products
  
//             // Redirect to product.html
//             window.location.href = "products.html";
//         })
//         .catch(error => console.error("Error fetching products:", error));
//   }
  
//   // Attach event listener to the desktop search form
//   document.querySelector(".search-container").addEventListener("submit", handleSearch);
  
//   // Optional: Allow Enter key to trigger search in mobile input field
//   document.getElementById("searchInput").addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//         handleSearch(event);
//     }
//   });
  
    
// Function to handle search and redirect to products.html with query
function handleSearch(event) {
    if (event) event.preventDefault(); // Prevent form submission

    // Get search query from input fields
    let searchQuery = document.getElementById("search-input")?.value.toLowerCase().trim() || 
                      document.getElementById("searchInput")?.value.toLowerCase().trim();

    if (!searchQuery) {
        alert("Please enter a search term.");
        return;
    }

    // Redirect to products.html with search query in the URL
    window.location.href = `products.html?search=${encodeURIComponent(searchQuery)}`;
}

// Attach event listeners for desktop and mobile search
document.querySelector(".search-container").addEventListener("submit", handleSearch);
document.getElementById("searchBtn").addEventListener("click", handleSearch);
document.getElementById("searchInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        handleSearch(event);
    }
});


