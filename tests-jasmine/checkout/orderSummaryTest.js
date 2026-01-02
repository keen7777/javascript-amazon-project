import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { addToCart, cart, loadCart } from "../../data/cart.js";
describe("test suite: renderOrderSummary, intergration test", () => {
    // test :
    // how the page looks,
    // how the page behaves; 
    // since it's generate html element and stored the context inside, we have another div in our test.html
    it('displays the cart', () => {
        document.querySelector('.js-test-container').innerHTML = `<div class="js-order-summary"></div>`;
    });
    spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        },
        {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }]);
    });
    loadCart();

    renderOrderSummary();

});