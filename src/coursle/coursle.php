<?php
register_activation_hook(__FILE__, 'coursle_install');
function coursle_install()
{
	add_option('coursle_rounded_borders', false, '', 'yes');
}

register_deactivation_hook(__FILE__, 'coursle_remove');
function coursle_remove()
{
	delete_option('coursle_rounded_borders');
}

/* ADMIN MENU */
add_action('admin_menu', 'coursle_admin_menu');
function coursle_admin_menu()
{
	add_options_page('coursle', 'coursle', 'administrator', 'coursle', 'coursle_option_page');
}
function coursle_option_page()
{
?>
	<h1>INSERT GAME DOCUMENTATION</h1>
<?php
}

/* SHORTCODE */

function playcoursle($atts = array(), $content = null, $tag = '')
{
	wp_enqueue_style('coursle', plugins_url() . '/gryphon-games/src/coursle/coursle.css');
	wp_enqueue_script('coursle', plugins_url() . '/gryphon-games/src/coursle/coursle.js', array('jquery'));
	wp_enqueue_script('coursle_board', plugins_url() . '/gryphon-games/src/coursle/board.js', array('jquery'));
	wp_enqueue_script('coursle_error', plugins_url() . '/gryphon-games/src/coursle/errors.js', array('jquery'));


	if (is_array($atts))
		wp_localize_script('coursle', 'coursleSettings', $atts);
	else
		wp_localize_script('coursle', 'coursleSettings', array());

	$return = '<div id="coursleContainer">';
	$return .= '<span class="coursleLabel"><span class="coursleButton" onclick="submitGuess();">Submit</span></span>';
	$return .= '<span class="coursleLabel"><span class="coursleText" id="coursleMessage">Press the submit button to make a guess.</span></span>';
	$return .= '<div id="coursle"></div>';
	$return .= '</div><br style="clear:both;"/>';
	return $return;
}
add_shortcode('coursle', 'playcoursle');
?>