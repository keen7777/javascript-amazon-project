import { createOrderFromCart } from "../scripts/orderFactory.js";
import { updateCartQuantityDisplay } from "../ui/modifyCart.js";
import { cart } from "./cart-class.js";


export function renderOrdersGrid(orders) {
  let ordersHTML = '';
  // loop through the product array and create single product's html
  orders.forEach((currentOrder) => {
    // accumulator Pattern
    ordersHTML = ordersHTML + `
    <div class="order-container js-order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date js-order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${currentOrder.placedOrderTime}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${currentOrder.totalCost}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${currentOrder.orderId}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${createProductsInOrderHTML(currentOrder)}  
          </div>
        </div>`;
  });



  // function to create purchased items Html
  function createProductsInOrderHTML(currentOrder) {

    let productsInOrderHTML = '';
    const itemsInOrder = currentOrder.orderItemsInfo;
    if (!Array.isArray(itemsInOrder)) {
      console.warn('Invalid order data:', currentOrder);
      return '';
    }
    itemsInOrder.forEach(item => {
      console.log('!!!!!!order item:', item);
      productsInOrderHTML = productsInOrderHTML +
        `<div class="product-image-container">
              <img src="${item.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${item.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${item.deliveryDate}
              </div>
              <div class="product-quantity">
                Quantity: ${item.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again-button"
                data-product-id="${item.productId}"
                data-delivery-option-id="${item.deliveryOptionId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message js-buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${currentOrder.orderId}&productId=${item.productId}">
                <button class="track-package-button button-secondary js-track-package-button"
                data-product-id="${item.productId}">
                  Track package
                </button>
              </a>
            </div>
      `
    });
    return productsInOrderHTML;
  }

  // console.log(ordersHTML);
  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  // --- event delegation ---
  const buyAgainButtons = document.querySelectorAll('.js-buy-again-button');
  buyAgainButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = btn.dataset.productId;
      const deliveryOptionId = btn.dataset.deliveryOptionId;
      if (!productId) return;

      // add to cart
      cart.addToCart(productId);
      updateCartQuantityDisplay(cart.calculateCartQuantity(cart));

      // 处理按钮显示 "added"
      const messageSpan = btn.querySelector('.js-buy-again-message');
      messageSpan.textContent = 'Added';
      // btn.disabled = true;

      setTimeout(() => {
        messageSpan.textContent = 'Buy it again';
        // btn.disabled = false;
      }, 2000);
    });
  });
};


//// tutorial itself:
export const orders = loadOrders() || [];

export function addOrder() {
  const order = createOrderFromCart();
  orders.unshift(order);
  // unshift means add the newest to the top/front of the array.
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

// tutorial itself: end

export function loadLatestOrder() {
  return JSON.parse(
    localStorage.getItem('latestOrder')
  );
}

export function loadOrders() {
  return JSON.parse(
    localStorage.getItem('orders')
  );
}

export function getAnOrder(orderId) {
  const orders = loadOrders();
  return orders.find(order => order.orderId === orderId) || null;
}