/* Global document */
const Board = require('../board.js');
// const CoursleError = require('../errors.js');
global.jQuery = require('jQuery');

describe('Board class non-static tests', ()=> {
  test('Board constructor makes parameters with expected sizes', () => {
    board = constructCoursleTestEnvironment('test', 4, 10);
    expect(board.parameters).toStrictEqual({
      maxGameWidth: 1000,
      cellSize: 180,
      gameSize: {width: 1000, height: 800},
      padding: 10,
    });
  });
  describe('Board constructor creates rows', ()=> {
    const expectedRowsCases = [1, 2, 3, 4, 100];
    test.each(expectedRowsCases)(`creates %p rows`,
        (numberOfGuesses) => {
          board = constructCoursleTestEnvironment('test', numberOfGuesses, 10);
          expect(jQuery.find('div.coursle_row').length).toBe(numberOfGuesses);
        });
  });
  describe('Rows are enabled correctly', ()=> {
    const initialCase = [
      [0, undefined],
      [1, 'disabled'],
      [2, 'disabled'],
      [3, 'disabled'],
    ];
    test.each(initialCase)(`Check that row %p is %p`,
        (rowId, expected)=>{
          board = constructCoursleTestEnvironment('Test', 4, 10);
          expect(jQuery(`#coursle_row_${rowId}`)
              .find('input.coursle_cell')
              .attr('disabled')).toBe(expected);
        });
  });
  describe('Enabled row increment works', () => {
    const initialCase = [
      [0, 'disabled'],
      [1, undefined],
      [2, 'disabled'],
      [3, 'disabled'],
    ];

    test.each(initialCase)(`Check that row %p is %p`,
        (rowId, expected) => {
          board = constructCoursleTestEnvironment('Test', 4, 10);
          board.incrementEnabledRow();
          expect(jQuery(`#coursle_row_${rowId}`)
              .find('input.coursle_cell').attr('disabled')).toBe(expected);
        });
  });
  test(`setCellClass correctly mutates input boxes`, () => {
    board = constructCoursleTestEnvironment('Test', 4, 10);
    board.setCellClass(0, 0, 'test class');
    expect(jQuery(`#coursle_row_0`)
        .find('#coursle_cell_0').hasClass('test class')).toBe(true);
  });
  /*
  test(`setCellClass throws error if out of bounds`, () => {
    board = constructCoursleTestEnvironment('Test', 4, 10);
    expect(() => {
      board.setCellClass(-1, -1, 'test class');
    }).toThrowError(CoursleError);
  });*/
  describe('Get Guess Works as expected', ()=> {
    test(`get guess returns correct guess`, () => {
      board = constructCoursleTestEnvironment('Test', 4, 10);
      const cells = jQuery(`#coursle_row_0`)
          .find('input.coursle_cell').toArray();
      cells.forEach((cell) => {
        cell.value = 'F';
      });
      expect(board.getCurrentGuess()).toBe('ffff');
    });
    test(`get guess on empty cells returns ' '`, () => {
      board = constructCoursleTestEnvironment('Test', 4, 10);
      const cells = jQuery(`#coursle_row_0`)
          .find('input.coursle_cell').toArray();
      cells.forEach((cell) => {
        cell.value = '';
      });
      expect(board.getCurrentGuess()).toBe('    ');
    });
  });
  describe(`Win game sets correct classes and message`, () => {
    board = constructCoursleTestEnvironment('Test', 4, 10);
    board.winGame();
    test('Test that input cells are disabled', ()=>{
      const rowId = `#coursle_row_0`;
      let cells = jQuery(rowId).find('input.coursle_cell').toArray();
      cells = cells.map((cell) => cell.getAttribute('disabled'));
      expect(cells).toEqual(expect.not.arrayContaining([undefined]));
    });
    test('Test that input cells class is correct', () => {
      const rowId = `#coursle_row_0`;
      let cells = jQuery(rowId).find('input.coursle_cell').toArray();
      cells = cells.map((cell) => cell.classList.contains('correct'));
      expect(cells).toEqual(expect.not.arrayContaining([undefined]));
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
