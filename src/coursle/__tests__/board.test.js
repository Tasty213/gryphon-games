/* Global document */
import {Board} from '../board.mjs';
import {} from './setup.js';

describe('Board class non-static tests', ()=> {
  test('Board constructor makes parameters with expected sizes', () => {
    const board = new Board('test', 10, 600, 4);
    expect(board.parameters).toStrictEqual({
      maxGameWidth: 600,
      cellSize: 100,
      gameSize: {width: 600, height: 480},
      padding: 10,
    });
  });
  describe('Board constructor creates rows', ()=> {
    const expectedRowsCases = [1, 2, 3, 4, 100];
    beforeEach(()=>{
      jQuery('#coursle').empty();
    });
    test.each(expectedRowsCases)(`creates %p rows`,
        (numberOfGuesses) => {
          new Board('test', 10, 600, numberOfGuesses);
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
          new Board('test', 10, 600, 4);
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
    beforeAll(() => {
      const board = new Board('test', 10, 600, 4);
      board.incrementEnabledRow(0);
    });

    test.each(initialCase)(`Check that row %p is %p`,
        (rowId, expected) => {
          expect(jQuery(`#coursle_row_${rowId}`)
              .find('input.coursle_cell').attr('disabled')).toBe(expected);
        });
  });
  test(`setCellClass correctly mutates input boxes`, () => {
    const board = new Board('test', 10, 600, 4);
    board.setCellClass(0, 0, 'test class');
    expect(jQuery(`#coursle_row_0`)
        .find('#coursle_cell_0').hasClass('test class')).toBe(true);
  });
  /*
  test(`setCellClass throws error if out of bounds`, () => {
    board = new Board('Test', 4, 10);
    expect(() => {
      board.setCellClass(-1, -1, 'test class');
    }).toThrowError(CoursleError);
  });*/
  describe(`Win game sets correct classes and message`, () => {
    const board = new Board('test', 10, 600, 4);
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
