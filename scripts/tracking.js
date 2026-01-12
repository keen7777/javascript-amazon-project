import { getAnOrder } from "../data/orders.js";
const url = new URL(window.location.href);

const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

console.log('check tracking');
console.log(orderId);
console.log(productId);
renderTrackingPage();

export function renderTrackingPage () {
    const itemsList = getAnOrder(orderId).orderItemsInfo;
    let matchingItem;
    itemsList.forEach(item => {
        if (item.productId === productId) {
            matchingItem = item;
        }
    });
    
    const TrackingHTML = 
    `<div class="order-tracking js-order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${matchingItem.deliveryDate}
        </div>

        <div class="product-info">
          ${matchingItem.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingItem.quantity}
        </div>

        <img class="product-image" src="${matchingItem.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    `
document.querySelector('.js-order-tracking')
    .innerHTML = TrackingHTML;
}