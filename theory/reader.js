const rd = require('./roll-dice');
const fs = require('fs');

const file = fs.createWriteStream('./theory/sample.txt');
file.on('error', function(err) { 
  console.log(err);
});

for (var i = 0; i<100000; i++) {
	const number = rd.rollDice();
	file.write(number + '\n'); 
	console.log(i + '-' + number);
}

file.end();
