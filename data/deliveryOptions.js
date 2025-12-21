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

// normailize the data by seperating them in a smaller object structure, and nesting/searching via id.
export const deliveryOptions = [{
    id : '1',
    deliveryDays : 7,
    priceCents : 0

}, {
    id : '2',
    deliveryDays : 3,
    priceCents : 499

}, {
    id : '3',
    deliveryDays : 1,
    priceCents : 999
}]