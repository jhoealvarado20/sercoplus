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

  displayCart();
}

function deleteItemFromCart(name) {
  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);

  let updatedCart = cart.filter((item) => item.name !== name);

  localStorage.setItem("cart", JSON.stringify(updatedCart));

  displayCart();
}

function increaseQuantity(name) {
  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);

  let existingItem = cart.find((item) => item.name === name);

  existingItem.quantity++;

  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
}

function decreaseQuantity(name) {
  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);

  let existingItem = cart.find((item) => item.name === name);

  if (existingItem.quantity > 1) {
    existingItem.quantity--;
  } else {
    cart = cart.filter((item) => item.name !== name);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
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

    cartItem.innerHTML = /*html*/ `
      <div class="cart-item-info">
        <img src="${item.image}" alt="product" class="cart-item-image" />
        <h3 class="cart-item-name">${item.name}</h3>
      </div>
      
      <div class="cart-item-details">
        <div>
            <button class="decrease-quantity" onclick="decreaseQuantity('${item.name}')"> <i class="fa-solid fa-minus"></i> </button>
            <input  class="cart-item-quantity"  value="${item.quantity}" >
            <button class="increase-quantity" onclick="increaseQuantity('${item.name}')"> <i class="fa-solid fa-plus"></i> </button>
        </div>
        <h3 class="cart-item-price">S/ ${item.price}</h3>
        <button class="remove-item-cart"  onclick="deleteItemFromCart('${item.name}')">
        <i class="fa-solid fa-trash"></i>
         </button>
      </div>

      
      
    `;
    shoppingCart.appendChild(cartItem);
  });
}

const updateCountCart = () => {

   /*  const count = document.getElementsByClassName("cart-item").length

    document.querySelector(".shopping-cart-count").innerHTML = count */

    console.log("updateCountCart");
}

window.addEventListener("itemInserted", displayCart);

displayCart();
