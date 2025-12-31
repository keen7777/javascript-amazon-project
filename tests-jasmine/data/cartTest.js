import { addToCart, cart, loadCart } from "../../data/cart.js";
// remember the test coverage!, maximize it!
// flaky test, have to deal with localstorage(clear or not)
// using Mocks!
describe('test suite: addToCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        loadCart(); // after mock, initialize localStorage to [];
    });

    it('adds new item when cart is empty', () => {
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toBe(1);
    });

    it('check else false condition, adding a new item which cart does not have the matching item', () => {
        // make sure the mock version return an empty array(cart)
        console.log(localStorage.getItem('cart'));

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);

    });

    it('check if true condition, adding an item which cart already has the matching item', () => {
    });

    

});