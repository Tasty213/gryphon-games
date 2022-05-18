import {Coursle} from './coursle.mjs';
import './coursle.css';
import './coursle.php';

const WORDS_LIST = ['maths', 'physics', 'english'];
const PADDING = 10;
const MAX_GAME_WIDTH = 600;
const NUMBER_OF_GUESSES = 4;

jQuery(() => {
  coursle = new Coursle(WORDS_LIST, PADDING, MAX_GAME_WIDTH, NUMBER_OF_GUESSES);
});
