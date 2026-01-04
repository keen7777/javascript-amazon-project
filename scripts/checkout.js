import { renderOrderSummary, initOrderSummary} from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { loadCart } from '../data/cart.js';
// checking oop version of the code:
import '../data/cart-oop.js';

// ✅ 1. 初始化数据
loadCart();

// ✅ 2. 首次渲染
renderOrderSummary();
renderPaymentSummary();
renderCheckoutHeader();

// ✅ 3. 绑定所有行为
initOrderSummary();
