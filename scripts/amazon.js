// data structure of the products in grid.
// data folder already provided the array, hence just use it.
// remember js code run one by one in html file, so order matters.

// import variable from other js files that we want to use here:
// always put them on top
// with that we don't need to care about the order of the files.(*^_^*)

// can also rename it to avoid conflicts
// import {cart as myCart} from '../data/cart.js';
// import * as cartModule from '../data/cart.js';

import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';
/*
const products = [
    {
        //1st
        image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
        name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
        rating: {
            stars: 4.5,
            count: 87
        },
        priceCents: 1090
    }, {
        //2nd
        image: 'images/products/intermediate-composite-basketball.jpg',
        name: 'Intermediate Size Basketball',
        rating: {
            stars: 4,
            count: 127
        },
        priceCents: 2095

    }];
*/
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
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
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

          <div class="product-spacer"></div>

          <div class="added-to-cart ">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-added-to-cart-button" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div> `;
});

console.log(productsHTML);
document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity() {
    // total quantity of the cart:
        let cartQuantity = 0;
        cart.forEach((cartItem) => {
            cartQuantity = cartQuantity + cartItem.quantity;
        });
        // console.log(cartQuantity);

        // put it on html
        // bc we modify html here to this function stays inside amazon.js
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    
}
// interaction of add to cart button
document.querySelectorAll('.js-added-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        // kabab -> caml case when we want to use "data-"
        // console.log(`everything working! ${productName}`);

        addToCart(productId);
        updateCartQuantity();

        

    });
});