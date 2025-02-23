document.addEventListener("DOMContentLoaded", function () {
  /*** Mobile Search Toggle ***/
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", function () {
      if (
        searchInput.style.display === "none" ||
        searchInput.style.display === ""
      ) {
        searchInput.style.display = "block";
        searchInput.focus();
      } else {
        searchInput.style.display = "none";
      }
    });
  }

  /*** Filter Menu Toggle ***/
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
