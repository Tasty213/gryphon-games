import {Board} from './board.mjs';

/**
 * Class for coursle erors require that a board has already been made
 * @extends Error
 */
export class CoursleError extends Error {
  /**
   *
   * @param {string} message
   */
  constructor(message) {
    super(message);
    this.name = 'CoursleError';
    Board.setStatutsMessage(message);
  }
}
