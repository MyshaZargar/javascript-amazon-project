import {cart, removeFromCart, updateCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utlis/money.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';

function displayDate (deliveryOption) {
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('MMMM D');
  return dateString;
}

export function renderOrderSummary(){
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingItem = getProduct(productId);
    
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    

    cartSummaryHTML += `
     <div class="cart-item-container js-cart-item-${matchingItem.id}">
      <div class="delivery-date">
        Delivery date: ${displayDate(deliveryOption)}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingItem.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingItem.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingItem.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingItem.id}" data-product-id="${matchingItem.id}">
            <span class="save-quantity-link link-primary js-save-link"  data-product-id="${matchingItem.id}">Save</span>

            <span class="delete-quantity-link link-primary js-delete-link" data-product-id = ${matchingItem.id}>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingItem, cartItem)}
        </div>
      </div>
    </div>
    `
  });

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  function deliveryOptionsHTML (matchingItem, cartItem) {
    let html = '';
    deliveryOptions.forEach(deliveryOption => {
      
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += 
      `
      <div class="delivery-option js-delivery-option"
        data-product-id = ${matchingItem.id} 
        data-delivery-option-id = ${deliveryOption.id}>
          <input type="radio"
          ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              ${displayDate(deliveryOption)}
            </div>
            <div class="delivery-option-price">
              ${priceString} - Shipping
            </div>
          </div>
        </div>
      `
    })
    return html;
  }

  

  updateCartQuantity();

  document.querySelectorAll('.js-delete-link').forEach((link) => {
      link.addEventListener('click', () => {
          const productId = link.dataset.productId;
          removeFromCart(productId);
          renderOrderSummary();//regenerating html instead of dom 
          updateCartQuantity();
          renderPaymentSummary();
      });
  });


  document.querySelectorAll('.js-update-link').forEach(link => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      document.querySelector(`.js-cart-item-${productId}`).classList.add('is-editing-quantity');
      
    })
  })



  function saveQuantity(productId) {
    
      document.querySelector(`.js-cart-item-${productId}`).classList.remove('is-editing-quantity');

      const inputQuantity = document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(inputQuantity.value);
      if(newQuantity <= 0 || newQuantity > 1000){
        alert('Enter a valid quantity');
        return;
      }
      updateQuantity(productId, newQuantity);
      
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
      document.querySelector('.js-cart-quantity').innerHTML = newQuantity;
      updateCartQuantity();
  }

  document.querySelectorAll('.js-save-link').forEach(link => {
    link.addEventListener('click', () => {
    saveQuantity(link.dataset.productId);
    })
  });
    
  //keyboard support
  document.querySelectorAll(`.quantity-input`).forEach(input => {
    input.addEventListener('keydown', (event) => {
      if(event.key === 'Enter'){
        saveQuantity(input.dataset.productId);
      }
    })
  });


  document.querySelectorAll('.js-delivery-option').forEach(option => {
    option.addEventListener('click', () => {
    const {productId, deliveryOptionId} = option.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    renderOrderSummary();//re-run all the code above ... to update the page we are generating this html again instead of using dom
    renderPaymentSummary();
  });
  });
}
