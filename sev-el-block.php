<?php
/**
 * Plugin Name:       Sev El Block
 * Description:       Plugin to a new block with support
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       sev
 *
 * @package           create-block
 */


add_action( 'init', 'create_block_sev_el_block_block_init' );
function create_block_sev_el_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}


//add_action('wp_enqueue_scripts', 'my_blocks_popover_enqueue_script');
function my_blocks_popover_enqueue_script() {   
	
    wp_enqueue_script( 'my_blocks_popover_script', 
							plugin_dir_url( __FILE__ ) . 'src/vendor/mijs.js' );
							// plugin_dir_url( __FILE__ ) . 'src/vendor/splide-4.0.2/dist/splide.min.js' );
}