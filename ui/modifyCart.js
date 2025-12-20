// ui/modifyCart.js
export function updateCartQuantityDisplay(quantity) {
  const elements = document.querySelectorAll(
    '.js-cart-quantity, .js-checkout-items-amount'
  );

  elements.forEach(el => {
    el.innerHTML = quantity === 0 ? '' : quantity;
  });
}
