<?php
/*
Plugin Name: Elegance In Code
Description: Elegance In Code Core Plugin
Version: 1.0
Author: Nibir Ahmed
*/

// Enqueue JavaScript file
function ec_plugin_enqueue_script() {
    // Enqueue jQuery from WordPress core (if not already enqueued)
    wp_enqueue_script('jquery');

    // Enqueue your custom JavaScript file
    wp_enqueue_script('ec-plugin-script', plugins_url('js/ec-script.js', __FILE__), array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'ec_plugin_enqueue_script');
