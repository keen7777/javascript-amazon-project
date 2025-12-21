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
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    // truthy/falsy value to check if there is a matching exist.
    // we prefer using id to distinguish different items.
    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        })
        // console.log(cart);
        saveToStorage();
    }
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