import {validDeliveryOption} from './deliveryOptions.js';

class Cart {
    cartItems;
    localStorageKey;

    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    };

    loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
    
    if(!this.cartItems){
        this.cartItems = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId : '1'
        },
        {
        productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
        quantity: 3,
        deliveryOptionId: '2'
        }];
    }
    };

    saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    };

    addToCart (productId) {
    //checks if the item is already present in the cart
    let matchingItem;
    this.cartItems.forEach(item => {
        if(productId === item.productId){
        matchingItem = item;
        } 
    });
    let selectQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
    // if the item is present, its quanity will be incremented else it will be added with quanity 1
    if (matchingItem){
        matchingItem.quantity += Number(selectQuantity?.value || 1);//to avoid putting dom elements into jasmine test
    } else {
        this.cartItems.push({
        productId,
        quantity: 1,
        deliveryOptionId: '1'
        });
    }
    this.saveToStorage();
    };

    removeFromCart(productId){
    const newCart = [];
    this.cartItems.forEach(cartItem => {
        if (cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    })
    this.cartItems = newCart;
    
    this.saveToStorage();
    };

    updateQuantity(productId, newQuantity){
    let matchingItem;
    this.cartItems.forEach(item => {
        if(productId === item.productId){
        matchingItem = item;
        }
    });
    matchingItem.quantity = newQuantity;
    this.saveToStorage();
    };

    
    updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;

    this.cartItems.forEach(item => {
        if(item.productId === productId) {
        matchingItem = item;
        }
    });

    if(!matchingItem){
        return;
    }
    
    if(!validDeliveryOption(deliveryOptionId)){
        return;
    }

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
    };
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

//to check whether an object is the instance of a class:
console.log(businessCart instanceof Cart);



console.log(cart);
console.log(businessCart);