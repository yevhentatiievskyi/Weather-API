const fs = require('fs');

const statistics = new Array(6).fill(0);
const sample = fs.readFileSync('./theory/sample.txt', 'utf-8');
const numbers = sample
	.split('\n')
	.filter(item => item);

numbers.forEach(number => {
	statistics[number - 1]++;
});

let sum = 0;
let x = 0; // average
let m = 0; // mathemetical expectation
statistics.forEach((frequency, index) => {
	sum += frequency/100000;
	x += frequency*(index+1);
	m += (index + 1);
	console.log(`Frequency of ${index + 1} = ${frequency/100000}`);
});

console.log('M = ', m/6);
