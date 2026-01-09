function Cart(localStorageKey) {
    const cart = {
    cartItems: undefined,

    // 专门负责初始化, oop using regular function(not arrow)
    loadFromStorage() {
        this.cartItems = this.loadFromStorageParse(localStorageKey);
        this.cartItems = this.cartItems ?? [
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1',
                isEditing: false
            },
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2',
                isEditing: false
            }
        ];
    },

    // local storage
    saveToStorage() {
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    loadFromStorageParse(str) {
        return JSON.parse(localStorage.getItem(str));
    },

    addToCart(productId) {
        // check if this product already in the cart, if exist then quantity +1, else push an new object.
        // remember to loop through and then find out if the whole cart exist such a particular product. 

        let matchingItem;
        this.cartItems.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item;
            }
        });

        //exercise 13 a-f, selector for quantity number
        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        // L16 for testing, set default quantity =1
        const productAddQuantity = quantitySelector ? Number(quantitySelector.value) : 1;

        // truthy/falsy value to check if there is a matching exist.
        // we prefer using id to distinguish different items.
        if (matchingItem) {
            matchingItem.quantity += Number(productAddQuantity);
        } else {
            this.cartItems.push({
                productId: productId,
                quantity: Number(productAddQuantity),
                deliveryOptionId: '1',
                isEditing: false
            })
        }
        this.saveToStorage();
    },

    removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach(cartItem => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;
        this.saveToStorage();
    },

    // exercise 14: a-c, update the items number in checkout item(???)
    // helper function: -------------------------------------------
    calculateCartQuantity() {
        // total quantity of the cart:
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            cartQuantity = cartQuantity + cartItem.quantity;
        });
        return cartQuantity;
        // just to make it identical with tutorial.
    },

    // exercise 14: k, update the items number using Update button in the cart(???)
    handleUpdateQuantity(inputString, productId) {
        const newQuantity = Number(inputString);

        this.cartItems.forEach(cartItem => {
            if (cartItem.productId !== productId) return;

            if (
                Number.isNaN(newQuantity) ||
                newQuantity < 0 ||
                newQuantity > 1000
            ) {
                alert('Quantity must be between 0 and 1000');
                return; // 什么都不改
            }

            cartItem.quantity = newQuantity;
        });

        this.saveToStorage();
        return newQuantity;
    },

    // helper functions ends-------------------------------------------
    updateDeliveryOption(productId, deliveryOptionId) {
        // checking illegal delivery option
        if (!(deliveryOptionId === '1' || deliveryOptionId === '2' || deliveryOptionId === '3')) {
            return;
        }
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        if (matchingItem === undefined) {
            return;
        } else {
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        }
    }
};
return cart;
}
// for object oriented programming: organize code into objects

const cart2 = Cart('cart-oop');
const businessCart2 = Cart('cart-business');

cart2.loadFromStorage();
// check functions and log result as expected
cart2.addToCart("0123");
console.log(cart2);


// create multiple different cart via copy and paste, or a function; 
// in PascalCase means it generate objects
businessCart2.loadFromStorage();
console.log(businessCart2);




