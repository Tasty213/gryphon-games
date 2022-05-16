import {Board} from './board.mjs';
/**
 * Class to construct and hold the game
 */
export class Coursle {
  /**
   * Default constructor for the game
   * @param {Array.string} words
   * @param {number} padding
   * @param {number} maxGameWidth
   */
  constructor(words, padding, maxGameWidth) {
    this.numberOfGuesses = 5;
    this.guessCount = 0;

    this.word = this.getRandomWord(words);
    this.board = new Board(this.word, padding, maxGameWidth, this.numberOfGuesses);
  };

  /**
 * @param {string} words
 * @return {string}
 */
  getRandomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
  }

  /**
 * Called when a user presses the submit button on the UI
 */
  submitGuess() {
    const guess = this.board.getCurrentGuess(this.guessCount);
    if (guess.join('') == this.word) {
      this.board.winGame(this.guessCount);
    } else {
      guess.forEach((character, index) => {
        this.checkCharacter(character, index);
      });
      this.board.incrementEnabledRow(this.guessCount);
      this.guessCount++;
    }
  }

  /**
 *
 * @param {string} character
 * @param {number} index
 */
  checkCharacter(character, index) {
    if (character == '') {
      throw new CoursleError('One of the entered cells was empty');
    } else if (this.word[index] == character) {
      this.board.setCellClass(this.guessCount, index, 'correct');
    } else if (this.word.includes(character)) {
      this.board.setCellClass(this.guessCount, index, 'nearly');
    } else {
      this.board.setCellClass(this.guessCount, index, 'incorrect');
    }
  }
}
