Product Catalog
This project is a responsive product catalog web app built with HTML, CSS, and JavaScript. It displays products dynamically from a JSON file, allows users to filter by category, search items, and manage a shopping cart that stores data using localStorage. I designed this to replicate the core experience of an e-commerce catalog, where users can browse, add, and remove products in real-time.

Motivation
The goal of this project was to go beyond static product listings and build something closer to a real-world store interface using only front-end technologies. I wanted to strengthen my skills in:
- DOM manipulation
- Data handling with a JSON file
- State management for cart logic
- Layout design using Flexbox and Grid
- Local persistence with localStorage

Getting Started
You can view the live version here:
(https://CpreCS.github.io/Product-Catalog/)

If you want to run it locally:  
1. Clone the repository.  
2. Open 'index.html' in your browser.

How it Works
- Products are loaded dynamically from a local products.json file.
- You can filter items by category (Beauty, Clothing, Electronics, etc.).
- A search bar allows you to find items by name.
- You can add products to your cart, view the total cost, and adjust item quantities or remove them.
- The cart automatically saves and reloads using localStorage, so your items persist on refresh.
- A “Clear Cart” button lets you reset your cart instantly.

Feautures
- Dynamic product rendering from JSON
- Category filters and real-time search
- Add, remove, or adjust cart quantities
- Persistent cart data using localStorage
- Live total cost updates
- Clear Cart functionality
- Responsive layout for desktop, tablet, and mobile

What I Learned
- How to fetch and parse data particularly from a locaL JSON file instead of an external API
- Dynamically creating and updating DOM elements using data
- Handling cart logic and product duplication
- Managing state and data persistence with localStorage
- Building responsive layouts using CSS Grid and Flexbox
- Writing cleaner JavaScript that’s easier to read and reuse

Future Ideas
- Add checkout and order summary functionality
- Integrate detailed product previews when clicking an image
- Add login/authentication to save user-specific carts
- Use a backend (preferably Node.js) to make it full-stack
