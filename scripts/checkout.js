import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js'
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
// dayjs is the default export, only one default for each file
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
// load from external library:always load them first before your own code
// we'd prefer esm version to avoid naming conflicts
// use DayJS external library to handle delivery options.(always been minification for smaller data size)
import { deliveryOptions } from '../data/deliveryOptions.js';

let cartSummaryHTML = '';

cart.forEach(cartItem => {
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach(product => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });


  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');

  // console.log(matchingProduct);
  cartSummaryHTML = cartSummaryHTML +
    `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link"
                    data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct)}
                
                
              </div>
            </div>
          </div>
  `;
});

// function to create delivery Html
function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    // if 0, then Free shipping else show price
    const priceString = deliveryOption.priceCents === 0
      ? 'FREE Shipping'
      : `$${formatCurrency(deliveryOption.priceCents)}-Shipping`;
    //deal with choosing one of the delivery options:
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId
    // concat html here
    html +=
      `<div class="delivery-option">
      <input 
      type="radio" 
      class="delivery-option-input" 
      name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date"> ${dateString} </div>
        <div class="delivery-option-price">${priceString}  </div>
      </div>
    </div>
    `;
  });
  return html;
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach(link => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      // get the container that need to be deleted via id, then remove.
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
    })

  });


// helper function: calculate the date?