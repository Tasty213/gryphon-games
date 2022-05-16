/* Global document */
import {Coursle} from '../coursle.mjs';

test('getRandomWord Test', () => {
  const wordsList = ['maths', 'physics', 'english'];
  const padding = 10;
  const maxGameWidth = 600;
  const coursle = new Coursle(wordsList, padding, maxGameWidth);
  console.log(coursle.words);
  expect(wordsList).toContain(coursle.word);
});


