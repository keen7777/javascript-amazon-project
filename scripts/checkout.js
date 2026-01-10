import { renderOrderSummary, initOrderSummary } from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
// checking oop version of the code:
// import '../data/cart-class.js';
// import '../data/car.js';

// problem of callback:
import { loadCart } from '../data/cart.js';

// backend:
// import '../data/backend-practice.js'
import { loadProducts, loadProductsFetch } from '../data/products.js';

export function rerenderCheckoutPage() {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}

// much more clear as each step has been flattened, and using then as conjunction.
// using Promise.all, run multiple at onece. and wait for all of them to finish before continue next step.

Promise.all([
  // new version
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('value2 : loadCart fun');// resolve go first then render... funs.
    });
  })

]).then((values) => {
  console.log(values);
  rerenderCheckoutPage();
  initOrderSummary(rerenderCheckoutPage);
});

/**
 * using xhr and promise
Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('value1 : loadProducts fun');// resolve go first then render... funs.
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('value2 : loadCart fun');// resolve go first then render... funs.
    });
  })

]).then((values) => {
  console.log(values);
  rerenderCheckoutPage();
  initOrderSummary(rerenderCheckoutPage);
});
 */

///////////////////////////
/*
new Promise((resolve) => {
  // it will run the function immediately
  // resolve let us control wen to go to the next step
  loadProducts(() => {
    resolve('value1');// resolve go first then render... funs.
  });

}).then((value) => {
  console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();// resolve go first then render... funs.
    });
  });

}).then(() => {
  rerenderCheckoutPage();
  initOrderSummary(rerenderCheckoutPage);
});
*/


// basically:
// Promise -> loadProducts -> 2 groups of code running at the same time
// group 1 : renderOS -> renderPS -> renderCH
// group 2 : resolve() -> then(???)

// comparing with nesting callbacks:

/* !!!
loadProducts(() => {
  loadCart(() => {
    rerenderCheckoutPage();
    initOrderSummary(rerenderCheckoutPage);
  });
});
*/


/* !!!
loadProducts(() => {
  // 1. 首次渲染
  rerenderCheckoutPage();
  // 2. 绑定所有行为
  initOrderSummary(rerenderCheckoutPage);
});
*/

// L18: callback and done
// send a request, use a callback to wait for a respone, then run the rest of the code.

// L18: promises, handle asynchronous code, similar to done() function
// bc multiple callback cause a lot of nesting
// promise let us flatten the code


