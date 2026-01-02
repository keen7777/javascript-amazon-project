import { cart } from "../data/cart.js";

// ui/modifyCart.js
export function updateCartQuantityDisplay(quantity) {
  const elements = document.querySelectorAll(
    '.js-cart-quantity, .js-checkout-items-amount'
  );

  elements.forEach(el => {
    el.innerHTML = quantity === 0 ? '' : quantity;
  });
}


// 
export function showInputSaveButton(productId) {
  const item = cart.find(i => i.productId === productId);
  if (!item) return;
  item.isEditing = true;
}

// 
export function removeInputSaveButton(productId) {
  const item = cart.find(i => i.productId === productId);
  if (!item) return;
  item.isEditing = false;
}