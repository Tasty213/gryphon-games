/* Global document */
import {CoursleError} from '../errors.mjs';
import {} from './setup.js';

// const CoursleError = require('../errors.js');

describe('Error class tests', ()=> {
  test('Error class sets status message', () => {
    // board = constructCoursleTestEnvironment('test', 4, 10);
    const errorMessage = 'Test error message';
    try {
      throw new CoursleError(errorMessage);
    } catch (CoursleError) {
      expect(jQuery('#coursleMessage').text()).toBe(errorMessage);
    }
  });
});
