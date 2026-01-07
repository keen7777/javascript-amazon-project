// import { cart, removeFromCart, updateDeliveryOption, loadCart } from '../../data/cart.js';
import { cart } from '../../data/cart-class.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js'
// dayjs is the default export, only one default for each file
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
// load from external library:always load them first before your own code
// we'd prefer esm version to avoid naming conflicts
// use DayJS external library to handle delivery options.(always been minification for smaller data size)
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from '../../data/deliveryOptions.js';


// from 14 import
import { showInputSaveButton, removeInputSaveButton } from "../../ui/modifyCart.js";

export function renderOrderSummary() {
  let cartSummaryHTML = '';
  cart.cartItems.forEach(cartItem => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    // 首先单独算一个quantity的小html，看是否在编辑ing，取消用dom直接更改的操作
    const quantityHTML = cartItem.isEditing
      ? `
      <input 
        class="quantity-input"
        value="${cartItem.quantity}"
      >
      <span
        class="save-quantity-link link-primary js-save-link"
        data-product-id="${matchingProduct.id}">
        Save
      </span>
    `
      : `
      <span>
        Quantity:
        <span class="quantity-label">${cartItem.quantity}</span>
      </span>
      <span
        class="update-quantity-link link-primary js-update-link"
        data-product-id="${matchingProduct.id}">
        Update
      </span>
    `;


    // 从配送方式列表中，找到当前商品已选择的那一种
    // 从cartItem的id里面找具体的价钱和日期，完整的option（相当于是嵌套）
    // abstract it as a function in deliveryoptions.js
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const dateString = calculateDeliveryDate(deliveryOption);

    // console.log(matchingProduct);
    cartSummaryHTML = cartSummaryHTML +
      `
        <div class="cart-item-container 
        js-cart-item-container
        js-cart-item-container-${matchingProduct.id}"
          data-product-id="${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name js-product-name-${matchingProduct.id}">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${matchingProduct.getPrice()}
                </div>

                <div class="product-quantity
                  js-product-quantity-${matchingProduct.id}">
                  ${quantityHTML}
                  <span
                    class="delete-quantity-link link-primary js-delete-link
                    js-delete-link-${matchingProduct.id}"
                    data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>

              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}                            
              </div>
            </div>
          </div>
  `;
  });

  // function to create delivery Html
  // 给某一个商品，生成它的全部配送方式，并自动勾选当前选择的那一个
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);
      // if 0, then Free shipping else show price
      const priceString = deliveryOption.priceCents === 0
        ? 'FREE Shipping'
        : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`;
      //deal with choosing one of the delivery options:
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId
      // concat html here
      html +=
        `<div class="delivery-option js-delivery-option 
          js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
      <input 
      type="radio" 
      ${isChecked ? 'checked' : ''}
      class="delivery-option-input 
        js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}" 
      name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date"> ${dateString} </div>
        <div class="delivery-option-price">${priceString} </div>
      </div>
    </div>
    `;
    });
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
  // put quantity update here: 
  // renderCheckoutHeader();
}


// helper function: calculate the date?
// +++++++++++++++++++++++++++++++++++++++++++++++++++from 14 exercise:
// use Event Delegation, bubbling
// click logic

// !!!!!!!!!wraping into a function so that the loading order is ok for the test.
export function initOrderSummary(rerender) {
  const container = document.querySelector('.js-order-summary');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const deleteLink = e.target.closest('.js-delete-link');
    // delete link logic
    if (deleteLink) {
      const productId = deleteLink.dataset.productId;
      cart.removeFromCart(productId);
      rerender();
      return; // 
    }

    // E14 challenge, f- : update link logic
    const updateLink = e.target.closest('.js-update-link');
    if (updateLink) {
      const productId = updateLink.dataset.productId;
      showInputSaveButton(productId);
      rerender();
      return;
    }


    // E14 challenge, i, save button disappear
    const saveLink = e.target.closest('.js-save-link');
    if (saveLink) {
      const productId = saveLink.dataset.productId;
      saveQuantity(productId);
      // rendering as a whole page, not local item.
      removeInputSaveButton(productId); // 取消编辑状态
      rerender();
      return;
    }


    // delivery（修改配送方式） 和 delete 是「平行」的
    const deliveryOption = e.target.closest('.js-delivery-option');
    if (deliveryOption) {
      const { productId, deliveryOptionId } = deliveryOption.dataset;
      cart.updateDeliveryOption(productId, deliveryOptionId);
      rerender();
      return;
    }
  });

  //key wraping function: use rerender
  document.addEventListener('keydown', (e) => {
    handleQuantityKeydown(e, rerender);
  });

}


//keylogic:
// !!!!!!!!!wraping into a function so that the loading order is ok for the test.
function handleQuantityKeydown(e, rerender) {
  const container = getEditingProductContainer();
  if (!container) return;

  if (e.target.matches('.quantity-input')) {
    if (['Enter', 'Escape'].includes(e.key)) {
      e.preventDefault();
    }
  }

  const productId = container.closest('.cart-item-container').dataset.productId;

  switch (e.key) {
    case 'Escape':
      removeInputSaveButton(productId);
      rerender();
      break;

    case 'Enter':
      const saveLink = container.querySelector('.js-save-link');
      if (saveLink) saveLink.click();
      break;
  }
}

//helper function, wrap save logic

function saveQuantity(productId) {
  // 调用更新数量的逻辑
  const container = document.querySelector(`[data-product-id="${productId}"]`);
  const inputValueString = container.querySelector('.quantity-input').value;
  handleUpdateQuantity(inputValueString, productId);
  return;
}

function getEditingProductContainer() {
  return document.querySelector('.quantity-input:focus')?.closest('.product-quantity');
}

// Escape 只负责“退出状态”，不负责“修正数据”
// Save / Enter → 处理数据
// Update → 初始化 input
// Escape → 纯 UI 状态切换


