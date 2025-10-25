async function getProducts(){
  const res = await fetch('products.json');
  const data = await res.json();
  return data;
}


let cart = [];

function cartCount(){
  console.log(cart.length)
} 

function hideContent(){
  const viewCart = document.querySelector('.cart-btn');
  const filters = document.querySelector('.filters');
  const search = document.querySelector('.search');
  const products = document.getElementById('product-list');
  const cartCount = document.querySelector('.cart-count');
  let cartOpen = false;

  viewCart.addEventListener('click', ()=>{
    if(!cartOpen){
      history.replaceState({}, '','/index.html/cart');
      filters.classList.add('hidden');
      search.classList.add('hidden');
      products.classList.add('hidden');
      cartCount.classList.add('hidden');
      viewCart.classList.add('active');
      viewCart.innerText = "Close Cart";
      cartOpen = true;
    } else{
      history.replaceState({}, '','/index.html');
      filters.classList.remove('hidden');
      search.classList.remove('hidden');
      products.classList.remove('hidden');
      cartCount.classList.remove('hidden');
      viewCart.classList.remove('active');
      viewCart.innerHTML = `<i class="bi bi-cart3"></i>Cart`;
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
              <div class="product-rating">
            ${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5 - Math.round(product.rating))}
            </div>
            <div class="product-add-button">
              <button class="add">Add to Cart</button>
            </div>
          </div>
        `
        const button = card.querySelector('.add');
        button.addEventListener('click', () => {
          cart.push(product);
          console.log(`${product.title} was added to the cart.`);
          console.log(cart)
          cartCount()
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

    });
  })
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

hideContent();