import { renderOrderSummary, initOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart } from "../../data/cart-class.js";

// mock rerender function for testing
function mockRerender() {
  renderOrderSummary();
}

// product IDs
const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'; // socks
const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'; // basketball

describe("Integration test suite: renderOrderSummary", () => {
  beforeEach(() => {
    // 清空 DOM 并重新创建容器
    const container = document.querySelector('.js-test-container');
    container.innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="js-checkout-header"></div>
    `;

    // 初始化 cart
    cart.cartItems = [
      { productId: productId1, quantity: 2, deliveryOptionId: '1', isEditing: false },
      { productId: productId2, quantity: 1, deliveryOptionId: '2', isEditing: false }
    ];

    // 渲染并绑定事件
    renderOrderSummary();
    initOrderSummary(mockRerender);
  });

  afterEach(() => {
    // 清理 DOM 和 cart
    const container = document.querySelector('.js-test-container');
    container.innerHTML = '';
    cart.cartItems = [];
  });

  it('displays the cart with correct quantities and names', () => {
    const items = document.querySelectorAll('.js-cart-item-container');
    expect(items.length).toEqual(2);

    // 检查第一个商品
    const quantity1 = document.querySelector(`.js-product-quantity-${productId1}`);
    const name1 = document.querySelector(`.js-product-name-${productId1}`);
    expect(quantity1).not.toBeNull();
    expect(quantity1.innerText).toContain('Quantity: 2');
    expect(name1.innerText).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');

    // 检查第二个商品
    const quantity2 = document.querySelector(`.js-product-quantity-${productId2}`);
    const name2 = document.querySelector(`.js-product-name-${productId2}`);
    expect(quantity2).not.toBeNull();
    expect(quantity2.innerText).toContain('Quantity: 1');
    expect(name2.innerText).toContain('Intermediate Size Basketball');

    // 检查所有价格包含 $
    document.querySelectorAll('.product-price').forEach(el => {
      expect(el.innerText).toContain('$');
    });
  });

  it('removes a product from the cart when delete is clicked', () => {
    const items = document.querySelectorAll('.js-cart-item-container');
    expect(items.length).toEqual(2);

    const deleteLink = document.querySelector(`.js-delete-link-${productId1}`);
    expect(deleteLink).not.toBeNull();
    deleteLink.click();

    // 删除后 DOM
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(document.querySelector(`.js-product-quantity-${productId1}`)).toBeNull();
    expect(document.querySelector(`.js-product-quantity-${productId2}`)).not.toBeNull();

    // 删除后 cart
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);
  });
});

describe('Integration test suite: delivery option', () => {
  beforeEach(() => {
    const container = document.querySelector('.js-test-container');
    container.innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="js-checkout-header"></div>
    `;

    cart.cartItems = [
      { productId: productId1, quantity: 2, deliveryOptionId: '1', isEditing: false },
      { productId: productId2, quantity: 1, deliveryOptionId: '2', isEditing: false }
    ];

    renderOrderSummary();
    initOrderSummary(mockRerender);
  });

  afterEach(() => {
    const container = document.querySelector('.js-test-container');
    container.innerHTML = '';
    cart.cartItems = [];
  });

  it('updates the delivery option for the first product', () => {
    const optionInput = document.querySelector(`.js-delivery-option-input-${productId1}-3`);
    expect(optionInput).not.toBeNull();
    const optionButton = document.querySelector(`.js-delivery-option-${productId1}-3`);
    expect(optionButton).not.toBeNull();

    optionButton.click();

    // 检查 radio 被选中
    expect(optionInput.checked).toBeTrue();

    // 检查 cart 数据更新
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
  });

  it('does nothing if updating a product not in cart', () => {
    const nonExistent = document.querySelector(`.js-delivery-option-${'nonexistent'}-3`);
    expect(nonExistent).toBeNull();

    // 不在 cart 的情况下不报错
    expect(() => cart.updateDeliveryOption('nonexistent', '3')).not.toThrow();
  });
});
