import { renderOrderSummary, initOrderSummary} from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
// import { cart } from '../data/cart-class.js';
// checking oop version of the code:
// import '../data/cart-oop.js';
// import '../data/cart-class.js';
// import '../data/car.js';


function rerenderCheckoutPage() {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}


// ✅ 1. 初始化数据
// loadCart();

// ✅ 2. 首次渲染
rerenderCheckoutPage();

// ✅ 3. 绑定所有行为
initOrderSummary(rerenderCheckoutPage);
