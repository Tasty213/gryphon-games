/**
 * @class Board
 */
class Board {
  guessCount = 0;

  constructor(word, padding) {
    this.parameters = Board.getGameParameters(word, padding);
    this.constructRows(word);
    this.setBoardSize();
    this.setFirstRowEnabled();
  }

  static getGameParameters(word, padding) {
    const maxGameWidth = Board.getContainerWidth();
    const cellSize = Board.getCellSize(word, maxGameWidth, padding);
    const gameSize = Board.getGameSize(cellSize, padding, maxGameWidth);
    return {
      'maxGameWidth': maxGameWidth,
      'cellSize': cellSize,
      'gameSize': gameSize,
      'padding': padding,
    };
  }

  static getContainerWidth() {
    return jQuery('#coursle').parent().width();
  }

  static getCellSize(word, gameWidth, padding) {
    console.log(gameWidth);
    const paddingWidth = (word.length + 1) * padding * 2;
    return Math.floor((gameWidth - paddingWidth) / (word.length + 1));
  }

  static getGameSize(cellSize, padding, maxGameWidth) {
    const width = maxGameWidth;
    const height = (cellSize * NUMBER_OF_GUESSES) + (NUMBER_OF_GUESSES * padding * 2);
    return {'width': width, 'height': height};
  }

  constructRows(word) {
    for (let y = 0; y < NUMBER_OF_GUESSES; y++) {
      this.addBoardRow(y, word);
    }
  }

  addBoardRow(rowNumber, word) {
    const rowId = `coursle_row_${rowNumber}`;
    jQuery('#coursle').append(`<div class="coursle_row" id="${rowId}"></div>`);
    for (let x = 0; x < word.length; x++) {
      this.addBoardCell(x, rowId);
    }
  }

  addBoardCell(cellNumber, rowId) {
    const cellId = `coursle_cell_${cellNumber}`;
    jQuery(`#${rowId}`).append(`<input type="text" value="" maxlength="1" class="coursle_cell" disabled id="${cellId}"></div>`);
  }

  setBoardSize() {
    jQuery('#coursleContainer').width(this.parameters.gameSize.width);
    jQuery('#coursle').width(this.parameters.gameSize.width);
    jQuery('#coursle').height(this.parameters.gameSize.height);
    jQuery('#coursle').find('input.coursle_cell').height(this.parameters.cellSize).width(this.parameters.cellSize);
    jQuery('#coursle').find('input.coursle_cell').css('margin', `${this.parameters.padding}px`);
    jQuery('#coursle').find('div.coursle_row').height(this.parameters.cellSize).width(this.parameters.gameSize.width);
    jQuery('#coursle').find('div.coursle_row').css('margin', `${this.parameters.padding}px`);
  }

  setFirstRowEnabled() {
    jQuery('#coursle_row_0').find('input.coursle_cell').removeAttr('disabled');
  }

  setCellClass(row, col, cssClass) {
    const rowId = `#coursle_row_${row}`;
    const colId = `#coursle_cell_${col}`;
    jQuery(rowId).find(colId).addClass(cssClass);
  }

  incrementEnabledRow() {
    console.log('Incrementing Row');
    var rowId = `#coursle_row_${this.guessCount}`;
    jQuery(rowId).find('input.coursle_cell').attr('disabled', true);

    this.guessCount++;
    var rowId = `#coursle_row_${this.guessCount}`;
    jQuery(rowId).find('input.coursle_cell').removeAttr('disabled');
  }

  getCurrentGuess() {
    const rowId = `#coursle_row_${this.guessCount}`;
    const currentRow = jQuery(rowId).find('input.coursle_cell').toArray();
    const guess = currentRow.map(function(cell) {
      if (cell.value == '') {
        cell.value = ' ';
      }
      return cell.value;
    });
    return guess.join('').toLowerCase();
  }

  winGame() {
    const rowId = `#coursle_row_${this.guessCount}`;
    jQuery(rowId).find('input.coursle_cell').attr('disabled', true);
    jQuery(rowId).find('input.coursle_cell').addClass('correct');
    Board.setStatutsMessage('You Win!!!');
  }

  static setStatutsMessage(message) {
    jQuery('#coursleMessage').text(message);
  }
}
