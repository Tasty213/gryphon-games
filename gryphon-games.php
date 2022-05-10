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

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_blocks_gryphon_games_blocks_init() {
	register_block_type( __DIR__ . '/blocks/game/' );
}
add_action( 'init', 'create_blocks_gryphon_games_blocks_init' );
