// data structure of the products in grid.
// data folder already provided the array, hence just use it.
// remember js code run one by one in html file, so order matters.
/*
const products = [
    {
        //1st
        image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
        name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
        rating: {
            stars: 4.5,
            count: 87
        },
        priceCents: 1090
    }, {
        //2nd
        image: 'images/products/intermediate-composite-basketball.jpg',
        name: 'Intermediate Size Basketball',
        rating: {
            stars: 4,
            count: 127
        },
        priceCents: 2095

    }, {
        // 3rd
        image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
        name: 'Adults Plain Cotton T-Shirt - 2 Pack',
        rating: {
            stars: 4.5,
            count: 56
        },
        priceCents: 799

    }, {
        // 4th
        image: 'images/products/black-2-slot-toaster.jpg',
        name: '2 Slot Toaster - Black',
        rating: {
            stars: 4,
            count: 2197
        },
        priceCents: 1899

    }, {
        // 5th
        image: 'images/products/6-piece-white-dinner-plate-set.jpg',
        name: '6 Piece White Dinner Plate Set',
        rating: {
            stars: 4,
            count: 37
        },
        priceCents: 2067

    }, {
        // 6rd
        image: 'images/products/6-piece-non-stick-baking-set.webp',
        name: '6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set',
        rating: {
            stars: 4.5,
            count: 175
        },
        priceCents: 3499

    }];
*/
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

          <div class="added-to-cart ">
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

// interaction of add to cart button
document.querySelectorAll('.js-added-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
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
        const productAddQuantity =quantitySelector.value;

        // truthy/falsy value to check if there is a matching exist.
        // we prefer using id to distinguish different items.
        if (matchingItem) {
            matchingItem.quantity += Number(productAddQuantity);
        } else {
            cart.push({
                productId: productId,
                quantity:  Number(productAddQuantity)
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


    })



});