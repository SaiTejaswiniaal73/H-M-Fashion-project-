const apiUrl = 'https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH';
let currentCategory = '';
let allProducts = [];
let currentPage = 1;
const productsPerPage = 12;

// Fetch Products
async function fetchProducts(category = '') {
    try {
        document.getElementById('loading').style.display = 'block';

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        allProducts = [];

        if (category === '') {
            allProducts = [
                ...data[0].products.men,
                ...data[0].products.women,
                ...data[0].products.kids,
                ...data[0].products.baby
            ];
        } else {
            allProducts = data[0].products[category] || [];
        }

        document.getElementById('loading').style.display = 'none';
        displayProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
        document.getElementById('products-container').innerHTML =
            '<p class="text-danger text-center">Failed to load products.</p>';
    }
}

// Display Products with Pagination
function displayProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = allProducts.slice(start, end);

    if (paginatedProducts.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">No products found.</p>';
        return;
    }

    paginatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-6', 'col-sm-4', 'col-md-2', 'mb-2');

        productCard.innerHTML = `
            <div class="card product-card">
                <div class="card-header">${product.name}</div>
                <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                <div class="card-body">
                    <p class="category">${product.category}</p>
                    <p class="description">${product.description}</p>
                    <div class="price-box">₹${product.price}</div>
                    <div class="sizes">
                        <strong>Available Sizes:</strong>
                        <ul>
                            ${product.sizes.map(size => `<li>${size}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="colors">
                        <strong>Available Colors:</strong>
                        <ul>
                            ${product.colors.map(color => `<li>${color}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="button-box mt-1">
                        <button class="btn btn-heart" onclick="addToFavorites(${product.id})">
                            ❤️ Add to Favorites
                        </button>
                        <button class="btn btn-cart" onclick="addToCart(${product.id})">
                            🛒 Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });

    document.getElementById('pageIndicator').innerText = `Page ${currentPage}`;
}

// Add to Cart Function
function addToCart(productId) {
    console.log(`Product ${productId} added to Cart!`);
    // Add actual cart logic here
}

// Add to Favorites Function
function addToFavorites(productId) {
    console.log(`Product ${productId} added to Favorites!`);
    // Add actual favorites logic here
}

// Change Page
function changePage(direction) {
    const totalPages = Math.ceil(allProducts.length / productsPerPage);
    if ((currentPage + direction) > 0 && (currentPage + direction) <= totalPages) {
        currentPage += direction;
        displayProducts();
    }
}

// Filter Products by Category
function filterProducts(category) {
    currentCategory = category;
    currentPage = 1;
    fetchProducts(category);
}

// Initialize
const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get('category');
fetchProducts(selectedCategory || '');
