import { products } from '../data/product-data.js';

export let cartQty = parseInt(localStorage.getItem('cartQty')) || 0;
export let itemQty = parseInt(localStorage.getItem('itemQty')) || 0;
export let cart = JSON.parse(localStorage.getItem('cart')) || [];

//to clear saved data in local storage
//localStorage.removeItem('itemQty');

export let cartPrice = parseInt(localStorage.getItem('cartPrice')) || 0;

export function cartAdder(id) {
  const existingItem = cart.find((product) => product.productId === id);
  if (existingItem) {
    existingItem.quantity++;
    cartQty++;
    cartPrice = cartPrice + existingItem.priceCents;
  } else {
    const productToAdd = products.find((product) => product.id === id);
    if (productToAdd) {
      cart.push({
        productId: productToAdd.id,
        quantity: 1,
        priceCents: productToAdd.priceCents,
        deliveryOptionId: 2,
      });
      cartQty++;
      itemQty++;
      cartPrice = cartPrice + productToAdd.priceCents;
    }
  }

  console.log(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('cartQty', cartQty);
  localStorage.setItem('itemQty', itemQty);
  localStorage.setItem('cartPrice', cartPrice);
}

export function deleter(button) {
  let buttonId = button.dataset.productId;
  let element;
  cart.forEach((item) => {
    if (item.productId === buttonId) element = item;
  });
  let newCart = [];
  cartQty -= Number(element.quantity);
  itemQty--;
  cartPrice -= Number(element.priceCents * element.quantity);

  let temp1 = `<p class="order-summary">Order Summary</p>
        <div class="items">
          <p class="items-count">Items(${itemQty}):</p>
          <p class="items-price-total">$0</p>
        </div>
        <div class="shipping">
          <p class="items-handling">Shipping & handling:</p>
          <p class="handling-price-total">$0</p>
        </div>
        <div class="total">
          <p class="total-before-tax">Total before tax:</p>
          <p class="before-tax-price-total">$${(cartPrice / 100).toFixed(2)}</p>
        </div>
        <div class="tax">
          <p class="estimated-tax">Estimated tax(10%):</p>
          <p class="items-price-total">$${(cartPrice / 1000).toFixed(2)}</p>
        </div>
        <div class="order-total">
          <p class="grand-total">Order total:</p>
          <p class="items-price-total">$${(
            (cartPrice * 0.1 + cartPrice) /
            100
          ).toFixed(2)}</p>
        </div>
        <div class="place-order">
          <button class="place-order-button">Place your order</button>
        </div>`;
  let temp2 = `          Checkout (<a class="return-to-home-link" href="home.html">${itemQty} items</a>)`;

  setTimeout(() => {
    document.querySelector('.payment-summary').innerHTML = temp1;
    document.querySelector('.checkout-header-middle-section').innerHTML = temp2;
  }, 0);

  localStorage.setItem('cartQty', cartQty);
  localStorage.setItem('itemQty', itemQty);
  localStorage.setItem('cartPrice', cartPrice);

  cart.forEach((items) => {
    if (items.productId != buttonId) newCart.push(items);
  });
  cart = newCart;
  localStorage.setItem('cart', JSON.stringify(cart));
}
