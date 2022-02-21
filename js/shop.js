// If you have time, you can move this variable "products" to a json file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery'
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake',
        price: 5,
        type: 'grocery'
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    let totalProducts = products.length;
    for (let i = 0; i < totalProducts; i++) {
        if (id === products[i].id) {
            cartList.push(products[i]);
            console.log("Product " + products[i].name + " added to cart.");
            return true;
        }
    }
    console.error("Product ID does not exist.");
    return false;
}

// Exercise 2
function cleanCart() {
    cartList = [];
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    let totalCartLength = cartList.length;
    let cartListTotalAmount = 0;
    for (let i = 0; i < totalCartLength; i++ ) {
        cartListTotalAmount += cartList[i].price;
    }
    console.log("Cart Total: $" + cartListTotalAmount);
    return cartListTotalAmount;
}

// Exercise 4
function generateCart(tempCart) {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    cart = [];
    let tempCartLength = tempCart.length;
    for (let i = 0 ; i < tempCartLength ; i++) {
        let existingCartIndex = cart.findIndex((element) => element.id === tempCart[i].id);
        if (existingCartIndex >= 0) {
            cart[existingCartIndex].quantity++;
            cart[existingCartIndex].subtotal = cart[existingCartIndex].price * cart[existingCartIndex].quantity;
        }else{
            cart.push(tempCart[i]);
            cart[cart.length - 1].quantity = 1;
            cart[cart.length - 1].subtotal = cart[cart.length - 1].price;
        }
    }
}

// Exercise 5
function applyPromotionsCart(shopcart) {
    // Apply promotions to each item in the array "cart"
    let shopcartLength = shopcart.length;
    for (let i = 0; i < shopcartLength; i++) {
        // Promo cooking oil
        if (shopcart[i].id === 1 && shopcart[i].quantity >= 3){
            shopcart[i].subtotalWithDiscount = 10 * shopcart[i].quantity;
        } else if (shopcart[i].id === 3 && shopcart[i].quantity >= 10){
        // Promo cupcake mixture
            shopcart[i].subtotalWithDiscount = (shopcart[i].price * 2 / 3) * shopcart[i].quantity;
            shopcart[i].subtotalWithDiscount = Math.round(shopcart[i].subtotalWithDiscount * 100) / 100;
        } else {
            delete shopcart[i].subtotalWithDiscount;
        }
    }
}


// ** Nivell II **

// Exercise 7
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
    let existingProductIndex = products.findIndex((element) => element.id === id);
    if(existingProductIndex >= 0){
        let existingCartIndex = cart.findIndex((element) => element.id === id);
        if(existingCartIndex >= 0){
            cart[existingCartIndex].quantity++;
            cart[existingCartIndex].subtotal = cart[existingCartIndex].price * cart[existingCartIndex].quantity;
        }else{
            cart.push(products[existingProductIndex]);
            cart[cart.length - 1].quantity = 1;
            cart[cart.length - 1].subtotal = cart[cart.length - 1].price;
        }
        return true;
    }else{
        console.error("Product ID does not exist.");
        return false;
    }
    printCart();
}

// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    let existingCartIndex = cart.findIndex((element) => element.id === id);
    if(existingCartIndex >= 0){
        if(cart[existingCartIndex].quantity > 1){
            cart[existingCartIndex].quantity--;
            cart[existingCartIndex].subtotal = cart[existingCartIndex].quantity * cart[existingCartIndex].price;
        }else{
            cart.splice(existingCartIndex,1);
        }
    }else{
        console.error("Product ID does not exist in the cart.");
        return false;
    }
}

// Exercise 9
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    applyPromotionsCart(cart);
    let list = document.querySelector('#cartModal .list');
    list.innerHTML = "";
    let total = 0;
    if (cart.length > 0) {
        list.innerHTML += `<li><ul class="headlist"><li>Product</li><li class="d-none d-md-inline-block">Price</li><li>Subtotal</li><li class="d-none d-md-inline-block">Old price</li><li>Modify</li></ul></li>`;
        document.getElementById('checkout-btn').style.display = 'inline-block';
        for(let i in cart){
            if(cart[i].subtotalWithDiscount !== undefined){
                itemTotal =  cart[i].subtotalWithDiscount;
                itemOldTotal = " (<s>" + parseFloat(Math.round(cart[i].subtotal*100)/100).toFixed(2) + "€</s>) ";
            }else{
                itemTotal =  cart[i].subtotal;
                itemOldTotal = "";
            }
            total += itemTotal;
            list.innerHTML += `<li><ul><li>${cart[i].quantity} x ${cart[i].name}</li><li class="d-none d-md-inline-block">${parseFloat(cart[i].price).toFixed(2)}€</li><li>${parseFloat(itemTotal).toFixed(2)}€</li><li class="d-none d-md-inline-block">${itemOldTotal}</li><li><i class="fas fa-minus" onclick="removeFromCart(${cart[i].id});printCart();"></i> <i class="fas fa-plus" onclick="addToCart(${cart[i].id});printCart()"></li></li></ul></li>`;
        }
    } else {
        list.innerHTML += '<li class="text-center">Cart is empty</li>';
        document.getElementById('checkout-btn').style.display = 'none';
    }
    list.innerHTML += `<li class="list-total"><hr><b>Total: ${parseFloat(total).toFixed(2)}€ <b></li>`;
}