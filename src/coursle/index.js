import {Coursle} from './coursle.mjs';

const WORDS_LIST = ['maths', 'physics', 'english'];
const PADDING = 10;
const MAX_GAME_WIDTH = 600;

jQuery(document).ready(function() {
  coursle = new Coursle(WORDS_LIST, PADDING, MAX_GAME_WIDTH);
});
