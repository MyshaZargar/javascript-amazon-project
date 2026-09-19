import {formatCurrency} from '../scripts/utlis/money.js';

console.log('Test Suite : formatCurrency');

console.log('converts cents into dollars')

if(formatCurrency(2095) === '20.95'){
    console.log('passed');
} else {
    console.log('failed');
}

console.log('works with 0');

if(formatCurrency(0) === '0.00'){
    console.log('passed');
} else {
    console.log('failed');
}

console.log('rounds up to the nearest cents')

if(formatCurrency(2000.05) === '20.00'){
    console.log('passed');
} else {
    console.log('failed');
}