import { cart, removeFromCart, calculateCartQuantity, handleUpdateQuantity } from '../data/cart.js'
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { updateCartQuantityDisplay, showInputSaveButton, removeInputSaveButton } from "../ui/modifyCart.js";

let cartSummaryHTML = '';


cart.forEach(cartItem => {
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach(product => {
    if (product.id === productId) {
      matchingProduct = product;
    }

  });
  // console.log(matchingProduct);
  cartSummaryHTML = cartSummaryHTML +
    `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}"
        data-product-id="${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link"
                    data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input">
                  <span class="save-quantity-link link-primary js-save-link"
                  data-product-id="${matchingProduct.id}">Save</span>

                  <span class="delete-quantity-link link-primary js-delete-link"
                    data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
const quantity = calculateCartQuantity(cart);
updateCartQuantityDisplay(quantity);



// use Event Delegation, bubbling
// click logic
document.querySelector('.js-order-summary').addEventListener('click', (e) => {
  const deleteLink = e.target.closest('.js-delete-link');
  // delete link logic
  if (deleteLink) {
    const productId = deleteLink.dataset.productId;
    removeFromCart(productId);
    const container = document.querySelector(`[data-product-id="${productId}"]`);
    if (container) container.remove();

    const cartQuantity = calculateCartQuantity(cart);
    updateCartQuantityDisplay(cartQuantity);
    return; // 
  }

  // exercise 14 challenge, f- : update link logic
  const updateLink = e.target.closest('.js-update-link');
  if (updateLink) {
    const productId = updateLink.dataset.productId;
    showInputSaveButton(productId);

    const container = document.querySelector(`[data-product-id="${productId}"]`);
    const labelValue = container.querySelector('.quantity-label').textContent;
    // show current amount before user doing modification
    container.querySelector('.quantity-input').value = labelValue;
    return;
  }


  //exercise 14 challenge, i, save button disappear
  const saveLink = e.target.closest('.js-save-link');
  if (saveLink) {
    const productId = saveLink.dataset.productId;
    saveQuantity(productId);
  }
});

//keylogic:
document.addEventListener('keydown', (e) => {
  const container = getEditingProductContainer();
  if (!container) return;
  // 只在 input 中拦截
  if (e.target.matches('.quantity-input')) {
    if (['Enter', 'Escape'].includes(e.key)) {
      e.preventDefault();
    }
  }

  switch (e.key) {
    case 'Escape': {
      // 取消编辑
      const productId = container.dataset.productId;
      removeInputSaveButton(productId);
      break;
    }

    case 'Enter': {
      // Enter保存
      const saveLink = container.querySelector('.js-save-link');
      if (saveLink) saveLink.click();
      break;
    }

    default:
      break;
  }
});


//helper function, wrap save logic

function saveQuantity(productId) {

  // 调用更新数量的逻辑
  const container = document.querySelector(`[data-product-id="${productId}"]`);
  const inputValueString = container.querySelector('.quantity-input').value;
  const savedUpdatedQuantity = handleUpdateQuantity(inputValueString, productId);

  //local single item update:
  container.querySelector('.quantity-label').textContent = savedUpdatedQuantity;

  // 隐藏输入框和 Save 按钮
  removeInputSaveButton(productId);

  //standard update
  const quantity = calculateCartQuantity(cart);
  updateCartQuantityDisplay(quantity);
  return;
}

function getEditingProductContainer() {
  return document.querySelector('.is-editing-quantity');
}

//Escape 只负责“退出状态”，不负责“修正数据”

// Save / Enter → 处理数据
// Update → 初始化 input
// Escape → 纯 UI 状态切换
import {renderOrderSummary} from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';

renderOrderSummary();
renderPaymentSummary();
