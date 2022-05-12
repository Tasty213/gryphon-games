<?php

/**
 * Plugin Name:       Gryphon Games
 * Description:       A plugin for games on the gryphon site.
 * Version:           0.1.0
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Author:            George Sykes
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gryphon-games
 *
 * @package           gryphon-games
 */

include("src/snake/snake.php");

//  Functions to display a list of all the shortcodes
function diwp_get_list_of_shortcodes()
{

	// Get the array of all the shortcodes
	global $shortcode_tags;

	$shortcodes = $shortcode_tags;

	// sort the shortcodes with alphabetical order
	ksort($shortcodes);

	$shortcode_output = "<ul>";

	foreach ($shortcodes as $shortcode => $value) {
		$shortcode_output = $shortcode_output . '<li>[' . $shortcode . ']</li>';
	}

	$shortcode_output = $shortcode_output . "</ul>";

	return $shortcode_output;
}
add_shortcode('get-shortcode-list', 'diwp_get_list_of_shortcodes');
