import { renderOrderSummary, initOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart } from "../../data/cart-class.js";

// mock rerender function for testing
function mockRerender() {
  renderOrderSummary();
}

// product IDs
const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'; // socks
const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'; // basketball

describe("Integration: renderOrderSummary", () => {
  beforeEach(() => {
    document.querySelector('.js-test-container').innerHTML = `
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
    cart.cartItems = [];
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('renders two cart items', () => {
    expect(document.querySelectorAll('.js-cart-item-container').length).toBe(2);
  });

  it('deletes item when delete is clicked', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(cart.cartItems.length).toBe(1);
    expect(cart.cartItems[0].productId).toBe(productId2);
  });
});
