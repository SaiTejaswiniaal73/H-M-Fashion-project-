// Function to update badges for cart and favorites
function updateBadges() {
    const cartData = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    // Filter out invalid or null entries in the cart
    const validCartItems = cartData.filter(item => item && item.id && item.quantity > 0);
    
    const cartCount = validCartItems.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("bag-count").textContent = cartCount; // Update cart badge

    const favData = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
    // Filter out invalid favorites
    const validFavItems = favData.filter(item => item && item.id);
    
    document.getElementById("fav-count").textContent = validFavItems.length; // Update favorites badge
}

// Function to add an item to the cart
function addToCart(productId) {
    // Ensure that productId is valid
    if (!productId) {
        console.error("Invalid product ID");
        return; // Exit if no valid productId
    }

    const cartData = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    
    // Check if the product already exists in the cart
    let product = cartData.find(item => item.id === productId);
    
    if (product) {
        // If the product is already in the cart, increase its quantity
        product.quantity += 1;
    } else {
        // If the product is not in the cart, add a new product with initial quantity of 1
        const newProduct = { id: productId, quantity: 1 };  // Ensure id exists
        cartData.push(newProduct);  // Add new product to the cart
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cartData)); 

    // Call the function to update the badge count (cart icon)
    updateBadges();
}

// Function to add an item to favorites
function addToFavorites(productId) {
    // Ensure the productId is valid
    if (!productId) {
        console.error("Invalid product ID");
        return; // Exit if no valid productId
    }

    const favData = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
    
    if (!favData.includes(productId)) {
        favData.push(productId); // Add the product to favorites
    }

    localStorage.setItem("favorites", JSON.stringify(favData)); // Save updated favorites to localStorage

    updateBadges(); // Update the badge count
}

// Initialize badge count on page load
document.addEventListener("DOMContentLoaded", updateBadges);
// // Function to update badges for cart and favorites
// function updateBadges() {
//     const cartData = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
//     // Filter out invalid or null entries in the cart
//     const validCartItems = cartData.filter(item => item && item.id && item.quantity > 0);
    
//     const cartCount = validCartItems.reduce((total, item) => total + item.quantity, 0);
//     document.getElementById("bag-count").textContent = cartCount; // Update cart badge

//     const favData = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
//     // Filter out invalid favorites
//     const validFavItems = favData.filter(item => item && item.id);
    
//     document.getElementById("fav-count").textContent = validFavItems.length; // Update favorites badge
// }

// // Function to add an item to the cart
// function addToCart(productId) {
//     // Ensure that productId is valid
//     if (!productId) {
//         console.error("Invalid product ID");
//         return; // Exit if no valid productId
//     }

//     const cartData = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    
//     // Check if the product already exists in the cart
//     let product = cartData.find(item => item.id === productId);
    
//     if (product) {
//         // If the product is already in the cart, increase its quantity
//         product.quantity += 1;
//     } else {
//         // If the product is not in the cart, add a new product with initial quantity of 1
//         const newProduct = { id: productId, quantity: 1 };  // Ensure id exists
//         cartData.push(newProduct);  // Add new product to the cart
//     }

//     // Save the updated cart to localStorage
//     localStorage.setItem("cart", JSON.stringify(cartData)); 

//     // Call the function to update the badge count (cart icon)
//     updateBadges();
// }

// // Function to add an item to favorites
// function addToFavorites(productId) {
//     // Ensure the productId is valid
//     if (!productId) {
//         console.error("Invalid product ID");
//         return; // Exit if no valid productId
//     }

//     const favData = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
    
//     if (!favData.includes(productId)) {
//         favData.push(productId); // Add the product to favorites
//     }

//     localStorage.setItem("favorites", JSON.stringify(favData)); // Save updated favorites to localStorage

//     updateBadges(); // Update the badge count
// }

// // Initialize badge count on page load
// document.addEventListener("DOMContentLoaded", updateBadges);

// Function to update badges for cart and favorites
function updateBadges() {
    const cartData = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    // Filter out invalid or null entries in the cart
    const validCartItems = cartData.filter(item => item && item.id && item.quantity > 0);
    
    const cartCount = validCartItems.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("bag-count").textContent = cartCount; // Update cart badge

    const favData = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
    // Filter out invalid favorites
    const validFavItems = favData.filter(item => item && item.id);
    
    document.getElementById("fav-count").textContent = validFavItems.length; // Update favorites badge
}

// Function to add an item to the cart
function addToCart(productId) {
    // Ensure that productId is valid
    if (!productId) {
        console.error("Invalid product ID");
        return; // Exit if no valid productId
    }

    const cartData = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    
    // Check if the product already exists in the cart
    let product = cartData.find(item => item && item.id === productId); // Ensure item is not null or undefined
    
    if (product) {
        // If the product is already in the cart, increase its quantity
        product.quantity += 1;
    } else {
        // If the product is not in the cart, add a new product with initial quantity of 1
        const newProduct = { id: productId, quantity: 1 };  // Ensure id exists
        cartData.push(newProduct);  // Add new product to the cart
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cartData)); 

    // Call the function to update the badge count (cart icon)
    updateBadges();
}

// Function to add an item to favorites
function addToFavorites(productId) {
    // Ensure the productId is valid
    if (!productId) {
        console.error("Invalid product ID");
        return; // Exit if no valid productId
    }

    const favData = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
    
    if (!favData.includes(productId)) {
        favData.push(productId); // Add the product to favorites
    }

    localStorage.setItem("favorites", JSON.stringify(favData)); // Save updated favorites to localStorage

    updateBadges(); // Update the badge count
}

// Initialize badge count on page load
document.addEventListener("DOMContentLoaded", updateBadges);

