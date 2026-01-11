// data structure of the products in grid.
// data folder already provided the array, hence just use it.
// remember js code run one by one in html file, so order matters.

// import variable from other js files that we want to use here:
// always put them on top
// with that we don't need to care about the order of the files.(*^_^*)

// can also rename it to avoid conflicts
// import {cart as myCart} from '../data/cart.js';
// import * as cartModule from '../data/cart.js';

import { cart } from '../data/cart-class.js';
// import { cart, addToCart, calculateCartQuantity,loadCart } from '../data/cart.js';
import { products, loadProductsFetch } from '../data/products.js';
import { updateCartQuantityDisplay } from "../ui/modifyCart.js";


loadProductsFetch(renderProductsGrid);

function renderProductsGrid() {
  // loadCart();
  let productsHTML = '';
  // loop through the product array and create single product's html
  products.forEach((product) => {
    // accumulator Pattern
    productsHTML = productsHTML + `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-added-to-cart-button" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div> `;
  });

  // console.log(productsHTML);
  document.querySelector('.js-products-grid').innerHTML = productsHTML;
  // update UI and calculate current item amount:
  const quantity = cart.calculateCartQuantity(cart);
  updateCartQuantityDisplay(quantity);


  // exercise 13 challenge
  let addedMessageTimeoutId;



  // interaction of add to cart button，debug, refresh the exactly timeout, not the previous one. 
  const addedMessageTimeouts = {}; // store timeout per product

  document.querySelectorAll('.js-added-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;

      cart.addToCart(productId);

      const addToCartSelector = document.querySelector(`.js-added-to-cart-${productId}`);
      addToCartSelector.classList.add('added-to-cart-seen');

      // clear previous timeout for this product only
      if (addedMessageTimeouts[productId]) {
        clearTimeout(addedMessageTimeouts[productId]);
      }

      // set new timeout for this product
      addedMessageTimeouts[productId] = setTimeout(() => {
        addToCartSelector.classList.remove('added-to-cart-seen');
        delete addedMessageTimeouts[productId]; // clean up
      }, 2000);

      // update total cart quantity
      const quantity = cart.calculateCartQuantity(cart.cartItems);
      updateCartQuantityDisplay(quantity);
    });
  });
};