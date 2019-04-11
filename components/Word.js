const Letter = require('./Letter.js');

function Word(n) {
    this.letterArr = [];
    this.toString = function() {
        return this.letterArray.join(' ');
    };
    n.split('').map(i => {
        this.letterArr.push(new Letter(i));
    });
    this.guessInput = function(g) {
        this.letterArr.map(i => {
            console.log(i);
            console.log(g);
            // console.log(this.letterArr);
        });
    };

    this.guessNoMore = function() {
        return this.letterArr.every(v => v.guessed);
    };
}
module.exports = Word;
