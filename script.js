// Sample products data with categories
const PRODUCTS=[
  {id:1,name:'Wireless Earbuds Bluetooth 5.3',price:2999,category:'electronics',description:'Comfortable, long-lasting battery life',image:'🎧'},
  {id:2,name:'Fast Charging USB-C Cable 1m',price:699,category:'electronics',description:'Durable cable with fast charging',image:'🔌'},
  {id:3,name:'Smart LED Desk Lamp',price:1499,category:'electronics',description:'Adjustable brightness, USB powered',image:'💡'},
  {id:4,name:'Premium Bed Sheets Set',price:1299,category:'home',description:'Soft, breathable cotton, fits all bed sizes',image:'🛏️'},
  {id:5,name:'Kitchen Knife Set (6 pieces)',price:2499,category:'home',description:'Stainless steel blades, perfect for kitchen',image:'🔪'},
  {id:6,name:'Throw Pillow Cushion',price:799,category:'home',description:'Comfortable polyester fill, decorative design',image:'🧡'},
  {id:7,name:'Classic Cotton T-Shirt',price:499,category:'fashion',description:'Comfortable fit, available in multiple colors',image:'👕'},
  {id:8,name:'Denim Jeans (Slim Fit)',price:1899,category:'fashion',description:'Premium denim, perfect for everyday wear',image:'👖'},
  {id:9,name:'Running Shoes Lightweight',price:3499,category:'fashion',description:'Comfortable and durable for all-day wear',image:'👟'},
  {id:10,name:'Portable Phone Charger 20000mAh',price:1999,category:'electronics',description:'Fast charging, compact design',image:'🔋'},
  {id:11,name:'Yoga Mat Non-Slip',price:899,category:'sports',description:'Thick padding, eco-friendly material',image:'🧘'},
  {id:12,name:'Stainless Steel Water Bottle',price:599,category:'sports',description:'Keeps water cool for 24 hours',image:'💧'},
  {id:13,name:'Bluetooth Speaker Portable',price:2199,category:'electronics',description:'360 sound, waterproof design',image:'🔊'},
  {id:14,name:'Office Chair Ergonomic',price:5999,category:'home',description:'Adjustable height and backrest',image:'🪑'},
  {id:15,name:'Wireless Mouse Slim',price:799,category:'electronics',description:'Silent clicking, 18-month battery',image:'🖱️'},
];

let cart=[];
let currentFilter='all';
let filteredProducts=PRODUCTS;

// Initialize the page
document.addEventListener('DOMContentLoaded',function(){
  renderProducts(PRODUCTS);
  setupCategoryFilter();
  setupCartIcon();
  startFlashSaleTimer();
  renderFlashSale();
});

// Render products to the grid
function renderProducts(productsToRender){
  const productsGrid=document.getElementById('productsGrid');
  productsGrid.innerHTML='';
  
  productsToRender.forEach(product=>{
    const productCard=createProductCard(product);
    productsGrid.appendChild(productCard);
  });
}

// Render flash sale products (first 4 products with discount)
function renderFlashSale(){
  const flashSaleGrid=document.getElementById('flashSaleProducts');
  flashSaleGrid.innerHTML='';
  
  const flashSaleProducts=PRODUCTS.slice(0,4);
  flashSaleProducts.forEach(product=>{
    const productCard=createProductCard(product,true);
    flashSaleGrid.appendChild(productCard);
  });
}

// Create a single product card element
function createProductCard(product,isFlashSale=false){
  const card=document.createElement('div');
  card.className='product-card';
  
  const discount=isFlashSale?Math.floor(Math.random()*40)+10:0;
  const discountedPrice=Math.floor(product.price*(1-discount/100));
  
  card.innerHTML=`
    <div class="product-image-container">${product.image}</div>
    <div class="product-info">
      <h3 class="product-name">${product.name}</h3>
      <div class="product-price">
        <span class="price-current">Rs. ${discountedPrice.toLocaleString()}</span>
        ${isFlashSale?`<span class="price-old">Rs. ${product.price.toLocaleString()}</span>`:''}
      </div>
      ${isFlashSale?`<span class="discount">-${discount}%</span>`:''}
      <div class="product-rating">⭐⭐⭐⭐⭐ (${Math.floor(Math.random()*500)+50})</div>
      <div class="product-sold">${Math.floor(Math.random()*1000)+100} sold</div>
      <button class="add-to-cart-btn" onclick="addToCart(${product.id},'${product.name}',${discountedPrice})">Add to Cart</button>
    </div>
  `;
  
  card.onclick=function(e){
    if(!e.target.classList.contains('add-to-cart-btn')){
      viewProductDetail(product.id);
    }
  };
  
  return card;
}

