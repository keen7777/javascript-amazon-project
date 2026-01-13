import { getAnOrder } from "../data/orders.js";
import { calculateStatusProgress } from "../data/deliveryOptions.js";
const url = new URL(window.location.href);

const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

console.log('check tracking');
console.log(orderId);
console.log(productId);
renderTrackingPage(orderId, productId);

export function renderTrackingPage(orderId, productId) {
  const currentOrder = getAnOrder(orderId);
  const itemsList = currentOrder.orderItemsInfo;
  const matchingItem = itemsList.find(
    item => item.productId === productId
  );

  if (!matchingItem) {
    console.error('No matching item found');
    return;
  }
  //here get progress:
  const progress = calculateStatusProgress(currentOrder.placedOrderTime, matchingItem.deliveryTime);
  console.log(`check times different, delivery ${progress}`);
  console.log(`check ordertime ${currentOrder.placedOrderTime}, deliverytime ${matchingItem.deliveryTime}`);


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

        <div class="progress-labels-container js-progress-labels-container">
          ${renderProgressLabels(progress)}
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    `;
  // tracking progresslabels
  function renderProgressLabels(progress) {
    let preparingClass = '';
    let shippedClass = '';
    let deliveredClass = '';

    if (progress < 0.5) {
      preparingClass = 'current-status';
    } else if (progress < 1) {
      shippedClass = 'current-status';
    } else {
      deliveredClass = 'current-status';
    }

    return `
    <div class="progress-label ${preparingClass}">
      Preparing
    </div>
    <div class="progress-label ${shippedClass}">
      Shipped
    </div>
    <div class="progress-label ${deliveredClass}">
      Delivered
    </div>
  `;
  }
  document.querySelector('.js-order-tracking').innerHTML = TrackingHTML;

  // modify css
  const progressBar = document.querySelector('.progress-bar');
  progressBar.style.width = `${progress * 100}%`;
}


