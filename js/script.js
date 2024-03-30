/* const originalSetItem = localStorage.setItem; */

localStorage.setItem = function () {
  
    const event = new Event("itemInserted");
    window.dispatchEvent(event);
    
    originalSetItem.apply(this, arguments); 
};

const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCartClicked);
});

function addToCartClicked(event) {
  const button = event.target;
  const cardElement = button.parentElement.parentElement;

  const productName = cardElement.querySelector(".product-name").innerText;
  const productImage = cardElement.querySelector(".product-image").src;
  const productPrice = cardElement.querySelector(".product-price").innerText;

  addItemToCart({
    image: productImage,
    name: productName,
    price: productPrice,
  });
}

// save product to local storage

function addItemToCart(product) {
  let cartItem = {
    image: product.image,
    name: product.name,
    price: product.price,
    quantity: 1,
  };

  let cart = localStorage.getItem("cart");

  if (cart === null) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }

  let existingItem = cart.find((item) => item.name === cartItem.name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {
  const shoppingCart = document.querySelector(".shopping-cart");

  let cart = localStorage.getItem("cart");
  if (cart === null) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }

  shoppingCart.innerHTML = "";

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
        <img src="${item.image}" alt="product" class="cart-item-image" />
        <h3 class="cart-item-name">${item.name}</h3>
        <h3 class="cart-item-price">${item.price}</h3>
        <h3 class="cart-item-quantity">${item.quantity}</h3>
        <button class="remove-button">Remove</button>
        `;

    shoppingCart.appendChild(cartItem);
  });
}


window.addEventListener("itemInserted", displayCart);

displayCart();
