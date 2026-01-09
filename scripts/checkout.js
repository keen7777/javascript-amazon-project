import { renderOrderSummary, initOrderSummary } from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
// import { cart } from '../data/cart-class.js';
// checking oop version of the code:
// import '../data/cart-oop.js';
// import '../data/cart-class.js';
// import '../data/car.js';

// backend:
// import '../data/backend-practice.js'
import { loadProducts } from '../data/products.js';

export function rerenderCheckoutPage() {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}


loadProducts(() => {
  // 1. 首次渲染
  rerenderCheckoutPage();
  // 2. 绑定所有行为
  initOrderSummary(rerenderCheckoutPage);
});

// L18:
// send a request, use a callback to wait for a respone, then run the rest of the code.