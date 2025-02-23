// // Global search handler function
// function handleSearch(event) {
//     if (event) event.preventDefault();
//     const searchInput =
//       document.getElementById("search-input") ||
//       document.getElementById("searchInput");
//     const query = searchInput.value.trim().toLowerCase();
  
//     if (!query) {
//       document.getElementById("products-container").innerHTML =
//         "<p>Please enter a search term.</p>";
//       return;
//     }
  
//     if (typeof allProducts === "undefined") {
//       console.error("Product data not loaded yet.");
//       return;
//     }
  
//     const filteredProducts = allProducts.filter(
//       (product) =>
//         product.name.toLowerCase().includes(query) ||
//         product.description.toLowerCase().includes(query)
//     );
  
//     // Update URL parameter (optional)
//     const url = new URL(window.location);
//     url.searchParams.set("search", query);
//     window.history.pushState({}, "", url);
  
//     if (typeof displayProducts === "function") {
//       displayProducts(filteredProducts);
//     }
//   }
  
//   // Attach search event listeners on DOMContentLoaded
//   document.addEventListener("DOMContentLoaded", function () {
//     const searchBtn = document.getElementById("searchBtn");
//     const searchInput =
//       document.getElementById("search-input") ||
//       document.getElementById("searchInput");
  
//     if (searchBtn && searchInput) {
//       searchBtn.addEventListener("click", handleSearch);
//       searchInput.addEventListener("keypress", function (event) {
//         if (event.key === "Enter") {
//           handleSearch(event);
//         }
//       });
//     }
//   });
  


// Global search handler function
function handleSearch(event, searchField) {
  if (event) event.preventDefault();
  const query = searchField.value.trim().toLowerCase();

  if (!query) {
    document.getElementById("products-container").innerHTML =
      "<p>Please enter a search term.</p>";
    return;
  }

  if (typeof allProducts === "undefined") {
    console.error("Product data not loaded yet.");
    return;
  }

  const filteredProducts = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
  );

  // Optionally update URL parameter
  const url = new URL(window.location);
  url.searchParams.set("search", query);
  window.history.pushState({}, "", url);

  if (typeof displayProducts === "function") {
    displayProducts(filteredProducts);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Desktop search elements
  const desktopSearchInput = document.getElementById("search-input");
  // Assume the desktop search button is inside the .search-container form
  const desktopSearchForm = document.querySelector(".search-container");

  if (desktopSearchInput && desktopSearchForm) {
    // Listen for form submit
    desktopSearchForm.addEventListener("submit", function (event) {
      handleSearch(event, desktopSearchInput);
    });
    // Allow Enter key in the desktop input
    desktopSearchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        handleSearch(event, desktopSearchInput);
      }
    });
  }

  // Mobile search elements
  const mobileSearchInput = document.getElementById("searchInput");
  const mobileSearchBtn = document.getElementById("searchBtn");

  if (mobileSearchInput && mobileSearchBtn) {
    mobileSearchBtn.addEventListener("click", function (event) {
      handleSearch(event, mobileSearchInput);
    });
    mobileSearchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        handleSearch(event, mobileSearchInput);
      }
    });
  }
});
