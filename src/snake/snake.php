<?php
register_activation_hook(__FILE__, 'snake_install');
function snake_install()
{
	add_option('snake_rounded_borders', false, '', 'yes');
}

register_deactivation_hook(__FILE__, 'snake_remove');
function snake_remove()
{
	delete_option('snake_rounded_borders');
}

/* ADMIN MENU */
add_action('admin_menu', 'snake_admin_menu');
function snake_admin_menu()
{
	add_options_page('Snake', 'Snake', 'administrator', 'snake', 'snake_option_page');
}
function snake_option_page()
{
?>
	<h1>INSERT GAME DOCUMENTATION</h1>
<?php
}

/* SHORTCODE */

function playSnake($atts = array(), $content = null, $tag = '')
{
	wp_enqueue_style('snake', plugins_url() . '/gryphon-games/src/snake/snake.css');
	wp_enqueue_script('snake', plugins_url() . '/gryphon-games/src/snake/snake.js', array('jquery'));

	if (is_array($atts))
		wp_localize_script('snake', 'snakeSettings', $atts);
	else
		wp_localize_script('snake', 'snakeSettings', array());

	$return = '<div id="snakeContainer">';
	$return .= '<span class="snakeLabel"><span class="snakeButton" onclick="snakeStart();">Start</span></span>';
	$return .= '<span class="snakeLabel">Score: <span class="snakeInput" id="snakeScore">0</span></span>';
	$return .= '<span class="snakeLabel"><span class="snakeText" id="snakeMessage">Press the start button to begin.</span></span>';
	//$return .= '<span class="snakeLabel snakeLabelRight"><span class="snakeText"><a href="http://wordpress.camilstaps.nl/plugins/snake" target="_blank">Snake</a> by <a href="http://www.camilstaps.nl/" target="_blank">Camil Staps</a></span></span>';
	$return .= '<div id="snake"></div>';
	$return .= '</div><br style="clear:both;"/>';
	return $return;
}
add_shortcode('snake', 'playSnake');
?>