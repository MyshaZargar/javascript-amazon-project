import {cart, addToCart, loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () => {

    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'setItem') // now setItem will be replaced with a faked version and we r no longer saving this in our actual setItem

        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: 1
            }]); 
        })
        //after mocking local storage we should reload the cart 
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1); // as productId is same we r just increasing the quantity
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
    });

    it('adds a new product to the cart', () => {
        //since we dont want our test code to affect our real code
        spyOn(localStorage, 'setItem') // now setItem will be replaced with a faked version and we r no longer saving this in our actual setItem

        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([]); // returns an empty string to avoid this test to fail
        })
        //after mocking local storage we should reload the cart 
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
});