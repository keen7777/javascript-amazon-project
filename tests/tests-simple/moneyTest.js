import {formatCurrency} from '../../scripts/utils/money.js' 
// L16, automated testing
// using code to test code
// include: 
//  1, basic test cases(see if it's working)
//  2, edge cases(tricky value/sinario)
// group them together to make a test suite.
console.log(`test suite: formatCurrency.`);
console.log('converts cents into dollars, with basic, 0, round up, round down.')
if (formatCurrency(2095)==='20.95') {
    console.log(`function {formatCurrency(2095)} passed`);
} else {
    console.log(`function {formatCurrency(2095)} failed`);
}

if (formatCurrency(0)==='0.00') {
    console.log(`function {formatCurrency(0)} passed`);
} else {
    console.log(`function {formatCurrency(0)} failed`);
}

if (formatCurrency(2000.5)==='20.01') {
    console.log(`function {formatCurrency(20005)} passed`);
} else {
    console.log(`function {formatCurrency(20005)} failed`);
}

//E16 a, round down
if (formatCurrency(2000.4)==='20.00') {
    console.log(`function {formatCurrency(20004)} passed`);
} else {
    console.log(`function {formatCurrency(20004)} failed`);
}

//E16 a, round down
if (formatCurrency(-2000.4)==='-20.00') {
    console.log(`function {formatCurrency(-20004)} passed`);
} else {
    console.log(`function {formatCurrency(-20004)} failed`);
}