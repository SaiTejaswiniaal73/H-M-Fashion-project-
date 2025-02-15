// Show search bar when clicking the search button (Small Devices)
document.getElementById("searchBtn").addEventListener("click", function () {
  var searchInput = document.getElementById("searchInput");
  if (
    searchInput.style.display === "none" ||
    searchInput.style.display === ""
  ) {
    searchInput.style.display = "block";
    searchInput.focus(); // Focus on the search input when shown
  } else {
    searchInput.style.display = "none";
  }
});

function updateCount(type, count) {
  let countElement = document.getElementById(type + "-count");
  countElement.textContent = count;

  // Show badge only if count > 0
  if (count > 0) {
    countElement.style.display = "flex";
  } else {
    countElement.style.display = "none";
  }
}

// Example: Simulating adding items
updateCount("fav", 0); // Set favorites count to 3
updateCount("bag", 0); // Set cart count to 2
