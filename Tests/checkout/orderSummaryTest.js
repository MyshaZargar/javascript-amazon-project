import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage, cart} from '../../data/cart.js';

describe('test suite: renderOrderSummary', () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "3ebe75dc-64d2-4137-8860-1f5a963e534b";

    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `
        <div class='js-order-summary'> </div>
        <div class='js-payment-summary'></div>
        <div class='js-checkout-header'></div>`;
        
        const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
        const productId2 = "3ebe75dc-64d2-4137-8860-1f5a963e534b";
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId : '1'
                },
                {
                productId: productId2,
                quantity: 3,
                deliveryOptionId: '2'
                }]);
        });
        loadFromStorage();
        renderOrderSummary();
    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('displays the cart', () => {
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 3');

        expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
        expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual('6 Piece White Dinner Plate Set');

        expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual('$10.90');
        expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual('$20.67');
    });

    it('removes a product', () => {
        document.querySelector(`.js-delete-link-${productId1}`).click();

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-${productId2}`)).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);

        expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual('6 Piece White Dinner Plate Set');

        expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual('$20.67');
    });

    it('updates the delivery option', () => {
        document.querySelector(`.js-delivery-option-${productId1}-3`).click();
        expect(document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked).toEqual(true);
        expect(cart.length).toEqual(2);
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(document.querySelector('.js-shipping-price').innerText).toEqual('$14.98');
        expect(document.querySelector('.js-total-price').innerText).toEqual('$108.67');
    })
});