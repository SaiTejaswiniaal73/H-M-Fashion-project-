document.addEventListener("DOMContentLoaded", function () {
    const navLinks = {
      "home": "#women-section",
      "men-section": "#men-section",
      "women-section": "#women-section",
      "kids-section": "#kids-section",
      "baby-section": "#baby-section"
    };
  
    // Function to navigate smoothly
    function navigateToSection(event, target) {
      if (navLinks[target]) {
        event.preventDefault();
        window.location.href = navLinks[target]; // Navigate to section
      }
    }
  
    // Apply to Navbar Links
    document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
      link.addEventListener("click", function (event) {
        navigateToSection(event, this.getAttribute("href").replace("#", ""));
      });
    });
  
    // Apply to Offer Box Buttons
    document.querySelectorAll(".offer-links .offer-btn").forEach(btn => {
      btn.addEventListener("click", function (event) {
        navigateToSection(event, this.getAttribute("href").replace(".html", "-section"));
      });
    });
  });
  function handleSearch(event) {
    event.preventDefault(); // Prevent page reload

    let searchInput = document.getElementById("search-input").value.toLowerCase().trim();

    // Define mapping for search terms (matching your section IDs)
    const searchMapping = {
        "men": "#mens-section",
        "mens": "#mens-section",
        "women": "#womens-section",
        "womens": "#womens-section",
        "kids": "#kids-section",
        "kid": "#kids-section",
        "baby": "#baby-section",
        "babies": "#baby-section"
    };

    // Check if search term matches any category
    if (searchMapping[searchInput]) {
        window.location.href = searchMapping[searchInput]; // Redirect to section
    } else {
        alert("No matching category found! Try searching 'Men', 'Women', 'Kids', or 'Baby'.");
    }
}
<script>
    function navigateToWishlist() {
        window.location.href = "wishlist.html";
    }
</script>


  