import { renderOrderSummary, initOrderSummary } from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
// checking oop version of the code:
import { cart } from '../data/cart-class.js';
import { addOrder } from '../data/orders.js';

// load using backend
import { loadCartFetch } from '../data/cart.js';
import { loadProductsFetch } from '../data/products.js';

import { createOrderFromCart } from './orderFactory.js';
import { updateCartQuantityDisplay } from '../ui/modifyCart.js';


export function placeOrder() {
  try {
    // 0, see if cart is empty:
    const cartQuantity = cart.calculateCartQuantity();

    if (cartQuantity === 0) {
      console.log('Your cart is empty, cannot place order.');
      togglePaymentButtons(); // 可选：禁用按钮或更新样式
      return; // 直接结束函数
    }
    // 1, create order snapshot
    const order = createOrderFromCart();

    // 2, save orders
    addOrder(order);

    // 3, cart clear
    cart.clearCart();

    // 4. update cart quantity on right up corner
    updateCartQuantityDisplay(cart.calculateCartQuantity());

    // jump to
    window.location.href = 'orders.html';

  } catch (error) {
    console.log('Place order failed.');
    console.log(error);
  }
}

export function togglePaymentButtons() {
  const placeOrderButton = document.querySelector('.js-place-order');
  if (!placeOrderButton) return;

  if (cart.calculateCartQuantity() === 0) {
    placeOrderButton.disabled = true;
  } else {
    placeOrderButton.disabled = false;
  }
}


export function rerenderCheckoutPage() {
  renderOrderSummary();
  renderPaymentSummary(placeOrder);
  renderCheckoutHeader();
  togglePaymentButtons();
}

//await for async code: shortcut for promise, 
// await let us wait till a promise done, then continue the next step: await = using .then(()=>{...})
// this keyword makes a fun return a promise, same as new Promise ...grammary
async function loadPage() {
  // we can only using await inside async funvtions
  // using try catch for error handle:
  try {
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ]);
  } catch (error) {
    // remember only catch once for the closest method, then it won't bubble out.
    // catch will skip the next code, go directly to catch scoop
    console.log("async await: Unexpected error.");
    console.log(error);
  }
  rerenderCheckoutPage();
  initOrderSummary(rerenderCheckoutPage);
}

loadPage();

// much more clear as each step has been flattened, and using then as conjunction.
// using Promise.all, run multiple at onece. and wait for all of them to finish before continue next step.


// L18: promises, handle asynchronous code, similar to done() function
// bc multiple callback cause a lot of nesting
// promise let us flatten the code


