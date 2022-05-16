/**
 * @class Board
 */
export class Board {
  /**
   *
   * @param {String} word
   * @param {number} padding
   * @param {number} maxGameWidth
   * @param {number} numberOfGuesses
   */
  constructor(word, padding, maxGameWidth, numberOfGuesses) {
    this.parameters = Board.getGameParameters(word, padding, maxGameWidth, numberOfGuesses);
    this.constructRows(word, numberOfGuesses);
    this.setBoardSize();
    this.setFirstRowEnabled();
  }

  /**
   *
   * @param {String} word
   * @param {number} padding
   * @param {number} maxGameWidth
   * @param {number} numberOfGuesses
   *
   * @return {object}
   */
  static getGameParameters(word, padding, maxGameWidth, numberOfGuesses) {
    maxGameWidth = Math.min(Board.getContainerWidth(), maxGameWidth);
    const cellSize = Board.getCellSize(word, maxGameWidth, padding);
    const gameSize = Board.getGameSize(cellSize, padding, maxGameWidth, numberOfGuesses);
    return {
      'maxGameWidth': maxGameWidth,
      'cellSize': cellSize,
      'gameSize': gameSize,
      'padding': padding,
    };
  }

  /**
   *
   * @return {number}
   */
  static getContainerWidth() {
    return jQuery('#coursle').parent().width();
  }

  /**
   *
   * @param {String} word
   * @param {number} gameWidth
   * @param {number} padding
   * @return {number}
   */
  static getCellSize(word, gameWidth, padding) {
    const paddingWidth = (word.length + 1) * padding * 2;
    return Math.floor((gameWidth - paddingWidth) / (word.length + 1));
  }

  /**
   *
   * @param {number} cellSize
   * @param {number} padding
   * @param {number} maxGameWidth
   * @param {number} numberOfGuesses
   * @return {Object}
   */
  static getGameSize(cellSize, padding, maxGameWidth, numberOfGuesses) {
    const width = maxGameWidth;
    const height = (cellSize * numberOfGuesses) +
      (numberOfGuesses * padding * 2);
    return {'width': width, 'height': height};
  }

  /**
   *
   * @param {string} word
   * @param {number} numberOfGuesses
   */
  constructRows(word, numberOfGuesses) {
    for (let y = 0; y < numberOfGuesses; y++) {
      this.addBoardRow(y, word);
    }
  }

  /**
   *
   * @param {number} rowNumber
   * @param {string} word
   */
  addBoardRow(rowNumber, word) {
    const rowId = `coursle_row_${rowNumber}`;
    jQuery('#coursle').append(`<div class="coursle_row" id="${rowId}"></div>`);
    for (let x = 0; x < word.length; x++) {
      this.addBoardCell(x, rowId);
    }
  }

  /**
   *
   * @param {number} cellNumber
   * @param {number} rowId
   */
  addBoardCell(cellNumber, rowId) {
    const cellId = `coursle_cell_${cellNumber}`;
    jQuery(`#${rowId}`)
        .append(`<input type="text" value="" maxlength="1" class="coursle_cell" disabled id="${cellId}"></div>`);
  }

  /**
   * Sets the CSS size variables of the board to fit the game parameters
   */
  setBoardSize() {
    jQuery('#coursleContainer').width(this.parameters.gameSize.width);
    jQuery('#coursle').width(this.parameters.gameSize.width);
    jQuery('#coursle').height(this.parameters.gameSize.height);

    jQuery('#coursle').find('input.coursle_cell')
        .height(this.parameters.cellSize)
        .width(this.parameters.cellSize);

    jQuery('#coursle').find('input.coursle_cell')
        .css('margin', `${this.parameters.padding}px`);

    jQuery('#coursle').find('div.coursle_row')
        .height(this.parameters.cellSize)
        .width(this.parameters.gameSize.width);

    jQuery('#coursle').find('div.coursle_row')
        .css('margin', `${this.parameters.padding}px`);
  }

  /**
   * Set the first row of the board to enabled
   */
  setFirstRowEnabled() {
    jQuery('#coursle_row_0').find('input.coursle_cell').prop('disabled', false);
  }

  /**
   *
   * @param {number} row
   * @param {number} col
   * @param {string} cssClass
   */
  setCellClass(row, col, cssClass) {
    const rowId = `#coursle_row_${row}`;
    const colId = `#coursle_cell_${col}`;
    jQuery(rowId).find(colId).addClass(cssClass);
  }

  /**
   * Increment the row that is enabled
   * @param {number} guessCount
   */
  incrementEnabledRow(guessCount) {
    let rowId = `#coursle_row_${guessCount}`;
    jQuery(rowId).find('input.coursle_cell').prop('disabled', true);

    guessCount++;
    rowId = `#coursle_row_${guessCount}`;
    jQuery(rowId).find('input.coursle_cell').prop('disabled', false);
  }

  /**
   * @param {number} guessCount
   * @return {string}
   */
  getCurrentGuess(guessCount) {
    const rowId = `#coursle_row_${guessCount}`;
    const currentRow = jQuery(rowId).find('input.coursle_cell').toArray();
    const guess = currentRow.map(function(cell) {
      if (cell.value == '') {
        cell.value = ' ';
      }
      return cell.value.toLowerCase();
    });
    return guess;
  }

  /**
   * Lock the current row and display a message
   * saying that the user ahs won the game
   * @param {number} guessCount
   */
  winGame(guessCount) {
    const rowId = `#coursle_row_${guessCount}`;
    jQuery(rowId).find('input.coursle_cell').prop('disabled', true);
    jQuery(rowId).find('input.coursle_cell').addClass('correct');
    Board.setStatutsMessage('You Win!!!');
  }

  /**
   *
   * @param {string} message
   */
  static setStatutsMessage(message) {
    jQuery('#coursleMessage').text(message);
  }
};
