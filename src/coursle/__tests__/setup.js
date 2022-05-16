/* Global document */
const Board = require('../board.js');
// const CoursleError = require('../errors.js');
global.jQuery = require('jQuery');

/**
 * Creates a coursle board to test on
 * @param {string} word
 * @param {number} numberOfGuesses
 * @param {number} padding
 * @return {Board}
 */
function beforeEach(word, numberOfGuesses, padding) {
  document.body.innerHTML = $return = `
  <div id="coursleContainer" style="width: 1000px;">
    <span class="coursleLabel"><span class="coursleButton" onclick="submitGuess();">Submit</span></span>
    <span class="coursleLabel"><span class="coursleText" id="coursleMessage">Press the submit button to make a guess.</span></span>
    <div id="coursle"></div>
  </div><br style="clear:both;"/>`;
  globalThis.NUMBER_OF_GUESSES = numberOfGuesses;
  return new Board(word, padding);
}

module.exports = beforeEach;
