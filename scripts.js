async function getProducts(){
  const res = await fetch('products.json');
  const data = await res.json();
  return data;
}


let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

function clearCart(){
  const clearBtn = document.querySelector('.clear');

  clearBtn.addEventListener('click', ()=>{
    localStorage.removeItem('cart');
    cart = [];
    cartListing();
    cartCount();
  });
}

//Cart Item Count Calculator
function cartCount(){
  const counter = document.querySelector('.cart-count');
  let numItems = 0; 
  
  cart.forEach(item =>{
    numItems += item.quantity;
  })

  counter.innerHTML = `${numItems}`
  if(numItems > 0){
    counter.style.opacity = '1';
  } else{
    counter.style.opacity = '0';
  }
  return numItems
} 

//Hides Catalog and Shows Cart Content
function hideContent(){
  const viewCart = document.querySelector('.cart-btn');
  const closeCart = document.querySelector('.close-cart-btn');
  const main = document.querySelector('main');
  const cartWrapper = document.querySelector('.cart-page-wrapper'); 
  let cartOpen = false;

  viewCart.addEventListener('click', ()=>{
    if(!cartOpen){
      main.classList.add('hidden');
      cartWrapper.classList.add('active');
      cartOpen = true;
    }
  });

  closeCart.addEventListener('click', ()=>{
    if(cartOpen){
      cartWrapper.classList.remove('active');
      main.classList.remove('hidden');
      cartOpen = false;
    }
  });
}

//Product Card Generation
function cardGenerate(products){
  const container = document.getElementById('product-list');
  container.innerHTML = "";

  products.forEach(product => {
      const card = document.createElement('article');
        card.innerHTML = `
          <div class="cards">
            <div class="product-image">
              <img src="${product.thumbnail}" alt="${product.title}">
            </div>
            <div class="product-name" title="${product.title}">
              <p>${product.title}</p>
            </div>
            <div class="product-cost">
              <p>$${product.price.toFixed(2)}</p>
            </div>
            <div class="product-desc" title="${product.description}">
              <p>${product.description}</p>
            </div>
            <div class="product-rating">
              ${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5 - Math.round(product.rating))}
            </div>
            <div class="product-add-button">
              <button class="add">Add to Cart</button>
            </div>
          </div>
        `;

        const button = card.querySelector('.add');
        button.addEventListener('click', () => {
          if (button.disabled) return;
          quantCount(product);
          console.log(`${product.title} was added to the cart.`);
          console.log(cart)
          cartListing();
          cartCount()

          //"Added" effect on add to cart click
          
          button.innerText = "✓ Added";
          button.disabled = true;
          button.style.backgroundColor = "#5cc85c";

          setTimeout(() => {
            button.innerText = 'Add to Cart';
            button.disabled = false;
            button.style.backgroundColor = "#736cfe";
          }, 600);
        })
    container.appendChild(card);
  });
}

getProducts().then(data => {
  cardGenerate(data);

  const filterButtons = document.querySelectorAll('.filters button');
  filterButtons.forEach(button =>{
    button.addEventListener('click', () =>{
      const category = button.textContent.toLowerCase();
      
      if(category === "all") {
        cardGenerate(data);
      } else {
        const filtered = data.filter(product => product.category === category);
        cardGenerate(filtered);
      }

      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  })

  filterButtons[0].classList.add('active');

  const searchBox = document.querySelector('input');
    searchBox.addEventListener('input', () => {
    const searchTerm = searchBox.value.toLowerCase();

    // Filter by product title (could also check description, category, etc.)
      const filtered = data.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
      );

      cardGenerate(filtered);
  })
})

//Checkout Cart Quantity Tracker for +/- Buttons & Total
function quantCount(product){
  let productDupe = cart.find(dupe => dupe.title === product.title);
  
    if(productDupe){
      productDupe.quantity++
    } else{
      cart.push({...product, quantity: 1});
    }
  };


//Cart Item Listing Card Creation
function cartListing(){
  const checkout = document.querySelector('.t-cost');
  const getItemWrap = document.querySelector('.item-wrapper');
  getItemWrap.innerHTML = "";

  if (cart.length === 0){
    getItemWrap.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    checkout.innerText = "$0.00"
    return;
  }
  
  let totalCheckout = 0;

  cart.forEach((product, index) => {
    const itemPrice = (product.quantity * product.price);
    
    totalCheckout += itemPrice;

      const listing = document.createElement('div');
      listing.classList.add('item-list');
      listing.innerHTML = `
          <div class="checkout-img">
            <img src="${product.thumbnail}" alt="${product.title}">
          </div>
          <div class="checkout-name-cost">
            <p class="checkout-name" title="${product.title}">${product.title}</p>
            <p class="checkout-cost">${product.price.toFixed(2)}</p>
          </div>
          <div class="checkout-item-count">
            <button class="decrease">-</button>
            <p class="item-count">${product.quantity}</p>
            <button class="increase">+</button>
          </div>
          <div class="checkout-item-total">
            <p class="item-count-price">$${itemPrice.toFixed(2)}</p>
            <p class="remove">Remove</p>
          </div>
          `;

      getItemWrap.appendChild(listing);
      saveCart()
      
      const incr = listing.querySelector('.increase');
      const decr = listing.querySelector('.decrease');
      const remove = listing.querySelector('.remove');
    
      incr.addEventListener('click', ()=>{
        cart[index].quantity++;
        cartListing();
        cartCount();
      });
      
      decr.addEventListener('click', ()=>{
        if(cart[index].quantity > 1){
          cart[index].quantity--;
          cartListing();
          cartCount();
        }
      });
      
      remove.addEventListener('click', ()=>{
        cart.splice(index, 1);
        saveCart()
        cartListing();
        cartCount();
    });
  });
  
  checkout.innerHTML = `Total $${totalCheckout.toFixed(2)}`;
}

clearCart();
cartCount();
cartListing();
hideContent();