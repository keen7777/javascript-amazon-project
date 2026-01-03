import { renderOrderSummary, initOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { addToCart, cart, loadCart } from "../../data/cart.js";

describe("test suite: renderOrderSummary, Integration Test", () => {
    // test :
    // how the page looks,
    // how the page behaves; 
    // since it's generate html element and stored the context inside, we have another div in our test.html

    // a mock is only lasts for one test! should not pollute other tests/normal code.
    beforeEach(() => {
        // we also have afterEach. afterAll, beforeAll
        spyOn(localStorage, 'setItem'); // so that addtocart won't affect local storage.
        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-checkout-header"></div>
        <div class="js-payment-summary"></div>
        `;

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
        initOrderSummary();
    });

    // e16f, clean up test container after each test

    afterEach(() =>{
        document.querySelector('.js-test-container').innerHTML = '';
    });

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    it('displays the cart', () => {
        // check if the cart has 2 products(item container) inside.
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

        //e16g, check name and quantity for each product
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
        expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
        expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toContain('Intermediate Size Basketball');
        // e16h: loop through the list to make sure each product's price has a $ in front.
        expect(document.querySelectorAll(`.product-price`).forEach(e => {
            expect(e.innerText).toContain('$');
        }));

        // document.querySelector('.js-test-container').innerHTML = ``;
    });

    it('remove a product from the cart(delete)', () => {
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
        expect(document.querySelector(`.js-product-quantity-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-product-quantity-${productId2}`)).not.toEqual(null);

        //check after delete first element is product2:
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);

        // document.querySelector('.js-test-container').innerHTML = `finished`;
    });
});