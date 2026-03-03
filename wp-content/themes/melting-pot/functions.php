<?php
/**
 * Melting Pot theme functions and definitions.
 *
 * @package Melting_Pot
 */

if ( ! defined( 'MELTING_POT_VERSION' ) ) {
    define( 'MELTING_POT_VERSION', '1.0.0' );
}

/**
 * Theme setup.
 */
function melting_pot_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo', array(
        'height'      => 60,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ) );
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ) );

    register_nav_menus( array(
        'primary' => esc_html__( 'Primary Menu', 'melting-pot' ),
    ) );
}
add_action( 'after_setup_theme', 'melting_pot_setup' );

/**
 * Enqueue scripts and styles.
 */
function melting_pot_scripts() {
    // Google Fonts — Inter
    wp_enqueue_style(
        'melting-pot-google-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
        array(),
        null
    );

    // Main stylesheet
    wp_enqueue_style(
        'melting-pot-style',
        get_template_directory_uri() . '/assets/css/theme.css',
        array( 'melting-pot-google-fonts' ),
        MELTING_POT_VERSION
    );

    // Theme JS
    wp_enqueue_script(
        'melting-pot-script',
        get_template_directory_uri() . '/assets/js/theme.js',
        array(),
        MELTING_POT_VERSION,
        true
    );
}
add_action( 'wp_enqueue_scripts', 'melting_pot_scripts' );

/**
 * Include custom post types and taxonomies.
 */
require get_template_directory() . '/inc/custom-post-types.php';

/**
 * Include customizer options.
 */
require get_template_directory() . '/inc/customizer.php';
