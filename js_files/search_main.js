


function handleSearch(event) {
    // Prevent default form submission behavior
    if (event) event.preventDefault();
  
    // Retrieve the search query from desktop or mobile input fields
    const queryDesktop = document.getElementById("search-input")?.value || "";
    const queryMobile = document.getElementById("searchInput")?.value || "";
    const searchQuery = (queryDesktop || queryMobile).toLowerCase().trim();
  
    if (!searchQuery) {
      alert("Please enter a search term.");
      return;
    }
  
    // Redirect to products.html with the search query as a URL parameter
    window.location.href = `products.html?search=${encodeURIComponent(searchQuery)}`;
  }
  
  // Attach event listeners for the desktop search form and mobile input/button
  const desktopSearchForm = document.querySelector(".search-container");
  desktopSearchForm?.addEventListener("submit", handleSearch);
  
  const mobileSearchBtn = document.getElementById("searchBtn");
  mobileSearchBtn?.addEventListener("click", handleSearch);
  
  const mobileSearchInput = document.getElementById("searchInput");
  mobileSearchInput?.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  });
  
// function handleSearch(event) {
//     if (event) event.preventDefault(); // Prevent form submission

//     // Get search query from input fields
//     let searchQuery = document.getElementById("search-input")?.value.toLowerCase().trim() || 
//                       document.getElementById("searchInput")?.value.toLowerCase().trim();

//     if (!searchQuery) {
//         alert("Please enter a search term.");
//         return;
//     }

//     // Redirect to products.html with search query in the URL
//     window.location.href = `products.html?search=${encodeURIComponent(searchQuery)}`;
// }

// // Attach event listeners for desktop and mobile search
// document.querySelector(".search-container").addEventListener("submit", handleSearch);
// document.getElementById("searchBtn").addEventListener("click", handleSearch);
// document.getElementById("searchInput").addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//         handleSearch(event);
//     }
// });


// // function handleSearch(event) {
// //     if (event) event.preventDefault(); // Prevent form submission if triggered from a form
  
// //     // Get search query from both search bars
// //     let searchQuery = document.getElementById("search-input")?.value.toLowerCase().trim() || 
// //                       document.getElementById("searchInput")?.value.toLowerCase().trim();
  
// //     if (!searchQuery) {
// //         alert("Please enter a search term.");
// //         return;
// //     }
  
// //     // Fetch products from API
// //     fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH")
// //         .then(response => response.json())
// //         .then(products => {
// //             let filteredProducts = [];
  
// //             const availableCategories = ["women", "men", "kids", "baby"];
// //             availableCategories.forEach(category => {
// //                 if (products[0].products[category]) {
// //                     filteredProducts = [
// //                         ...filteredProducts,
// //                         ...products[0].products[category].filter(product =>
// //                             product.name.toLowerCase().includes(searchQuery)
// //                         ),
// //                     ];
// //                 }
// //             });
  
// //             // Store the filtered products and search query in localStorage
// //             localStorage.setItem('searchQuery', searchQuery); // Store search term
// //             localStorage.setItem('searchResults', JSON.stringify(filteredProducts)); // Store filtered products
  
// //             // Redirect to product.html
// //             window.location.href = "products.html";
// //         })
// //         .catch(error => console.error("Error fetching products:", error));
// //   }
  
// //   // Attach event listener to the desktop search form
// //   document.querySelector(".search-container").addEventListener("submit", handleSearch);
  
// //   // Optional: Allow Enter key to trigger search in mobile input field
// //   document.getElementById("searchInput").addEventListener("keypress", function (event) {
// //     if (event.key === "Enter") {
// //         handleSearch(event);
// //     }
// //   });
  
    
// // Function to handle search and redirect to products.html with query
// function handleSearch(event) {
//     if (event) event.preventDefault(); // Prevent form submission

//     // Get search query from input fields
//     let searchQuery = document.getElementById("search-input")?.value.toLowerCase().trim() || 
//                       document.getElementById("searchInput")?.value.toLowerCase().trim();

//     if (!searchQuery) {
//         alert("Please enter a search term.");
//         return;
//     }

//     // Redirect to products.html with search query in the URL
//     window.location.href = `products.html?search=${encodeURIComponent(searchQuery)}`;
// }

// // Attach event listeners for desktop and mobile search
// document.querySelector(".search-container").addEventListener("submit", handleSearch);
// document.getElementById("searchBtn").addEventListener("click", handleSearch);
// document.getElementById("searchInput").addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//         handleSearch(event);
//     }
// });


// document.getElementById('searchButton').addEventListener('click', function() {
//     const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    
//     // Fetch products from your API
//     const url = `https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH`;

//     function handleSearch(event) {
//     if (event) event.preventDefault(); // Prevent form submission

//     // Get search query from input fields
//     let searchQuery = document.getElementById("search-input")?.value.toLowerCase().trim() || 
//                       document.getElementById("searchInput")?.value.toLowerCase().trim();

//     if (!searchQuery) {
//         alert("Please enter a search term.");
//         return;
//     }

//     // Redirect to products.html with search query in the URL
//     window.location.href = `products.html?search=${encodeURIComponent(searchQuery)}`;
// }

// // Attach event listeners for desktop and mobile search
// document.querySelector(".search-container").addEventListener("submit", handleSearch);
// document.getElementById("searchBtn").addEventListener("click", handleSearch);
// document.getElementById("searchInput").addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//         handleSearch(event);
//     }
// });

//     fetch(url)
//         .then(response => response.json())
//         .then(products => {
//             const filteredProducts = products.filter(product => 
//                 product.name.toLowerCase().includes(searchQuery)
//             );

//             // Check if any products match the search query
//             if (filteredProducts.length > 0) {
//                 // Save the filtered products to localStorage
//                 localStorage.setItem('searchResults', JSON.stringify(filteredProducts));
//                 window.location.href = 'product.html';  // Redirect to product.html
//             } else {
//                 document.getElementById('noResults').style.display = 'block';  // Show no results message
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching products:', error);
//         });
// });