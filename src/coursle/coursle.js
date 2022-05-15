/* exported submitGuess*/
NUMBER_OF_GUESSES = 5;
ROW_PADDING = 10;
COLUMN_PADDING = 10;
MAX_GAME_WIDTH = 600;

console.log('Entered coursle.js');
const words = ['english', 'maths', 'physics'];
let guessCount = 0;

jQuery(document).ready(function() {
  word = getRandomWord();
  console.log(word);
  board = new Board(word, 10);
});

/**
 *
 * @return {string}
 */
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

/**
 * Called when a user presses the submit button on the UI
 */
function submitGuess() {
  const guess = board.getCurrentGuess();
  console.log(guess);
  if (guess == word) {
    board.winGame();
  } else {
    [...guess].forEach(checkCharacter);
    board.incrementEnabledRow(guessCount);
    guessCount++;
  }
}

/**
 *
 * @param {string} character
 * @param {number} index
 */
function checkCharacter(character, index) {
  if (character == '') {
    throw new CoursleError('One of the entered cells was empty');
  } else if (word[index] == character) {
    board.setCellClass(guessCount, index, 'correct');
  } else if (word.includes(character)) {
    board.setCellClass(guessCount, index, 'nearly');
  } else {
    board.setCellClass(guessCount, index, 'incorrect');
  }
}
