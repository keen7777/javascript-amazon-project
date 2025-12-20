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
export function showInputSaveButton(productId){
    const productSelector = document.querySelector(`.js-cart-item-container-${productId}`);
    productSelector.classList.add('is-editing-quantity');
}

// 
export function removeInputSaveButton(productId){
    const productSelector = document.querySelector(`.js-cart-item-container-${productId}`);
    productSelector.classList.remove('is-editing-quantity');
}