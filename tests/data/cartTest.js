import { addToCart, cart, loadCart } from "../../data/cart.js";
// remember the test coverage!, maximize it!
// flaky test, have to deal with localstorage(clear or not)
// using Mocks!
describe('test suite: addToCart', () => {
    // a mock is only lasts for one test! should not pollute other tests/normal code.
    beforeEach(() => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadCart(); // after mock, initialize localStorage to [];

        spyOn(localStorage, 'setItem'); // so that addtocart won't affect local storage.
    });

    afterEach(() => {

    });

    it('adds new item if it does not exist in cart', () => {
        addToCart('0123'); // first add
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); // add different item

        expect(cart.length).toEqual(2);
        expect(cart[1].productId).toBe('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[1].quantity).toBe(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    });


    it('adds new item when cart is empty', () => {
        addToCart('0123');
        expect(cart.length).toBe(1);
        expect(cart[0].productId).toBe('0123');
        expect(cart[0].quantity).toBe(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });



    it('increases quantity if item already exists in cart', () => {
        // 手动在 cart 里添加一个商品, we can also use the spyon like that(without beforeeach):
        /*
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{ productId: '0123', quantity: 2, deliveryOptionId: '1' }]);
        });
        */
        cart.push({ productId: '0123', quantity: 2, deliveryOptionId: '1' });
        addToCart('0123');
        expect(cart.length).toBe(1);       // no new item
        expect(cart[0].quantity).toBe(3);  // quantity +1
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });



});