document.getElementById('searchButton').addEventListener('click', function() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    
    // Fetch products from your API
    const url = `https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH`;

    fetch(url)
        .then(response => response.json())
        .then(products => {
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchQuery)
            );

            // Check if any products match the search query
            if (filteredProducts.length > 0) {
                // Save the filtered products to localStorage
                localStorage.setItem('searchResults', JSON.stringify(filteredProducts));
                window.location.href = 'product.html';  // Redirect to product.html
            } else {
                document.getElementById('noResults').style.display = 'block';  // Show no results message
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});
