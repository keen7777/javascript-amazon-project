import { calculateTotalCostForOrder } from "./checkout/paymentSummary.js";
import { getDeliveryOption, getOrderPlacedTime,calculateDeliveryDate } from "../data/deliveryOptions.js";
import { cart } from "../data/cart-class.js";
import { getProduct } from "../data/products.js";
// use all the function to get order infos:
// 1, cart, quantity, productid to get 2, from cart-class.js
// 2, product pic, name, from products.js
// 3, total cost from paymentSummary.js
// 4, deliverydate string for each product from deliveryOptions.js

export function createOrderFromCart() {
    const cartItemsInfo = cart.getCartSnapshotForOrder();
    const totalCost = calculateTotalCostForOrder();
    const placedOrderTime = getOrderPlacedTime();

    const orderItemsInfo = [];
    cartItemsInfo.forEach(cartItem => {
        const currentProductId = cartItem.productId;
        const currentProductDeliveryOptionId = cartItem.deliveryOptionId;
        const currentProductImage = getProduct(cartItem.productId).image;
        const currentProductName = getProduct(cartItem.productId).name;
        const currentProductQuantity = cartItem.quantity;
        const currentProductDeliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        // order page don't have weekdays' name.
        const currentProductDeliveryDateString = calculateDeliveryDate(currentProductDeliveryOption);
        orderItemsInfo.push({
            name: currentProductName, 
            image: currentProductImage, 
            deliveryDate: currentProductDeliveryDateString, 
            quantity: currentProductQuantity,
            trackId : '000',
            productId: currentProductId,
            deliveryOptionId: currentProductDeliveryOptionId
        });
    });

    return {
        orderId: crypto.randomUUID(),
        totalCost: totalCost,
        placedOrderTime: placedOrderTime,
        orderItemsInfo: orderItemsInfo
    };
}
