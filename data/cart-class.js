
class Cart {
    // features that help us generate objects(represent the real world), 
    // class has extra features for oop
    // constructor as setup! 

    // same:
    // cartItems = undefined;
    // localStorageKey = undefined;

    // use private to avoid sth inside this class to be visited and modified from outside.
    cartItems;
    #localStorageKey;

    // name has to be constructor, and void, no return
    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadCart();
    }


    // we could also add # to make it privated.
    #loadCart() {
        this.cartItems = this.loadFromStorage(this.#localStorageKey);
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
    }

    // local storage
    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    loadFromStorage(str) {
        return JSON.parse(localStorage.getItem(str));
    }

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
    }

    removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach(cartItem => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;
        this.saveToStorage();
    }

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
    }

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
    }

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

    setEditing(productId, isEditing) {
        const item = this.cartItems.find(i => i.productId === productId);
        if (!item) return;
        item.isEditing = isEditing;
    }

}


/*
const cart2 = new Cart();
const businessCart2 = new Cart();
cart2.localStorageKey = 'cart-oops-class'
businessCart2.localStorageKey = 'cart-business-class'

cart2.loadCart();
// check functions and log result as expected
cart2.addToCart("54e0eccd-8f36-462b-b68a-8182611d9add");
cart2.addToCart("0123");
console.log(cart2);

// create multiple different cart via copy and paste, or a function; 
// in PascalCase means it generate objects
businessCart2.loadCart();
businessCart2.addToCart("0123");
console.log(businessCart2);
console.log(businessCart2 instanceof Cart);
*/

// use constuctor:
export const cart = new Cart('cart-oop');
console.log(cart);


