const Word = require('./components/Word');
const inquirer = require('inquirer');

var singleL, wholeWord, guesses, guessesRem;

const gameArr = [
    'Crazy Taxi',
    'The Sims',
    'Assassins Creed',
    'Hitman',
    'Braid',
    'Lumines',
    'Twisted Metal',
    'Civilization Revolution',
    'Smugglers Run',
    'Mario Kart',
    'Tekken',
    'Forza Motorsport',
    'Yakuza',
    'Golden Sun',
    'Dead Rising',
    'Star Wars',
    'Advance Wars',
    'Midnight Club',
    'Psychonauts',
    'Devil May Cry',
    'Silent Hill',
    'Lost Winds',
    'Super Smash Bros Brawl',
    'Skate',
    'Grand Theft Auto',
    'God Of War',
    'Ninja Gaiden',
    'Halo',
    'Gears of War',
    'Call of Duty',
    'Mass Effect',
    'Madden',
    'Far Cry',
    'BioShock',
    'Kingdom Hearts',
    'Final Fantasy',
    'Metal Gear Solid',
    'The Legend Of Zelda',
    'Fallout'
];

function pickaGame(gameArr) {
    const random = Math.floor(Math.random() * gameArr.length);
    return gameArr[random];
}

function reset() {
    wholeWord = pickaGame(gameArr);
    console.log(wholeWord);
    singleL = new Word(wholeWord);
    singleL.guessInput(' ');
    guesses = [];
    guessesRem = 10;
}

function playGame() {
    if (guessesRem > 0 && !singleL.guessNoMore) {
        console.log(`${singleL} `);
    }
    inquirer
        .prompt([
            {
                name: 'letter',
                message: 'Type a letter',
                when: () => {
                    return guessesRem > 0;
                },
                validate: validate => {
                    if (
                        validate.length === 1 &&
                        'abcdefghijklmnopqrstuvwxyz'.indexOf(validate[0]) != -1
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                name: 'playAgain',
                type: 'confirm',
                message: 'Do you want to re-try?',
                default: true,
                when: () => {
                    return guessesRem === 0;
                }
            }
        ])
        .then(answers => {
            if (answers.playAgain) {
                console.log(`Good bye!`);
                process.exit();
            } else {
                reset();
            }

            var guess = answers.letter.toLowerCase();
            guesses.push(guess);
            singleL.guessInput(guess);
            if (wholeWord.toLowerCase().indexOf(guess)) {
                guessesRem -= 1;
            } else {
                console.log(`You typed ${guess} already`);
            }

            if (!singleL.guessNoMore()) {
                if (guessesRem < 3) {
                    console.log(`You have ${guessesRem} more guesses`);
                } else {
                    console.log(
                        `Your guesses so far: ${guesses}. You got ${guessesRem} guesses left!`
                    );
                }
            } else {
                console.log(`Bingo! You got it right! Game is ${wholeWord}`);
            }
        });
}
reset();
playGame();
