async function getProducts(){
  const res = await fetch('products.json');
  const data = await res.json();
  return data;
}


let cart = [];

function cartCount(){
  console.log(cart.length)
} 

/* Hides Catalog and Shows Cart Content*/
function hideContent(){
  const viewCart = document.querySelector('.cart-btn');
  const closeCart = document.querySelector('.close-cart-btn');
  const main = document.querySelector('main');
  const cartWrapper = document.querySelector('.cart-page-wrapper'); 
  let cartOpen = false;

  viewCart.addEventListener('click', ()=>{
    if(!cartOpen){
      //history.replaceState({}, '','/index.html/cart');
      main.classList.add('hidden');
      cartWrapper.classList.add('active');
      cartOpen = true;
    }
  });

  closeCart.addEventListener('click', ()=>{
    if(cartOpen){
      //history.replaceState({}, '','/index.html');
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
        `
        const button = card.querySelector('.add');
        button.addEventListener('click', () => {
          cart.push(product);
          console.log(`${product.title} was added to the cart.`);
          console.log(cart)
          cartCount()

          //"Added" effect on add to cart click
          const originalText = button.innerText;
          button.innerText = "✓ Added";
          button.style.backgroundColor = "#5cc85c";

          setTimeout(() => {
            button.innerText = originalText;
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

hideContent();