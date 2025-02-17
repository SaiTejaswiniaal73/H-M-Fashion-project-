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


  //slide products

// MockAPI fetching...
let sliding_products = document.getElementById("sliding_products");

// Array of colors for product backgrounds
const colors = ["#FFB6C1", "#E6E6FA", "#D8BFD8", "#F0E6FA", "#FFD1DC", "#C3B1E1"]; 

fetch("https://67a5d0e9c0ac39787a1f8c4d.mockapi.io/sliding_products/products_data")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((product, index) => {
      let cards = document.createElement("div");
      cards.style.height = "350px";
      cards.style.width = "230px";
      cards.style.flex = "0 0 auto";
      cards.style.boxShadow = "0px 0px 10px 5px grey";
      cards.style.borderRadius = "20px";
      cards.style.backgroundColor = colors[index % colors.length]; // Assign different colors

      let p_name = document.createElement("p");
      p_name.innerHTML = product.product_name;
      p_name.style.fontWeight = "bold";
      p_name.style.fontSize = "16px";
      p_name.style.padding = "5px 0px 0px 10px";

      let p_image = document.createElement("img");
      p_image.style.height = "170px";
      p_image.style.width = "110px";
      p_image.style.marginLeft = "70px";
      p_image.src = product.image_url;

      let p_brand = document.createElement("p");
      p_brand.innerHTML = `Brand: ${product.brand}`;
      p_brand.style.padding = "5px 0px 0px 10px";

      let p_price = document.createElement("p");
      p_price.innerHTML = `₹${product.price}`;
      p_price.style.textAlign = "center";
      p_price.style.fontSize = "20px";
      p_price.style.fontWeight = "bold";

      let p_size = document.createElement("p");
      p_size.innerHTML = `<i>Size</i>: ${product.size}`;
      p_size.style.textAlign = "center";
      p_size.style.fontSize = "13px";

      sliding_products.append(cards);
      cards.append(p_name, p_image, p_brand, p_price, p_size);
    });
  })
  .catch(() => {
    sliding_products.innerHTML = "API data isn't fetched.";
  });
