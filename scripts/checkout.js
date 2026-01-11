import { renderOrderSummary, initOrderSummary } from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
// checking oop version of the code:
// import '../data/cart-class.js';


// problem of callback:
import { loadCartFetch } from '../data/cart.js';

// backend:
// import '../data/backend-practice.js'
import { loadProductsFetch } from '../data/products.js';

export function rerenderCheckoutPage() {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}

//await for async code: shortcut for promise, 
// await let us wait till a promise done, then continue the next step: await = using .then(()=>{...})
// this keyword makes a fun return a promise, same as new Promise ...grammary
async function loadPage() {
  // we can only using await inside async funvtions
  // using try catch for error handle:
  try {

    await loadProductsFetch();
    await loadCartFetch();
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


