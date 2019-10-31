let seed = 1;
const max = 6, min = 1;
// generate random value in range from 0 to 1
const randomize = () => {
   var t = (new Date().valueOf())/10000000;
   var x = Math.sin(t+seed++) * 10000;
   return x - Math.floor(x);
};

const rollDice = () => Math.floor(randomize() * (max - min + 1)) + min

module.exports = {
	rollDice
};
