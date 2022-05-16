/* Global document */
import {Board} from '../board.mjs';

/**
 * Creates a coursle board to test on
 * @param {string} word
 * @param {number} padding
 * @param {number} maxGameWidth
 * @param {number} numberOfGuesses
 * @return {Board}
 */
export function constructCoursleTestEnvironment(word, padding, maxGameWidth, numberOfGuesses) {
  document.body.innerHTML = `
  <div id="coursleContainer" style="width: 1000px;">
    <span class="coursleLabel"><span class="coursleButton" onclick="submitGuess();">Submit</span></span>
    <span class="coursleLabel"><span class="coursleText" id="coursleMessage">Press the submit button to make a guess.</span></span>
    <div id="coursle"></div>
  </div><br style="clear:both;"/>`;
  return new Board(word, padding, maxGameWidth, numberOfGuesses);
}
