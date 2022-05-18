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

function add_type_attribute($tag, $handle, $src)
{
	// if not your script, do nothing and return original $tag
	$coursleScripts = array("coursle", "coursle_class", "coursle_board", "coursle_error");
	if (!in_array($handle, $coursleScripts)) {
		return $tag;
	}
	// change the script tag by adding type="module" and return it.
	$tag = '<script src="' . esc_url($src) . '"></script>';
	return $tag;
}

function playcoursle($atts = array(), $content = null, $tag = '')
{
	error_log("Play coursle was run");
	wp_enqueue_script('coursle', plugins_url() . '/dist/coursle/bundle.js', array('jquery'));
	add_filter('script_loader_tag', 'add_type_attribute', 10, 3);

	if (is_array($atts))
		wp_localize_script('coursle', 'coursleSettings', $atts);
	else
		wp_localize_script('coursle', 'coursleSettings', array());

	$return = '<div id="coursleContainer">';
	$return .= '<span class="coursleLabel"><span class="coursleButton" onclick="coursle.submitGuess();">Submit</span></span>';
	$return .= '<span class="coursleLabel"><span class="coursleText" id="coursleMessage">Press the submit button to make a guess.</span></span>';
	$return .= '<div id="coursle"></div>';
	$return .= '</div><br style="clear:both;"/>';
	return $return;
}
add_shortcode('coursle', 'playcoursle');
?>