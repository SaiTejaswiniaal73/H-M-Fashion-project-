const apiUrl = 'https://67a3589d31d0d3a6b78335fc.mockapi.io/clothing/CLOTH';
let currentCategory = '';
let allProducts = [];
let currentPage = 1;
const productsPerPage = 8;

async function fetchProducts(category = '') {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        allProducts = category ? data[0].products[category] || [] : [...data[0].products.men, ...data[0].products.women, ...data[0].products.kids, ...data[0].products.baby];
        displayProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
        document.getElementById('products-container').innerHTML = '<p class="text-danger text-center">Failed to load products.</p>';
    }
}

function displayProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = allProducts.slice(start, end);
    if (!paginatedProducts.length) {
        container.innerHTML = '<p class="text-center text-muted">No products found.</p>';
        return;
    }
    paginatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <div class="product-name"><strong>${product.name}</strong></div>
                <div class="product-price">₹${product.price}</div>
                <div class="product-sizes"><strong>Sizes:</strong> ${product.sizes.join(', ')}</div>
                <div class="product-colors"><strong>Colors:</strong> ${product.colors.join(', ')}</div>
            </div>
            <div class="button-box">
                <button class="btn btn-heart" onclick="addToFavorites(${product.id})">❤️ Favorite</button>
                <button class="btn btn-cart" onclick="addToCart(${product.id})">🛒 Cart</button>
            </div>
        `;
        container.appendChild(productCard);
    });
    document.getElementById('pageIndicator').innerText = `Page ${currentPage}`;
}

function changePage(direction) {
    const totalPages = Math.ceil(allProducts.length / productsPerPage);
    if ((currentPage + direction) > 0 && (currentPage + direction) <= totalPages) {
        currentPage += direction;
        displayProducts();
    }
}

function addToCart(productId) {
    console.log(`Product ${productId} added to Cart!`);
}

function addToFavorites(productId) {
    console.log(`Product ${productId} added to Favorites!`);
}

const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get('category');
fetchProducts(selectedCategory || '');
