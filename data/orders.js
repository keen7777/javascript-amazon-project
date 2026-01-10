export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.unshift(order);
    // unshift means add the newest to the top/front of the array.
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}