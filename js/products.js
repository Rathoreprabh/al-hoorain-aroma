const products = [
    {
        id: 1,
        name: 'MIDNIGHT ESSENCE',
        description: 'Deep woody fragrance with oud and sandalwood',
        price: 250,
        emoji: '🌙',
        category: 'woody',
        mood: ['woody', 'oriental'],
        notes: ['Oud', 'Sandalwood', 'Musk'],
        rating: 4.8
    },
    {
        id: 2,
        name: 'FLORAL SYMPHONY',
        description: 'Elegant blend of rose, jasmine, and peony',
        price: 220,
        emoji: '🌸',
        category: 'floral',
        mood: ['floral'],
        notes: ['Rose', 'Jasmine', 'Peony'],
        rating: 4.9
    },
    {
        id: 3,
        name: 'CITRUS BREEZE',
        description: 'Fresh and crisp morning fragrance',
        price: 180,
        emoji: '🍋',
        category: 'fresh',
        mood: ['fresh'],
        notes: ['Bergamot', 'Lemon', 'White Musk'],
        rating: 4.7
    },
    {
        id: 4,
        name: 'GOLDEN HOUR',
        description: 'Warm amber and vanilla with spices',
        price: 240,
        emoji: '✨',
        category: 'oriental',
        mood: ['oriental', 'woody'],
        notes: ['Amber', 'Vanilla', 'Cinnamon'],
        rating: 4.8
    },
    {
        id: 5,
        name: 'OCEAN WHISPER',
        description: 'Aquatic and fresh marine scent',
        price: 200,
        emoji: '🌊',
        category: 'fresh',
        mood: ['fresh'],
        notes: ['Sea Salt', 'Aquatic', 'Driftwood'],
        rating: 4.6
    },
    {
        id: 6,
        name: 'ROSE GARDEN',
        description: 'Classic romantic floral fragrance',
        price: 210,
        emoji: '🌹',
        category: 'floral',
        mood: ['floral'],
        notes: ['Damask Rose', 'Musk', 'Sandalwood'],
        rating: 4.9
    },
    {
        id: 7,
        name: 'SPICE MARKET',
        description: 'Exotic spice and incense blend',
        price: 260,
        emoji: '🌶️',
        category: 'oriental',
        mood: ['oriental'],
        notes: ['Cardamom', 'Clove', 'Amber'],
        rating: 4.7
    },
    {
        id: 8,
        name: 'FOREST MIST',
        description: 'Earthy pine and cedar fragrance',
        price: 230,
        emoji: '🌲',
        category: 'woody',
        mood: ['woody'],
        notes: ['Pine', 'Cedar', 'Moss'],
        rating: 4.8
    }
];

// Memoized product filters
const ProductCache = (() => {
    let cache = {};
    return {
        getByMood(mood) {
            if (!cache[`mood_${mood}`]) {
                cache[`mood_${mood}`] = products.filter(p => p.mood.includes(mood));
            }
            return cache[`mood_${mood}`];
        },
        getByCategory(category) {
            if (!cache[`cat_${category}`]) {
                cache[`cat_${category}`] = products.filter(p => p.category === category);
            }
            return cache[`cat_${category}`];
        },
        clearCache() { cache = {}; }
    };
})();

function renderProducts(containerId, productsArray) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const fragment = document.createDocumentFragment();
    const tempDiv = document.createElement('div');

    productsArray.forEach(product => {
        // Build star rating string
        const fullStars = Math.floor(product.rating);
        const emptyStars = 5 - fullStars;
        const stars = '★'.repeat(fullStars) + '☆'.repeat(emptyStars);

        // First 3 notes as tags
        const noteTags = product.notes.slice(0, 3).map(n =>
            `<span class="note-tag">${n}</span>`
        ).join('');

        tempDiv.innerHTML = `
            <div class="product-card" data-id="${product.id}" onclick="viewProduct(${product.id})">
                <div class="product-image">
                    <div class="product-shimmer"></div>
                    <span class="product-image-emoji">${product.emoji}</span>
                    <div class="quick-view-overlay">
                        <button class="quick-view-btn" onclick="viewProduct(${product.id})">QUICK VIEW</button>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-rating">
                        <span class="stars">${stars}</span>
                        <span class="rating-value">${product.rating}</span>
                    </div>
                    <div class="product-notes">${noteTags}</div>
                    <div class="product-price-row">
                        <span class="product-price">$${product.price}</span>
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id}, event)">ADD TO CART</button>
                        <button class="wishlist-btn" onclick="toggleWishlist(${product.id}, event)" title="Add to wishlist">♡</button>
                    </div>
                </div>
            </div>
        `;
        fragment.appendChild(tempDiv.firstElementChild);
    });

    container.innerHTML = '';
    container.appendChild(fragment);
}

function getProductsByMood(mood) {
    return ProductCache.getByMood(mood);
}

function viewProduct(id) {
    localStorage.setItem('selectedProduct', id);
    window.location.href = 'product.html';
}

function addToCart(id, event) {
    if (event && event.stopPropagation) event.stopPropagation();
    const product = products.find(p => p.id === id);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    showNotification(`✓ ${product.name} added to cart`);
}

function toggleWishlist(id, event) {
    if (event && event.stopPropagation) event.stopPropagation();
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const index = wishlist.findIndex(item => item.id === id);
    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification('Removed from wishlist');
    } else {
        const product = products.find(p => p.id === id);
        if (product) {
            wishlist.push(product);
            showNotification(`❤️ ${product.name} saved to wishlist`);
        }
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();

    // Update all wishlist buttons for this product
    document.querySelectorAll(`[data-id="${id}"] .wishlist-btn`).forEach(btn => {
        const inWishlist = wishlist.some(item => item.id === id);
        btn.classList.toggle('active', inWishlist);
        btn.textContent = inWishlist ? '♥' : '♡';
    });
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const badge = document.querySelector('#cartBtn .badge');
    if (badge) {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = total;
    }
}

function updateWishlistBadge() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const badge = document.querySelector('#wishlistBtn .badge');
    if (badge) badge.textContent = wishlist.length;
}

function showNotification(message) {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const n = document.createElement('div');
    n.className = 'notification';
    n.textContent = message;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts('featuredProducts', products.slice(0, 4));
    renderProducts('recommendedProducts', products.slice(4, 8));
    updateCartBadge();
    updateWishlistBadge();
});
