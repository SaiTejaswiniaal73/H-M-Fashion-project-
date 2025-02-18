document.addEventListener("DOMContentLoaded", function () {
  /*** SEARCH FUNCTIONALITY ***/
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", function () {
      if (
        searchInput.style.display === "none" ||
        searchInput.style.display === ""
      ) {
        searchInput.style.display = "block";
        searchInput.focus(); // Auto-focus when opened
      } else {
        searchInput.style.display = "none";
      }
    });
  }

  /*** FILTER MENU TOGGLE ***/
  const filterToggle = document.getElementById("filter-toggle");
  const filterMenu = document.getElementById("filter-menu");

  if (filterToggle && filterMenu) {
    filterToggle.addEventListener("click", function () {
      filterMenu.classList.toggle("active");
    });

    // Close filter menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !filterToggle.contains(event.target) &&
        !filterMenu.contains(event.target)
      ) {
        filterMenu.classList.remove("active");
      }
    });
  }

});



//   /*** BADGE COUNT UPDATES ***/
//   function updateCount(type, count) {
//     let countElement = document.getElementById(type + "-count");
//     if (countElement) {
//       countElement.textContent = count;
//       countElement.style.display = count > 0 ? "flex" : "none";
//     }
//   }

//   // Example: Initializing counts (can be updated dynamically)
//   updateCount("fav", 0); // Favorites count
//   updateCount("bag", 0); // Shopping bag count
// });

