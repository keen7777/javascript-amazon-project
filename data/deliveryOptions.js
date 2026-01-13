import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  // this is a default value, choose free shipment
  return deliveryOption || deliveryOptions[0];
}

export function getOrderPlacedTime() {
  return dayjs().toISOString();
}

export function calculateStatusProgress(orderPlacedTime, deliveryTime) {
  const timePassedMs = dayjs().diff(dayjs(orderPlacedTime));
  const totalDeliveryTimeMs = dayjs(deliveryTime).diff(dayjs(orderPlacedTime));
  const progress = Math.min(Math.max(timePassedMs / totalDeliveryTimeMs, 0), 1);
  return progress;
}



// E15,l 
export function calculateDeliveryTime(deliveryOption) {
  // 从配送方式列表中，找到当前商品已选择的那一种
  // 从cartItem的id里面找具体的价钱和日期，完整的option（相当于是嵌套）
  let checkToday = dayjs();
  // check if it's weekend:
  let cntDate = deliveryOption.deliveryDays;
  let dueDate = 0;
  while (cntDate > 0) {
    let isNextDayWeekend = isWeekend(checkToday.add(dueDate, 'days'));
    if (isNextDayWeekend) {
      dueDate++;
    } else {
      dueDate++;
      cntDate--;
    }
  } 
  const today = dayjs();
  // const deliveryDate = today.add(dueDate, 'days');
  // const dateString = deliveryDate.format('dddd, MMMM D');
  // return dateString;
  const deliveryTime = today.add(dueDate, 'days').toISOString();
  return deliveryTime;
}

// inside helper function from E15e, skip weekends
function isWeekend(date) {
    const dateInWeek = date.format('dddd');
    if (dateInWeek === 'Sunday'||dateInWeek === 'Saturday') {
        return true;
    } else {
        return false;
    }
}

// normailize the data by seperating them in a smaller object structure, and nesting/searching via id.
export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0

}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499

}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}]