// Setup category filter
function setupCategoryFilter(){
  const categoryItems=document.querySelectorAll('.category-item');
  categoryItems.forEach(item=>{
    item.addEventListener('click',function(e){
      e.preventDefault();
      const category=this.getAttribute('data-category');
      filterByCategory(category);
      
      categoryItems.forEach(i=>i.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  categoryItems[0].classList.add('active');
}

// Filter products by category
function filterByCategory(category){
  if(category==='all'){
    filteredProducts=PRODUCTS;
  }else{
    filteredProducts=PRODUCTS.filter(p=>p.category===category);
  }
  renderProducts(filteredProducts);
}

// Add product to cart
function addToCart(id,name,price){
  const existingItem=cart.find(item=>item.id===id);
  
  if(existingItem){
    existingItem.qty+=1;
  }else{
    cart.push({id,name,price,qty:1});
  }
  
  updateCartCount();
  showCartNotification();
}

// Update cart count badge
function updateCartCount(){
  document.getElementById('cartCount').textContent=cart.length;
}

// Show notification when item added
function showCartNotification(){
  alert('Item added to cart!');
}

// Setup cart icon click
function setupCartIcon(){
  const cartIcon=document.getElementById('cartIcon');
  cartIcon.addEventListener('click',function(){
    openCartModal();
  });
  
  const closeCartBtn=document.querySelector('.close-cart');
  closeCartBtn.addEventListener('click',function(){
    closeCartModal();
  });
}

// Open cart modal
function openCartModal(){
  const cartModal=document.getElementById('cartModal');
  cartModal.classList.add('active');
  renderCartItems();
}

// Close cart modal
function closeCartModal(){
  const cartModal=document.getElementById('cartModal');
  cartModal.classList.remove('active');
}

// Render cart items
function renderCartItems(){
  const cartItemsDiv=document.getElementById('cartItems');
  cartItemsDiv.innerHTML='';
  
  if(cart.length===0){
    cartItemsDiv.innerHTML='<p>Your cart is empty</p>';
    document.getElementById('cartTotal').textContent='0';
    return;
  }
  
  let total=0;
  cart.forEach(item=>{
    const itemTotal=item.price*item.qty;
    total+=itemTotal;
    
    const itemDiv=document.createElement('div');
    itemDiv.style.cssText='padding:10px;border-bottom:1px solid #ccc;display:flex;justify-content:space-between;';
    itemDiv.innerHTML=`
      <div>
        <strong>${item.name}</strong><br>
        Price: Rs. ${item.price.toLocaleString()} x ${item.qty}
      </div>
      <div>Rs. ${itemTotal.toLocaleString()}</div>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });
  
  document.getElementById('cartTotal').textContent=total.toLocaleString();
}

// View product detail (can be extended to show full product page)
function viewProductDetail(productId){
  const product=PRODUCTS.find(p=>p.id===productId);
  alert(`Product: ${product.name}\nPrice: Rs. ${product.price.toLocaleString()}\nCategory: ${product.category}\n\n${product.description}\n\nClick 'Add to Cart' to purchase this item!`);
}

// Flash sale countdown timer
function startFlashSaleTimer(){
  let hours=4;
  let minutes=59;
  let seconds=59;
  
  setInterval(function(){
    seconds--;
    if(seconds<0){
      seconds=59;
      minutes--;
      if(minutes<0){
        minutes=59;
        hours--;
        if(hours<0){
          hours=4;
          minutes=59;
          seconds=59;
        }
      }
    }
    
    document.getElementById('hours').textContent=String(hours).padStart(2,'0');
    document.getElementById('minutes').textContent=String(minutes).padStart(2,'0');
    document.getElementById('seconds').textContent=String(seconds).padStart(2,'0');
  },1000);
}

// Search functionality
document.addEventListener('DOMContentLoaded',function(){
  const searchInput=document.getElementById('searchInput');
  searchInput.addEventListener('input',function(){
    const searchTerm=this.value.toLowerCase();
    const filtered=PRODUCTS.filter(p=>
      p.name.toLowerCase().includes(searchTerm)||
      p.description.toLowerCase().includes(searchTerm)
    );
    renderProducts(filtered);
  });
});

// Close cart when clicking outside
window.addEventListener('click',function(event){
  const cartModal=document.getElementById('cartModal');
  if(event.target===cartModal){
    closeCartModal();
  }
});
