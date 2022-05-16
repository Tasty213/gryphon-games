/* Global document */
import {Board} from '../board.mjs';
import {Coursle} from '../coursle.mjs';
import {} from './setup.js';
import {jest} from '@jest/globals';

describe('Coursle constructor works', ()=>{
  let coursle;
  const defaultWordsList = ['maths', 'physics', 'english'];
  beforeAll(()=>{
    coursle = new Coursle();
  });

  test('random word is set', () => {
    expect(defaultWordsList).toContain(coursle.word);
  });

  test('a game board has been made', () => {
    expect(coursle.board).toBeInstanceOf(Board);
  });
});

describe('Get Guess Works as expected', () => {
  let coursle;
  beforeEach(() => {
    jQuery('#coursle').empty();
    coursle = new Coursle(['ffff']);
  });
  test(`get guess returns correct guess`, () => {
    const cells = jQuery(`#coursle_row_0`)
        .find('input.coursle_cell').toArray();
    cells.forEach((cell) => {
      cell.value = 'F';
    });
    expect(coursle.getGuess(0)).toStrictEqual(['f', 'f', 'f', 'f']);
  });
  test(`get guess on empty cells returns ' '`, () => {
    const cells = jQuery(`#coursle_row_0`)
        .find('input.coursle_cell').toArray();
    cells.forEach((cell) => {
      cell.value = '';
    });
    expect(coursle.getGuess(0)).toStrictEqual([' ', ' ', ' ', ' ']);
  });
});

describe('Check the submit function', () => {
  let coursle;
  const wordsList = ['abcd'];
  beforeAll(() => {
    jQuery('#coursle').empty();
    coursle = new Coursle(wordsList);
  });

  test('Correct answer triggers win', () => {
    const rowId = `#coursle_row_${coursle.guessCount}`;
    const currentRow = jQuery(rowId).find('input.coursle_cell').toArray();
    currentRow.forEach(function(cell, index) {
      cell.value = coursle.word[index];
    });
    coursle.board.winGame = jest.fn();
    coursle.submitGuess();
    expect(coursle.board.winGame).toBeCalled();
  });

  test('Incorrect answer triggers checks', () => {
    const rowId = `#coursle_row_${coursle.guessCount}`;
    const currentRow = jQuery(rowId).find('input.coursle_cell').toArray();
    currentRow.forEach(function(cell, index) {
      cell.value = ' ';
    });
    coursle.checkCharacter = jest.fn();
    coursle.board.incrementEnabledRow = jest.fn();
    coursle.submitGuess();
    expect(coursle.checkCharacter).toBeCalledTimes(4);
    expect(coursle.board.incrementEnabledRow).toBeCalledTimes(1);
  });
});

describe('checkCharacter method works', ()=>{
  const testCharacters = [
    ['a', 0, 'coursle_cell correct'],
    ['a', 1, 'coursle_cell nearly'],
    ['e', 0, 'coursle_cell incorrect'],
  ];
  const wordsList = ['abcd'];

  test.each(testCharacters)('Chacter %d is %d', (character, index, cssClass)=>{
    jQuery('#coursle').empty();
    coursle = new Coursle(wordsList);
    coursle.checkCharacter(character, index);
    const cell = jQuery('#coursle_row_0').find(`#coursle_cell_${index}`);
    expect(cell.attr('class')).toStrictEqual(cssClass);
  });
});
