export const cart = [];

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