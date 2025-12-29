// Sample demo products
const PRODUCTS=[
{id:1,name:'Wireless Earbuds Bluetooth 5.3',price:2999,category:'Electronics',description:'Comfortable, long-lasting battery life, great for music and calls.',image:'https://via.placeholder.com/300x300?text=Earbuds',rating:4.5},
{id:2,name:'Fast Charging USB-C Cable 1m',price:699,category:'Electronics',description:'Durable cable with fast charging support for modern devices.',image:'https://via.placeholder.com/300x300?text=Cable',rating:4.2},
{id:3,name:'Smart LED Desk Lamp',price:1499,category:'Electronics',description:'Adjustable brightness, USB powered, perfect for office work.',image:'https://via.placeholder.com/300x300?text=Lamp',rating:4.7},
{id:4,name:'Premium Bed Sheets Set',price:1299,category:'Home',description:'Soft, breathable cotton, fits all bed sizes.',image:'https://via.placeholder.com/300x300?text=Sheets',rating:4.4},
{id:5,name:'Kitchen Knife Set (6 pieces)',price:2499,category:'Home',description:'Stainless steel blades, perfect for all cutting needs.',image:'https://via.placeholder.com/300x300?text=Knives',rating:4.6},
{id:6,name:'Throw Pillow Cushion',price:799,category:'Home',description:'Comfortable polyester fill, decorative design.',image:'https://via.placeholder.com/300x300?text=Pillow',rating:4.3},
{id:7,name:'Classic Cotton T-Shirt',price:499,category:'Fashion',description:'Comfortable fit, available in multiple colors.',image:'https://via.placeholder.com/300x300?text=TShirt',rating:4.5},
{id:8,name:'Denim Jeans (Slim Fit)',price:1899,category:'Fashion',description:'Premium denim, perfect for everyday wear.',image:'https://via.placeholder.com/300x300?text=Jeans',rating:4.6},
{id:9,name:'Running Shoes Lightweight',price:3499,category:'Fashion',description:'Comfortable and durable for all-day wear.',image:'https://via.placeholder.com/300x300?text=Shoes',rating:4.7},
{id:10,name:'Portable Phone Charger 20000mAh',price:1999,category:'Electronics',description:'Fast charging, compact design, suitable for all phones.',image:'https://via.placeholder.com/300x300?text=Charger',rating:4.8}
];

let cart=[];
let currentFilter='all';
let filteredProducts=PRODUCTS;

// Initialize app
window.addEventListener('load',()=>{
renderedProducts();
setYear();
});

// Set year in footer
function setYear(){document.getElementById('year').textContent=new Date().getFullYear();}

// Render all products
function renderedProducts(){const grid=document.getElementById('product-grid');grid.innerHTML='';filteredProducts.forEach(product=>{const card=document.createElement('div');card.className='product-card';card.innerHTML=`<div class='product-image-wrapper'><img src='${product.image}' alt='${product.name}' class='product-image'/></div><div class='product-info'><h3 class='product-name'>${product.name}</h3><p class='product-category'>${product.category}</p><p class='product-price'>Rs ${product.price.toLocaleString()}</p><p class='product-rating'>★★★★★ (${product.rating})</p><button class='product-btn' onclick='openProductModal(${product.id})'>View Details</button></div>`;card.addEventListener('click',()=>openProductModal(product.id));grid.appendChild(card);});}

// Filter products by category
function filterCategory(category,element){currentFilter=category;const buttons=document.querySelectorAll('.category-item');buttons.forEach(b=>b.classList.remove('active'));element.classList.add('active');filteredProducts=category==='all'?PRODUCTS:PRODUCTS.filter(p=>p.category===category);renderedProducts();}

// Open product modal
function openProductModal(productId){const product=PRODUCTS.find(p=>p.id===productId);if(!product)return;document.getElementById('modal-name').textContent=product.name;document.getElementById('modal-price').textContent=`Rs ${product.price.toLocaleString()}`;document.getElementById('modal-description').textContent=product.description;document.getElementById('modal-image').src=product.image;const addBtn=document.getElementById('modal-add-cart-btn');addBtn.onclick=()=>addToCart(productId);document.getElementById('product-modal').classList.add('show');}

// Close product modal
function closeProductModal(){document.getElementById('product-modal').classList.remove('show');}

// Add product to cart
function addToCart(productId){const product=PRODUCTS.find(p=>p.id===productId);const existingItem=cart.find(i=>i.id===productId);if(existingItem){existingItem.quantity+=1;}else{cart.push({...product,quantity:1});}updateCartCount();updateCartDisplay();closeProductModal();alert('Added to cart!');}

// Update cart count badge
function updateCartCount(){document.getElementById('cart-count').textContent=cart.reduce((sum,item)=>sum+item.quantity,0);}

// Update cart display
function updateCartDisplay(){const cartItems=document.getElementById('cart-items');const subtotal=document.getElementById('subtotal');const total=document.getElementById('cart-total');if(cart.length===0){cartItems.innerHTML='<p style="padding:2rem;text-align:center;color:#999;">Your cart is empty</p>';}else{cartItems.innerHTML=cart.map(item=>`<div class='cart-item'><img src='${item.image}' alt='${item.name}'/><div class='cart-item-info'><div class='cart-item-name'>${item.name}</div><div class='cart-item-price'>Rs ${item.price.toLocaleString()}</div><div class='cart-item-controls'><button onclick='decreaseQty(${item.id})'>-</button><span>${item.quantity}</span><button onclick='increaseQty(${item.id})'>+</button><button class='cart-item-remove' onclick='removeFromCart(${item.id})'>Remove</button></div></div></div>`).join('');}const subtotalAmount=cart.reduce((sum,item)=>sum+(item.price*item.quantity),0);subtotal.textContent=`Rs ${subtotalAmount.toLocaleString()}`;total.textContent=`Rs ${subtotalAmount.toLocaleString()}`;}

// Increase quantity
function increaseQty(productId){const item=cart.find(i=>i.id===productId);if(item)item.quantity+=1;updateCartCount();updateCartDisplay();}

// Decrease quantity
function decreaseQty(productId){const item=cart.find(i=>i.id===productId);if(item){item.quantity=Math.max(1,item.quantity-1);}updateCartCount();updateCartDisplay();}

// Remove from cart
function removeFromCart(productId){cart=cart.filter(i=>i.id!==productId);updateCartCount();updateCartDisplay();}

// Toggle cart drawer
function toggleCart(){const drawer=document.getElementById('cart-drawer');const overlay=document.getElementById('cart-overlay');drawer.classList.toggle('open');overlay.classList.toggle('show');updateCartDisplay();}

// Go to checkout
function goToCheckout(){if(cart.length===0){alert('Your cart is empty!');return;}window.location.href='checkout.html';}

// Sort products
function sortProducts(sortBy){if(sortBy==='price-low'){filteredProducts.sort((a,b)=>a.price-b.price);}else if(sortBy==='price-high'){filteredProducts.sort((a,b)=>b.price-a.price);}else if(sortBy==='rating'){filteredProducts.sort((a,b)=>b.rating-a.rating);}else{filteredProducts=currentFilter==='all'?PRODUCTS:PRODUCTS.filter(p=>p.category===currentFilter);}renderedProducts();}
