const fs = require('fs');

const statistics = new Array(6);
const diffs = new Array(6);

const sample = fs.readFileSync('./theory/sample.txt', 'utf-8');
const numbers = sample
	.split('\n')
	.filter(item => item);

numbers.forEach((number, index) => {
	if (!statistics[number - 1]) {
		statistics[number - 1] = [];
	}
	statistics[number - 1].push(index);
});

let validation = 0;
statistics.forEach((indexes, i) => {
	validation += indexes.length;
	for (var j = 0; j<indexes.length - 1; j++) {
		if(!diffs[i]) {
			diffs[i] = [];
		}

		const d = indexes[j + 1] - indexes[j];
		diffs[i].push(d);
	}
});

// comparison
const equals = {};

for (var i = 0; i < diffs.length - 1; i++) {
	for (var j = 0; j < diffs[i].length; j++) {
		if (!diffs[i][j] || !diffs[i+1][j]) {
			equals[i + '-' + (i+1)] = 'length';
			break;
		}
		if (diffs[i][j] !== diffs[i+1][j]) {
			equals[i + '-' + (i+1)] = false;
			break;
		}
	}
}

const eq = Object
	.values(equals)
	.find(item => item === true);

console.log(`The step in the intervals is constant: ${eq !== undefined}`);
