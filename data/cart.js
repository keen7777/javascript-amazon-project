// for clearer structure, seperate the cart object from the webside.
// export can let the variable used by other files outside of cart.js
export let cart = loadFromStorage('cart');

if (!cart) {
    cart = [{
        productId: '0123',
        quantity: 1
    }];
}



// we can just use the id to search other info of this product.

// write functions for adding to cart:
// also group related code together into its own file.

// use local storage, so that F5 won't affect delete result!
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
            //productId: productId,
            // shortcut version for the same name
            productId,
            quantity: Number(productAddQuantity)
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