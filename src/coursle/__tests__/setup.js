/* Global document */
import $ from 'jquery';
global.$ = $;
global.jQuery = $;
global.document.body.innerHTML = `
  <div id="coursleContainer" style="width: 1000px;">
    <span class="coursleLabel"><span class="coursleButton" onclick="submitGuess();">Submit</span></span>
    <span class="coursleLabel"><span class="coursleText" id="coursleMessage">Press the submit button to make a guess.</span></span>
    <div id="coursle"></div>
  </div><br style="clear:both;"/>`;

