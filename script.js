// ===== CONFIG =====
const WHATSAPP_NUMBER = "+94703888829"; // e.g. 9477XXXXXXX

// Demo products (you can edit/extend)
const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Earbuds Bluetooth 5.3",
    price: 2990,
    category: "Electronics",
    description: "Comfortable, long-lasting battery life, great for music and calls.",
    image: "https://via.placeholder.com/300x300?text=Earbuds"
  },
  {
    id: 2,
    name: "Fast Charging USB-C Cable 1m",
    price: 650,
    category: "Electronics",
    description: "Durable cable compatible with most Android phones.",
    image: "https://via.placeholder.com/300x300?text=USB-C+Cable"
  },
  {
    id: 3,
    name: "Non-stick Frying Pan 24cm",
    price: 2250,
    category: "Home",
    description: "Non-stick pan for everyday cooking, easy to clean.",
    image: "https://via.placeholder.com/300x300?text=Frying+Pan"
  },
  {
    id: 4,
    name: "Soft Cotton T-Shirt (Unisex)",
    price: 1200,
    category: "Fashion",
    description: "Breathable cotton t-shirt, perfect for daily wear.",
    image: "https://via.placeholder.com/300x300?text=T-Shirt"
  },
  {
    id: 5,
    name: "LED Desk Lamp USB Powered",
    price: 1890,
    category: "Home",
    description: "Adjustable LED desk lamp with low power usage.",
    image: "https://via.placeholder.com/300x300?text=Desk+Lamp"
  },
  {
    id: 6,
    name: "Sports Water Bottle 750ml",
    price: 890,
    category: "Other",
    description: "Reusable bottle for gym, office and travel.",
    image: "https://via.placeholder.com/300x300?text=Water+Bottle"
  },
  {
    id: 7,
    name: "Premium CAT6 Ethernet Cable 1M",
    price: 180,
    category: "Electronics",
    description: "High-quality CAT6 network cable. 1000Mbps Gigabit Ethernet speed with RJ45 connectors.",
    image: "https://images.unsplash.com/photo-1621905251547-48416daca1df?w=300&h=300&fit=crop"
  },
  {
    id: 8,
    name: "Premium CAT6 Ethernet Cable 5M",
    price: 480,
    category: "Electronics",
    description: "High-quality CAT6 network cable. 1000Mbps Gigabit Ethernet speed with RJ45 connectors.",
    image: "https://images.unsplash.com/photo-1621905251547-48416daca1df?w=300&h=300&fit=crop"
  },
  {
    id: 9,
    name: "Premium CAT6 Ethernet Cable 10M",
    price: 990,
    category: "Electronics",
    description: "High-quality CAT6 network cable. 1000Mbps Gigabit Ethernet speed with RJ45 connectors.",
    image: "https://images.unsplash.com/photo-1621905251547-48416daca1df?w=300&h=300&fit=crop"
  },
  {
    id: 10,
    name: "Premium CAT6 Ethernet Cable 15M",
    price: 1300,
    category: "Electronics",
    description: "High-quality CAT6 network cable. 1000Mbps Gigabit Ethernet speed with RJ45 connectors.",
    image: "https://images.unsplash.com/photo-1621905251547-48416daca1df?w=300&h=300&fit=crop"
  },
  {
    id: 11,
    name: "Premium CAT6 Ethernet Cable 20M",
    price: 1800,
    category: "Electronics",
    description: "High-quality CAT6 network cable. 1000Mbps Gigabit Ethernet speed with RJ45 connectors.",
    image: "https://images.unsplash.com/photo-1621905251547-48416daca1df?w=300&h=300&fit=crop"
  },
  {
    id: 12,
    name: "Premium CAT6 Ethernet Cable 30M",
    price: 2600,
    category: "Electronics",
    description: "High-quality CAT6 network cable. 1000Mbps Gigabit Ethernet speed with RJ45 connectors.",
    image: "https://images.unsplash.com/photo-1621905251547-48416daca1df?w=300&h=300&fit=crop"
  },
  {
    id: 13,
    name: "Premium CAT6 Ethernet Cable 50M",
    price: 4800,
    category: "Electronics",
    description: "High-quality CAT6 network cable. 1000Mbps Gigabit Ethernet speed with RJ45 connectors.",
    image: "https://images.unsplash.com/photo-1621905251547-48416daca1df?w=300&h=300&fit=crop"
  },
  {
    id: 14,
    name: "Premium CAT6 Ethernet Cable 100M",
    price: 9200,
    category: "Electronics",
    description: "High-quality CAT6 network cable. 1000Mbps Gigabit Ethernet speed with RJ45 connectors.",
    image: "https://images.unsplash.com/photo-1621905251547-48416daca1df?w=300&h=300&fit=crop"
  }
];

