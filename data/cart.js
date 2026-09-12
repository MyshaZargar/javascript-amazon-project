export let cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
},
{
    productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    quantity: 3
}];

export function addToCart (productId) {
  //checks if the item is already present in the cart
  let matchingItem;
  cart.forEach(item => {
    if(productId === item.productId){
      matchingItem = item;
    } 
  });
    
  let selectQuantity = document.querySelector(`.js-quantity-selector-${productId}`)
  // if the item is present, its quanity will be incremented else it will be added with quanity 1
  if (matchingItem){
    matchingItem.quantity += Number(selectQuantity.value);
  } else {
    cart.push({
      productId,
      quantity: 1
    });
  };
}

export function removeFromCart(productId){
    const newCart = [];
    cart.forEach(cartItem => {
        if (cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    })
    cart = newCart;
}