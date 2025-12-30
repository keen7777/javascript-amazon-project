// for clearer structure, seperate the cart object from the webside.
// export can let the variable used by other files outside of cart.js
export let cart = loadFromStorage('cart');

if (!cart) {
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId : '1'
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId : '2'
    }];
}



// we can just use the id to search other info of this product.

// write functions for adding to cart:
// also group related code together into its own file.

// use local storage, so that F5 won't affect delete result!(use localStorage.clear() if want to set the cart into default)
function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadFromStorage(str) {
    return JSON.parse(localStorage.getItem(str));
}

export function addToCart(productId) {
    // check if this product already in the cart, if exist then quantity +1, else push an new object.
    // remember to loop through and then find out if the whole cart exist such a particular product. 

    let matchingItem;
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    //exercise 13 a-f, selector for quantity number
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const productAddQuantity = quantitySelector.value;

    // truthy/falsy value to check if there is a matching exist.
    // we prefer using id to distinguish different items.
    if (matchingItem) {
        matchingItem.quantity += Number(productAddQuantity);
    } else {
        cart.push({
            productId: productId,
            quantity: Number(productAddQuantity),
            deliveryOptionId: '1'
        })
    }
    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach(cartItem => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToStorage();
}


// exercise 14: a-c, update the items number in checkout item(???)
// helper function: -------------------------------------------
export function calculateCartQuantity(cart) {
    // total quantity of the cart:
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity = cartQuantity + cartItem.quantity;
    });
    return cartQuantity;
    // just to make it identical with tutorial.
}

// exercise 14: k, update the items number using Update button in the cart(???)
export function handleUpdateQuantity(inputString, productId) {
    const newQuantity = Number(inputString);

    cart.forEach(cartItem => {
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

    saveToStorage();
    return newQuantity;
}

// helper functions ends-------------------------------------------
export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}
