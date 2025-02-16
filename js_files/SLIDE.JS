let sliding_products = document.getElementById("sliding_products");

// Array of colors for product backgrounds
const colors = ["#FFB6C1", "#E6E6FA", "#D8BFD8", "#F0E6FA", "#FFD1DC", "#C3B1E1"];

fetch("https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/clothing")
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Check API response in console

    data.forEach((product, index) => {
      let card = document.createElement("div");
      card.className = "card"; 
      card.style.setProperty("--card-color", colors[index % colors.length]); 

      let p_name = document.createElement("p");
      p_name.className = "product-name";
      p_name.innerHTML = product.name || "No Name"; // Ensure fallback value

      let p_image = document.createElement("img");
      p_image.src = product.image || "fallback-image.jpg"; // Ensure fallback
      p_image.alt = product.name || "Product Image";

      let p_category = document.createElement("p");
      p_category.innerHTML = `<b>Category:</b> ${product.category || "N/A"}`; // Replace brand with category

      let p_price = document.createElement("p");
      p_price.className = "price";
      p_price.innerHTML = `₹${product.price !== undefined ? product.price : "N/A"}`; // Fix price

      let p_size = document.createElement("p");
      p_size.className = "size";
      p_size.innerHTML = `<b>Size:</b> ${product.sizes ? product.sizes.join(", ") : "N/A"}`; // Fix size

      card.append(p_name, p_image, p_category, p_price, p_size);
      sliding_products.append(card);
    });
  })
  .catch((error) => {
    console.error("Error fetching API data:", error);
    sliding_products.innerHTML = "API data isn't fetched.";
  });