// ===== CART STORAGE =====
function loadCart() {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ===== GLOBAL STATE =====
let cart = loadCart();
let currentProductId = null;

// ===== UTIL =====
function formatPrice(amount) {
  return "Rs " + amount.toFixed(2);
}

function goHome() {
  window.location.href = "index.html";
}

// ===== PRODUCT GRID =====
function renderProducts(category = "all") {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = "";
  const filtered = PRODUCTS.filter(p => category === "all" || p.category === category);

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.onclick = () => openProductModal(product.id);

    card.innerHTML = `
      <div class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-image" />
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-price">${formatPrice(product.price)}</div>
        <button class="btn-primary" onclick="event.stopPropagation(); addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterCategory(category, btnEl) {
  renderProducts(category);
  const chips = document.querySelectorAll(".chip");
  chips.forEach(chip => chip.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
}

// ===== PRODUCT MODAL =====
function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  currentProductId = productId;

  const modal = document.getElementById("product-modal");
  if (!modal) return;

  document.getElementById("modal-image").src = product.image;
  document.getElementById("modal-image").alt = product.name;
  document.getElementById("modal-name").textContent = product.name;
  document.getElementById("modal-price").textContent = formatPrice(product.price);
  document.getElementById("modal-description").textContent = product.description;

  const btn = document.getElementById("modal-add-cart-btn");
  btn.onclick = function () {
    addToCart(productId);
    closeProductModal();
  };

  modal.classList.add("show");
}

function closeProductModal() {
  const modal = document.getElementById("product-modal");
  if (modal) {
    modal.classList.remove("show");
  }
}

// ===== CART LOGIC =====
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  saveCart(cart);
  updateCartBadge();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  updateCartBadge();
  renderCart();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    saveCart(cart);
    renderCart();
  }
}

function getCartDetails() {
  return cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return {
      ...product,
      qty: item.qty,
      lineTotal: product.price * item.qty
    };
  });
}

function getCartTotal() {
  return getCartDetails().reduce((sum, item) => sum + item.lineTotal, 0);
}

// ===== CART UI =====
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!container || !totalEl) return;

  const details = getCartDetails();
  container.innerHTML = "";

  if (details.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    details.forEach(item => {
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-row">
            <div class="cart-qty-controls">
              <button onclick="changeQty(${item.id}, -1)">-</button>
              <span>${item.qty}</span>
              <button onclick="changeQty(${item.id}, 1)">+</button>
            </div>
            <span>${formatPrice(item.lineTotal)}</span>
          </div>
          <button class="cart-remove" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      `;
      container.appendChild(row);
    });
  }

  const total = getCartTotal();
  totalEl.textContent = formatPrice(total);
}

function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = count;
}

function toggleCart() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  if (!drawer || !backdrop) return;

  const isOpen = drawer.classList.contains("open");
  if (isOpen) {
    drawer.classList.remove("open");
    backdrop.classList.remove("show");
  } else {
    drawer.classList.add("open");
    backdrop.classList.add("show");
    renderCart();
  }
}

function goToCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  window.location.href = "checkout.html";
}

// ===== CHECKOUT PAGE =====
function renderSummary() {
  const summaryItems = document.getElementById("summary-items");
  const summaryTotal = document.getElementById("summary-total");
  if (!summaryItems || !summaryTotal) return;

  const details = getCartDetails();
  summaryItems.innerHTML = "";

  if (details.length === 0) {
    summaryItems.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    details.forEach(item => {
      const row = document.createElement("div");
      row.className = "order-summary-item";
      row.innerHTML = `
        <span>${item.name} × ${item.qty}</span>
        <span>${formatPrice(item.lineTotal)}</span>
      `;
      summaryItems.appendChild(row);
    });
  }

  const total = getCartTotal();
  summaryTotal.textContent = formatPrice(total);
}

function submitOrder(event) {
  event.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const address = document.getElementById("customer-address").value.trim();

  if (!name || !phone || !address) {
    alert("Please fill all customer details.");
    return;
  }

  const details = getCartDetails();
  const total = getCartTotal();

  let message = `New Daraz order%0A`;
  message += `Name: ${encodeURIComponent(name)}%0A`;
  message += `Phone: ${encodeURIComponent(phone)}%0A`;
  message += `Address: ${encodeURIComponent(address)}%0A%0A`;
  message += `Items:%0A`;

  details.forEach(item => {
    const line = `- ${item.name} x ${item.qty} = ${formatPrice(item.lineTotal)}`;
    message += `${encodeURIComponent(line)}%0A`;
  });

  message += `%0ATotal: ${encodeURIComponent(formatPrice(total))}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, "_blank");

  // Optional: clear cart after opening WhatsApp
  cart = [];
  saveCart(cart);
}

// ===== CONTACT PAGE =====
function openWhatsAppContact() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}`;
  window.open(url, "_blank");
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Home page
  if (document.getElementById("product-grid")) {
    renderProducts("all");
    updateCartBadge();
  }

  // Checkout page
  if (document.getElementById("summary-items")) {
    renderSummary();
  }
});


