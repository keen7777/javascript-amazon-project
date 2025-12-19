// for clearer structure, seperate the cart object from the webside.
// export can let the variable used by other files outside of cart.js
export const cart = [];

// write functions for adding to cart:
// also group related code together into its own file.

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
            quantity: 1
        })
        // console.log(cart);

    }
}