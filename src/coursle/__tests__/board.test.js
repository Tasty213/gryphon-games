/* Global document */
const Board = require('../board.js');
global.jQuery = require('jquery');

describe('Board class non-static tests', ()=> {
  test('Board constructor makes parameters with expected sizes', () => {
    board = constructCoursleTestEnvironment();
    expect(board.parameters).toStrictEqual({
      maxGameWidth: 1000,
      cellSize: 180,
      gameSize: {width: 1000, height: 800},
      padding: 10,
    });
  });
  test('Board constructor creates relevant divs', () => {
    board = constructCoursleTestEnvironment();
    expect(board.parameters).toStrictEqual({
      maxGameWidth: 1000,
      cellSize: 180,
      gameSize: {width: 1000, height: 800},
      padding: 10,
    });
  });
});

/**
 * Creates a coursle board to test on
 * @param {string} word
 * @param {number} numberOfGuesses
 * @param {number} padding
 * @return {Board}
 */
function constructCoursleTestEnvironment(word, numberOfGuesses, padding) {
  document.body.innerHTML = $return = `
  <div id="coursleContainer" style="width: 1000px;">
    <span class="coursleLabel"><span class="coursleButton" onclick="submitGuess();">Submit</span></span>
    <span class="coursleLabel"><span class="coursleText" id="coursleMessage">Press the submit button to make a guess.</span></span>
    <div id="coursle"></div>
  </div><br style="clear:both;"/>`;
  globalThis.NUMBER_OF_GUESSES = numberOfGuesses;
  return new Board(word, padding);
}
