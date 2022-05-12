NUMBER_OF_GUESSES = 5;
ROW_PADDING = 10;
COLUMN_PADDING = 10;
MAX_GAME_WIDTH = 600;

console.log("Entered coursle.js")
var words = ["english", "maths", "physics"];
var guessCount = 0;

jQuery(document).ready(function () {
    word = getRandomWord();
    console.log(word)
    board = new Board(word, 10);
});

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function submitGuess() {
    var guess = board.getCurrentGuess();
    console.log(guess);
    if (guess == word) {
        board.winGame();
    } else {
        [...guess].forEach(checkCharacter)
        board.incrementEnabledRow(guessCount)
        guessCount++;
    }
}

function checkCharacter(character, index) {
    if (character == "") {
        throw new CoursleError("One of the entered cells was empty");
    } else if (word[index] == character) {
        board.setCellClass(guessCount, index, "correct");
    } else if (word.includes(character)) {
        board.setCellClass(guessCount, index, "nearly")
    } else {
        board.setCellClass(guessCount, index, "incorrect")
    }
}
