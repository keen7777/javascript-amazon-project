// data structure of the products in grid.
// data folder already provided the array, hence just use it.
// remember js code run one by one in html file, so order matters.

let productsHTML = '';
// loop through the product array and create single product's html
products.forEach((product) => {
    // accumulator Pattern
    productsHTML = productsHTML + `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-added-to-cart-button" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div> `;
});

console.log(productsHTML);
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// exercise 13 challenge
let addedMessageTimeoutId;

// interaction of add to cart button
document.querySelectorAll('.js-added-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
        // const productId = button.dataset.productId; 
        // shortcut version
        const { productId } = button.dataset;
        // kabab -> caml case when we want to use "data-"
        // console.log(`everything working! ${productName}`);

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
        // console.log(cart);

        // total quantity of the cart:
        let cartQuantity = 0;
        cart.forEach((item) => {
            cartQuantity = cartQuantity + item.quantity;
        });
        // console.log(cartQuantity);

        // put it on html
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

        // exercise 13 i-m, added message, refresh timeout
        // if there is a timeout within 2s(haven't been removed and clicked twice, then we remove it and refresh the 2s timer.)
        const addToCartSelector = document.querySelector(`.js-added-to-cart-${productId}`);
        const addToCartMessage = addToCartSelector.classList.add('added-to-cart-seen');
        if (addedMessageTimeoutId) {
            clearTimeout(addedMessageTimeoutId);   
        }
        
        const timeoutId = setTimeout(() => {
                addToCartSelector.classList.remove('added-to-cart-seen');
            }, 2000);

        addedMessageTimeoutId = timeoutId;


    });



});