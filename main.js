document.addEventListener("DOMContentLoaded", function () {
  const navLinks = {
    home: "#women-section",
    "men-section": "#men-section",
    "women-section": "#women-section",
    "kids-section": "#kids-section",
    "baby-section": "#baby-section",
  };

  // ✅ FILTER FOR SMALL DEVICES
  const filterToggle = document.getElementById("filter-toggle");
  const filterMenu = document.getElementById("filter-menu");

  if (filterToggle && filterMenu) { // ✅ Check if elements exist
    filterToggle.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent immediate closing
      filterMenu.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (!filterToggle.contains(event.target) && !filterMenu.contains(event.target)) {
        filterMenu.classList.remove("active");
      }
    });
  }

  // ✅ FUNCTION TO NAVIGATE SMOOTHLY
  function navigateToSection(event, target) {
    if (navLinks[target]) {
      event.preventDefault();
      window.location.href = navLinks[target]; // Navigate to section
    }
  }

  // ✅ APPLY TO NAVBAR LINKS
  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.addEventListener("click", function (event) {
      navigateToSection(event, this.getAttribute("href").replace("#", ""));
    });
  });

  // ✅ APPLY TO OFFER BOX BUTTONS
  document.querySelectorAll(".offer-links .offer-btn").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      navigateToSection(
        event,
        this.getAttribute("href").replace(".html", "-section")
      );
    });
  });

  // ✅ WISHLIST CLICK EVENT (FOR SMALL & LARGE SCREENS)
  const wishlistLinks = document.querySelectorAll("#wishlist-link, #wishlist-link-large");

  wishlistLinks.forEach((wishlistLink) => {
    wishlistLink.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default action
      window.location.href = "wishlist.html";
    });
  });

  // ✅ CART CLICK EVENT (FOR SMALL & LARGE SCREENS)
  document.querySelectorAll("#cart-link, #cart-link-large").forEach((cartLink) => {
    cartLink.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default action
      window.location.href = "cart.html";
    });
  });

  // ✅ NAVIGATE TO CATEGORY (STORE IN LOCAL STORAGE)
  function navigateToCategory(category) {
    localStorage.setItem('selectedCategory', category);
    window.location.href = 'cart.html';
  }

  // ✅ SEARCH FUNCTION
  function handleSearch(event) {
    event.preventDefault(); // Prevent page reload

    let searchInput = document
      .getElementById("search-input")
      .value.toLowerCase()
      .trim();

    // Mapping search terms to sections
    const searchMapping = {
      men: "#mens-section",
      mens: "#mens-section",
      women: "#womens-section",
      womens: "#womens-section",
      kids: "#kids-section",
      kid: "#kids-section",
      baby: "#baby-section",
      babies: "#baby-section",
    };

    if (searchMapping[searchInput]) {
      window.location.href = searchMapping[searchInput]; // Redirect to section
    } else {
      alert("No matching category found! Try searching 'Men', 'Women', 'Kids', or 'Baby'.");
    }
  }

  // ✅ TOGGLE FILTER OPTIONS
  function toggleFilterOptions() {
    const filterOptions = document.getElementById("filter-options");
    if (filterOptions) {
      filterOptions.classList.toggle("hidden");
    }
  }

});
