import { products } from '../data/product-data.js';
import { cartAdder, cart, cartQty } from '../scripts/cart.js';

// import { cartUpdate } from './checkout.js';
let html = ``;
products.forEach((product) => {
  let alpha = `
        <div class="product" >
          <div class="product-image-div">
            <img
              src="${product.image}"
              class="product-image"
            />
          </div>
          <div class="product-details">
            ${product.name}
          </div>
          <div
            class="product-ratings"
            style="display: flex; justify-content: centre; align-items: center"
          >
            <img
              class="rating-stars"
              src="logos/rating-${product.rating.stars * 10}.png"
              style="width:100px;
margin-right:6px;"
            />
            <p
              class="rating-numbers"
              style="
                display: inline-block;
                margin-left: 5px;
                color: rgb(42, 42, 254);
              "
            >
              ${product.rating.count}
            </p>
          </div>
          <div class="product-price" style="font-weight: 800">$${(
            product.priceCents / 100
          ).toFixed(2)}</div>
          <div class="product-quantity">
            <select
              class="quantity-drop-down"
              name="quantity"
              style="
                color: black;
                padding: 5px 8px;
                border-radius: 10px;
                background-color: rgb(240, 240, 240);
                box-shadow: 0 2px 5px rgba(213, 217, 217, 0.5);
              "
            >
              <option for="quantity" value="" disabled selected>qty</option>
              <option style="color: black; background-color: white" value="1">
                1
              </option>
              <option style="color: black" value="2">2</option>
              <option style="color: black" value="3">3</option>
              <option style="color: black" value="4">4</option>
              <option style="color: black" value="5">5</option>
              <option style="color: black" value="6">6</option>
              <option style="color: black" value="7">7</option>
              <option style="color: black" value="8">8</option>
              <option style="color: black" value="9">9</option>
              <option style="color: black" value="10">10</option>
            </select>
          </div>
          <div class="js-added-to-cart" style="height: 20px"></div>
          <div class="product-add-to-cart">
            <button class="add-to-cart-button" data-product-id="${
              product.id
            }">Add to Cart</button>
          </div>
        </div>`;
  html = html + alpha;
});

document.querySelector('.row').innerHTML = html;

document.querySelectorAll('.add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    cartAdder(productId);
    document.querySelector('.cart-quantity').innerHTML = cartQty;
  });
});

let cartQtyInitial = parseInt(localStorage.getItem('cartQty')) || 0;
document.querySelector('.cart-quantity').innerText = cartQtyInitial;

// window.addEventListener('beforeunload', () => {
//   localStorage.removeItem('cartQty');
// });

// extra
// On page load, set cart quantity from localStorage
document.addEventListener('DOMContentLoaded', () => {
  const savedQty = localStorage.getItem('cartQty') || 0;
  document.querySelector('.cart-quantity').innerHTML = savedQty;
});
