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
