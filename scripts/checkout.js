import { renderOrderSummary} from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import deliveryTimes from './utils/deliveryTimes.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

renderOrderSummary();
renderPaymentSummary();

//test E15 
deliveryTimes.e15aTOd();
console.log(deliveryTimes.isWeekend(dayjs().add(3,'day')));