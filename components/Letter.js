/* 
HINT: If you name your letter's display function toString, JavaScript will call that function automatically whenever casting that object to a string (check out this example: https://jsbin.com/facawetume/edit?js,console)
*/

const Letter = function(char) {
    this.char = char;
    this.hasGuessed = false;
    this.toString = function() {
        return this.hasGuessed ? this.char : `_`;
    };
    this.validateGuess = function(userGuess) {
        userGuess === this.char ? (this.hasGuessed = true) : null;
    };
};

module.exports = Letter;
