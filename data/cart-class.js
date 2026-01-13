
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
        this.#loadFromStorage();
    }


    // we could also add # to make it privated.
    #loadFromStorage() {
        this.cartItems = this.loadFromStorageParse(this.#localStorageKey);
        this.cartItems = this.cartItems ?? [];
    }

    // local storage
    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    loadFromStorageParse(str) {
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

    // for generating order:

    getCartSnapshotForOrder() {
        return this.cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            deliveryOptionId: item.deliveryOptionId
        }));
    }

    //for order clearCart:
    clearCart(){
        this.cartItems = [];
        this.saveToStorage();
    }

    // backend practice:
    async loadCartFetch() {
    // whatever we fetch, go to response
    try {
        const response = await fetch('https://supersimplebackend.dev/cart');
        const text = await response.text();
        console.log(`in loadCartFetch function : ${text}`);
        return text;
    } catch (error) {
        // use catch for error in promise
        console.log('Fetch: unexpected error. Please try again later')
        console.log(error);
    }
}


}



// use constuctor:
export const cart = new Cart('cart-class');



