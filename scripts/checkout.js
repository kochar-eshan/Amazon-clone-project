// import { cart } from './cart.js';
import { products } from '../data/product-data.js';
import { cartQty, deleter, cartPrice, itemQty } from './cart.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../data/deliveryDate-data.js';

let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cart);

let todaysDate = dayjs();
todaysDate = todaysDate.format('dddd, MMMM D');

// export function cartUpdate() {
let cartHtml = ``;
cart.forEach((cartItem) => {
  const cartProductId = cartItem.productId;
  let item;
  products.forEach((product) => {
    if (product.id === cartProductId) {
      item = product;
    }
  });
  let beta = ` <div class="product-in-cart-${cartItem.productId}">
          <p class="delivery-date">Delivery date: Tuesday, June 21</p>
          <div class="product-detail">
            <div class="image-container">
              <img
                    src="${item.image}"
                alt=""
                class="product-image"
              />
            </div>
            <div class="product-info">
              <p class="product-name">
               ${item.name}
              </p>
              <p class="product-price">$${(item.priceCents / 100).toFixed(
                2
              )}</p>
              <div class="product-quantity-div">
                <p class="product-quantity">
                  Quantity:<span class="qty">${cartItem.quantity}</span>
                </p>
                <button class="update-button">Update</button>
                <button class="delete-button" data-product-id="${
                  item.id
                }">Delete</button>
              </div>
            </div>
            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>

              <div class="delivery-option">
                <input
                  data-product-id = "${cartItem.productId}"
                  data-delivery-option-id = "1"
                  type="radio"
                  class="delivery-option-input"
                  name="delivery-option-${cartItem.productId}"
                />
                <div>
                  <div class="delivery-option-date">${dayjs()
                    .add(7, 'days')
                    .format('dddd, MMMM D')}</div>
                  <div class="delivery-option-price">FREE Shipping</div>
                </div>
              </div>
              <div class="delivery-option">
                <input
                  data-product-id = "${cartItem.productId}"
                  data-delivery-option-id = "2"
                  type="radio"
                  checked
                  class="delivery-option-input"
                  name="delivery-option-${cartItem.productId}"
                />
                <div>
                  <div class="delivery-option-date">${dayjs()
                    .add(4, 'days')
                    .format('dddd, MMMM D')}</div>
                  <div class="delivery-option-price">$4.99 - Shipping</div>
                </div>
              </div>
              <div class="delivery-option">
                <input
                  data-product-id = "${cartItem.productId}"
                  data-delivery-option-id = "3"
                  type="radio"
                  class="delivery-option-input"
                  name="delivery-option-${cartItem.productId}"
                />
                <div>
                  <div class="delivery-option-date">${dayjs()
                    .add(2, 'days')
                    .format('dddd, MMMM D')}</div>
                  <div class="delivery-option-price">$9.99 - Shipping</div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
  cartHtml = cartHtml + beta;
});

document.querySelector('.js-cart-main').innerHTML = cartHtml;
deliveryDetailUpdater();
// cartUpdate();

document.querySelectorAll('.delete-button').forEach((button) => {
  button.addEventListener('click', () => {
    deleter(button);
    let buttonId = button.dataset.productId;
    document.querySelector(`.product-in-cart-${buttonId}`).remove();
    console.log(cart);
  });
});
let temp1 = `<p class="order-summary">Order Summary</p>
        <div class="items">
          <p class="items-count">Items(${itemQty}):</p>
          <p class="items-price-total">$${(cartPrice / 100).toFixed(2)}</p>
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

document.querySelectorAll('.delivery-option-input').forEach((button) => {
  button.addEventListener('click', () => {
    let productIdNew = button.dataset.productId;
    cart.forEach((product) => {
      if (product.productId === productIdNew)
        product.deliveryOptionId = Number(button.dataset.deliveryOptionId);
      deliveryDetailUpdater();

      localStorage.setItem('cart', JSON.stringify(cart));
    });
  });
});

function deliveryDetailUpdater() {
  cart.forEach((product) => {
    let deliveryDate;
    let deliveryOption = product.deliveryOptionId;

    if (deliveryOption == 1)
      deliveryDate = dayjs().add(7, 'days').format('dddd, MMMM D');
    else if (deliveryOption == 2)
      deliveryDate = dayjs().add(4, 'days').format('dddd, MMMM D');
    else if (deliveryOption == 3)
      deliveryDate = dayjs().add(2, 'days').format('dddd, MMMM D');

    document.querySelector(
      `.product-in-cart-${product.productId} .delivery-date`
    ).innerHTML = `Delivery date: ${deliveryDate}`;
  });
}
