<?php
/**
 * Theme Customizer options.
 *
 * @package Executive_Founders
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function executive_founders_customize_register( $wp_customize ) {

    // -------- Section: Hero --------
    $wp_customize->add_section( 'ef_hero', array(
        'title'    => __( 'Homepage hero', 'executive-founders' ),
        'priority' => 30,
    ) );

    $wp_customize->add_setting( 'ef_hero_title', array(
        'default'           => 'Executive Founders',
        'sanitize_callback' => 'sanitize_text_field',
        'transport'         => 'refresh',
    ) );
    $wp_customize->add_control( 'ef_hero_title', array(
        'label'   => __( 'Hero title', 'executive-founders' ),
        'section' => 'ef_hero',
        'type'    => 'text',
    ) );

    $wp_customize->add_setting( 'ef_hero_lede', array(
        'default'           => 'We help organisations, executives and leadership teams scale with clarity, structure and operational excellence.',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'ef_hero_lede', array(
        'label'   => __( 'Hero lede', 'executive-founders' ),
        'section' => 'ef_hero',
        'type'    => 'textarea',
    ) );

    // -------- Section: Contact --------
    $wp_customize->add_section( 'ef_contact', array(
        'title'    => __( 'Contact details', 'executive-founders' ),
        'priority' => 35,
    ) );

    $wp_customize->add_setting( 'ef_contact_email', array(
        'default'           => 'info@executivefounders.com',
        'sanitize_callback' => 'sanitize_email',
    ) );
    $wp_customize->add_control( 'ef_contact_email', array(
        'label'   => __( 'Contact email', 'executive-founders' ),
        'section' => 'ef_contact',
        'type'    => 'email',
    ) );

    $wp_customize->add_setting( 'ef_contact_address', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_textarea_field',
    ) );
    $wp_customize->add_control( 'ef_contact_address', array(
        'label'       => __( 'Office address', 'executive-founders' ),
        'description' => __( 'Optional. Displayed in the footer and on the contact page.', 'executive-founders' ),
        'section'     => 'ef_contact',
        'type'        => 'textarea',
    ) );

    $wp_customize->add_setting( 'ef_cf7_shortcode', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'ef_cf7_shortcode', array(
        'label'       => __( 'Contact Form 7 shortcode', 'executive-founders' ),
        'description' => __( 'Optional. If provided, the contact page uses CF7 instead of the fallback form.', 'executive-founders' ),
        'section'     => 'ef_contact',
        'type'        => 'text',
    ) );

    // -------- Section: Social --------
    $wp_customize->add_section( 'ef_social', array(
        'title'    => __( 'Social profiles', 'executive-founders' ),
        'priority' => 40,
    ) );

    $socials = array(
        'ef_social_linkedin' => __( 'LinkedIn URL', 'executive-founders' ),
        'ef_social_youtube'  => __( 'YouTube URL', 'executive-founders' ),
        'ef_social_twitter'  => __( 'X / Twitter URL', 'executive-founders' ),
    );
    foreach ( $socials as $key => $label ) {
        $wp_customize->add_setting( $key, array(
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
        ) );
        $wp_customize->add_control( $key, array(
            'label'   => $label,
            'section' => 'ef_social',
            'type'    => 'url',
        ) );
    }

    // -------- Section: SEO --------
    $wp_customize->add_section( 'ef_seo', array(
        'title'    => __( 'SEO & sharing', 'executive-founders' ),
        'priority' => 45,
    ) );

    $wp_customize->add_setting( 'ef_default_share_image', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ) );
    $wp_customize->add_control( new WP_Customize_Image_Control(
        $wp_customize,
        'ef_default_share_image',
        array(
            'label'       => __( 'Default social share image', 'executive-founders' ),
            'description' => __( 'Used for Open Graph and Twitter cards when no featured image is set. Recommended size: 1200×630.', 'executive-founders' ),
            'section'     => 'ef_seo',
        )
    ) );
}
add_action( 'customize_register', 'executive_founders_customize_register' );
