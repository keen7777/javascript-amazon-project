import { cart } from "../../data/cart-class.js";

describe('Function test suite: addToCart', () => {

    beforeEach(() => {
        // 重置 cart
        cart.cartItems = [];

        // spy localStorage, 不返回假的 state
        spyOn(localStorage, 'getItem').and.returnValue(null);
        spyOn(localStorage, 'setItem');
    });

    afterEach(() => {
        cart.cartItems = [];
        localStorage.setItem.calls.reset();
        localStorage.getItem.calls.reset();
    });

    it('adds new item if it does not exist in cart', () => {
        cart.addToCart('0123'); // first add
        expect(cart.cartItems.length).toBe(1);
        expect(cart.cartItems[0].productId).toBe('0123');
        expect(cart.cartItems[0].quantity).toBe(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); // add another
        expect(cart.cartItems.length).toBe(2);
        expect(cart.cartItems[1].productId).toBe('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[1].quantity).toBe(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    });

    it('adds new item when cart is empty', () => {
        cart.addToCart('0123');
        expect(cart.cartItems.length).toBe(1);
        expect(cart.cartItems[0].productId).toBe('0123');
        expect(cart.cartItems[0].quantity).toBe(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it('increases quantity if item already exists in cart', () => {
        cart.cartItems.push({ productId: '0123', quantity: 2, deliveryOptionId: '1', isEditing: false });
        cart.addToCart('0123');
        expect(cart.cartItems.length).toBe(1);       // no new item
        expect(cart.cartItems[0].quantity).toBe(3);  // quantity +1
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

});

describe('Function test suite: removeFromCart', () => {
    beforeEach(() => {
        cart.cartItems = [{ productId: '0123', quantity: 2, deliveryOptionId: '1', isEditing: false }];
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.returnValue(null);
    });

    afterEach(() => {
        cart.cartItems = [];
    });

    it('remove a productId that is in the cart', () => {
        expect(cart.cartItems.length).toBe(1);
        cart.removeFromCart('0123');
        expect(cart.cartItems.length).toBe(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([]));
    });

    it('remove a productId that is not in the cart', () => {
        expect(cart.cartItems.length).toBe(1);
        cart.removeFromCart('9999'); // 不存在的商品
        expect(cart.cartItems.length).toBe(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); // 还是会更新一次
    });
});

describe('Function test suite: updateDeliveryOption', () => {
    beforeEach(() => {
        cart.cartItems = [{ productId: '0123', quantity: 2, deliveryOptionId: '1', isEditing: false }];
        spyOn(localStorage, 'setItem');
    });

    afterEach(() => {
        cart.cartItems = [];
    });

    it('update the delivery option of a product in the cart', () => {
        cart.updateDeliveryOption('0123', '3');
        expect(cart.cartItems[0].deliveryOptionId).toBe('3');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it('update the delivery option of a product NOT in the cart', () => {
        cart.updateDeliveryOption('9999', '3');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });

    it('edge case: update an illegal delivery option of a product in the cart', () => {
        cart.updateDeliveryOption('0123', '4'); // 假设 '4' 不合法
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});
