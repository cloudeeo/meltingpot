<?php
/**
 * Theme Customizer options.
 *
 * @package Melting_Pot
 */

/**
 * Register customizer settings.
 */
function melting_pot_customize_register( $wp_customize ) {
    // Section: Melting Pot Settings
    $wp_customize->add_section( 'melting_pot_settings', array(
        'title'    => __( 'Melting Pot Settings', 'melting-pot' ),
        'priority' => 30,
    ) );

    // Hero headline
    $wp_customize->add_setting( 'mp_hero_headline', array(
        'default'           => 'High-Impact Content That Gets Seen.',
        'sanitize_callback' => 'sanitize_text_field',
        'transport'         => 'refresh',
    ) );
    $wp_customize->add_control( 'mp_hero_headline', array(
        'label'   => __( 'Hero Headline', 'melting-pot' ),
        'section' => 'melting_pot_settings',
        'type'    => 'text',
    ) );

    // Hero stat 1
    $wp_customize->add_setting( 'mp_hero_stat_1', array(
        'default'           => '1M+ Impressions Generated',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'mp_hero_stat_1', array(
        'label'   => __( 'Hero Stat 1', 'melting-pot' ),
        'section' => 'melting_pot_settings',
        'type'    => 'text',
    ) );

    // Hero stat 2
    $wp_customize->add_setting( 'mp_hero_stat_2', array(
        'default'           => 'Grow Your Profile Organically',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'mp_hero_stat_2', array(
        'label'   => __( 'Hero Stat 2', 'melting-pot' ),
        'section' => 'melting_pot_settings',
        'type'    => 'text',
    ) );

    // Menu PDF URL
    $wp_customize->add_setting( 'mp_menu_pdf_url', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ) );
    $wp_customize->add_control( 'mp_menu_pdf_url', array(
        'label'       => __( 'Menu PDF Download URL', 'melting-pot' ),
        'description' => __( 'Upload the menu PDF to Media Library and paste the URL here.', 'melting-pot' ),
        'section'     => 'melting_pot_settings',
        'type'        => 'url',
    ) );

    // Contact Form 7 shortcode
    $wp_customize->add_setting( 'mp_cf7_shortcode', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'mp_cf7_shortcode', array(
        'label'       => __( 'Contact Form 7 Shortcode', 'melting-pot' ),
        'description' => __( 'Paste the CF7 shortcode, e.g. [contact-form-7 id="123" title="Contact"]', 'melting-pot' ),
        'section'     => 'melting_pot_settings',
        'type'        => 'text',
    ) );
}
add_action( 'customize_register', 'melting_pot_customize_register' );
