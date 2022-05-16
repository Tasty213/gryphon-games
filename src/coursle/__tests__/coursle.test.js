/* Global document */
const CoursleError = require('../errors.js');
const constructCoursleTestEnvironment = require('./setup.js');
// const CoursleError = require('../errors.js');
global.jQuery = require('jQuery');

describe('Error class tests', ()=> {
  test('Error class sets status mesage', () => {
    board = constructCoursleTestEnvironment('test', 4, 10);
    // board = constructCoursleTestEnvironment('test', 4, 10);
    const errorMessage = 'Test error message';
    try {
      throw new CoursleError(errorMessage);
    } catch (CoursleError) {
      expect(jQuery('#coursleMessage').text()).toBe(errorMessage);
    }
  });
});
