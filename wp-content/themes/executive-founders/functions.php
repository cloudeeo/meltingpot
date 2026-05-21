<?php
/**
 * Executive Founders theme — functions and definitions.
 *
 * @package Executive_Founders
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! defined( 'EXECUTIVE_FOUNDERS_VERSION' ) ) {
    define( 'EXECUTIVE_FOUNDERS_VERSION', '1.0.0' );
}

/**
 * Theme setup.
 */
function executive_founders_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'automatic-feed-links' );
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
        'navigation-widgets',
    ) );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'align-wide' );

    load_theme_textdomain( 'executive-founders', get_template_directory() . '/languages' );

    register_nav_menus( array(
        'primary' => esc_html__( 'Primary Menu', 'executive-founders' ),
        'footer'  => esc_html__( 'Footer Menu', 'executive-founders' ),
    ) );

    // Image sizes used by templates.
    add_image_size( 'ef-card', 800, 600, true );
    add_image_size( 'ef-hero', 1600, 900, true );
}
add_action( 'after_setup_theme', 'executive_founders_setup' );

/**
 * Set content width.
 */
function executive_founders_content_width() {
    $GLOBALS['content_width'] = 1100;
}
add_action( 'after_setup_theme', 'executive_founders_content_width', 0 );

/**
 * Enqueue styles and scripts.
 */
function executive_founders_scripts() {
    // Preconnect headers for Google Fonts are emitted via wp_resource_hints below.
    wp_enqueue_style(
        'executive-founders-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
        array(),
        null
    );

    wp_enqueue_style(
        'executive-founders-style',
        get_template_directory_uri() . '/assets/css/theme.css',
        array( 'executive-founders-fonts' ),
        EXECUTIVE_FOUNDERS_VERSION
    );

    wp_enqueue_script(
        'executive-founders-script',
        get_template_directory_uri() . '/assets/js/theme.js',
        array(),
        EXECUTIVE_FOUNDERS_VERSION,
        true
    );

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', 'executive_founders_scripts' );

/**
 * Mark theme JS for asynchronous loading where browsers support it.
 */
function executive_founders_async_script( $tag, $handle ) {
    if ( 'executive-founders-script' === $handle ) {
        return str_replace( ' src=', ' defer src=', $tag );
    }
    return $tag;
}
add_filter( 'script_loader_tag', 'executive_founders_async_script', 10, 2 );

/**
 * Add preconnect hints for Google Fonts.
 */
function executive_founders_resource_hints( $hints, $relation ) {
    if ( 'preconnect' === $relation ) {
        $hints[] = array(
            'href'        => 'https://fonts.googleapis.com',
            'crossorigin' => 'anonymous',
        );
        $hints[] = array(
            'href'        => 'https://fonts.gstatic.com',
            'crossorigin' => 'anonymous',
        );
    }
    return $hints;
}
add_filter( 'wp_resource_hints', 'executive_founders_resource_hints', 10, 2 );

/**
 * Fallback menu when no primary menu is assigned.
 */
function executive_founders_fallback_menu() {
    $pages = array(
        'Home'          => home_url( '/' ),
        'Services'      => home_url( '/services/' ),
        'Portfolio'     => home_url( '/portfolio/' ),
        'Digital Media' => home_url( '/digital-media/' ),
        'News'          => home_url( '/news/' ),
        'About'         => home_url( '/about/' ),
        'Contact'       => home_url( '/contact/' ),
    );
    echo '<ul class="nav-menu">';
    foreach ( $pages as $label => $url ) {
        printf(
            '<li><a href="%1$s">%2$s</a></li>',
            esc_url( $url ),
            esc_html( $label )
        );
    }
    echo '</ul>';
}

/**
 * Output a meta description.
 *
 * Falls back to: page/post excerpt → page content → site tagline → site description.
 */
function executive_founders_meta_description() {
    $description = '';

    if ( is_singular() ) {
        $post = get_queried_object();
        if ( $post instanceof WP_Post ) {
            if ( ! empty( $post->post_excerpt ) ) {
                $description = $post->post_excerpt;
            } else {
                $description = wp_strip_all_tags( strip_shortcodes( $post->post_content ) );
            }
        }
    } elseif ( is_category() || is_tag() || is_tax() ) {
        $description = term_description();
    } elseif ( is_author() ) {
        $description = get_the_author_meta( 'description' );
    }

    if ( empty( $description ) ) {
        $description = get_bloginfo( 'description', 'display' );
    }

    $description = wp_strip_all_tags( $description );
    $description = preg_replace( '/\s+/', ' ', $description );
    $description = trim( $description );

    if ( mb_strlen( $description ) > 158 ) {
        $description = mb_substr( $description, 0, 155 ) . '…';
    }

    return $description;
}

/**
 * Render meta description + Open Graph + Twitter Card tags in <head>.
 */
function executive_founders_head_meta() {
    $description = executive_founders_meta_description();
    $title       = wp_get_document_title();
    $url         = is_singular() ? get_permalink() : home_url( add_query_arg( null, null ) );
    $site_name   = get_bloginfo( 'name' );

    $og_image = '';
    if ( is_singular() && has_post_thumbnail() ) {
        $og_image = get_the_post_thumbnail_url( get_queried_object_id(), 'ef-hero' );
    }
    if ( ! $og_image ) {
        $og_image = get_theme_mod( 'ef_default_share_image', '' );
    }

    $og_type = is_singular( 'post' ) ? 'article' : 'website';
    ?>
    <meta name="description" content="<?php echo esc_attr( $description ); ?>">
    <meta property="og:locale" content="<?php echo esc_attr( get_locale() ); ?>">
    <meta property="og:type" content="<?php echo esc_attr( $og_type ); ?>">
    <meta property="og:site_name" content="<?php echo esc_attr( $site_name ); ?>">
    <meta property="og:title" content="<?php echo esc_attr( $title ); ?>">
    <meta property="og:description" content="<?php echo esc_attr( $description ); ?>">
    <meta property="og:url" content="<?php echo esc_url( $url ); ?>">
    <?php if ( $og_image ) : ?>
        <meta property="og:image" content="<?php echo esc_url( $og_image ); ?>">
        <meta name="twitter:image" content="<?php echo esc_url( $og_image ); ?>">
    <?php endif; ?>
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo esc_attr( $title ); ?>">
    <meta name="twitter:description" content="<?php echo esc_attr( $description ); ?>">
    <?php
}
add_action( 'wp_head', 'executive_founders_head_meta', 5 );

/**
 * JSON-LD structured data: Organization + WebSite globally,
 * Article on single posts, VideoObject on single videos.
 */
function executive_founders_structured_data() {
    $site_name = get_bloginfo( 'name' );
    $site_url  = home_url( '/' );

    $organization = array(
        '@context' => 'https://schema.org',
        '@type'    => 'Organization',
        'name'     => $site_name,
        'url'      => $site_url,
        'logo'     => get_theme_mod( 'ef_default_share_image', $site_url . 'wp-content/themes/executive-founders/assets/images/logo-ef.svg' ),
        'sameAs'   => array_filter( array(
            get_theme_mod( 'ef_social_linkedin', '' ),
            get_theme_mod( 'ef_social_youtube', '' ),
            get_theme_mod( 'ef_social_twitter', '' ),
        ) ),
        'contactPoint' => array(
            '@type'        => 'ContactPoint',
            'contactType'  => 'business inquiries',
            'email'        => get_theme_mod( 'ef_contact_email', 'info@executivefounders.com' ),
        ),
    );

    $website = array(
        '@context'      => 'https://schema.org',
        '@type'         => 'WebSite',
        'name'          => $site_name,
        'url'           => $site_url,
        'potentialAction' => array(
            '@type'       => 'SearchAction',
            'target'      => $site_url . '?s={search_term_string}',
            'query-input' => 'required name=search_term_string',
        ),
    );

    $graph = array( $organization, $website );

    if ( is_singular( 'post' ) ) {
        $post = get_queried_object();
        $graph[] = array(
            '@context'      => 'https://schema.org',
            '@type'         => 'Article',
            'headline'      => get_the_title( $post ),
            'datePublished' => get_the_date( DATE_W3C, $post ),
            'dateModified'  => get_the_modified_date( DATE_W3C, $post ),
            'author'        => array(
                '@type' => 'Person',
                'name'  => get_the_author_meta( 'display_name', $post->post_author ),
            ),
            'publisher'     => array(
                '@type' => 'Organization',
                'name'  => $site_name,
            ),
            'mainEntityOfPage' => get_permalink( $post ),
            'image'         => has_post_thumbnail( $post ) ? get_the_post_thumbnail_url( $post, 'ef-hero' ) : '',
        );
    }

    if ( is_singular( 'ef_video' ) ) {
        $post     = get_queried_object();
        $video_url = get_post_meta( $post->ID, '_ef_video_url', true );
        $graph[]  = array(
            '@context'     => 'https://schema.org',
            '@type'        => 'VideoObject',
            'name'         => get_the_title( $post ),
            'description'  => wp_strip_all_tags( get_the_excerpt( $post ) ),
            'thumbnailUrl' => has_post_thumbnail( $post ) ? get_the_post_thumbnail_url( $post, 'ef-hero' ) : '',
            'uploadDate'   => get_the_date( DATE_W3C, $post ),
            'contentUrl'   => $video_url,
            'embedUrl'     => $video_url,
        );
    }

    printf(
        '<script type="application/ld+json">%s</script>' . "\n",
        wp_json_encode( $graph, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE )
    );
}
add_action( 'wp_head', 'executive_founders_structured_data', 20 );

/**
 * Improve excerpt defaults — concise, on-brand "Read more" replaced with link.
 */
function executive_founders_excerpt_more() {
    return '…';
}
add_filter( 'excerpt_more', 'executive_founders_excerpt_more' );

function executive_founders_excerpt_length() {
    return 28;
}
add_filter( 'excerpt_length', 'executive_founders_excerpt_length', 999 );

/**
 * Add a body class indicating the current template, used by CSS.
 */
function executive_founders_body_classes( $classes ) {
    if ( is_front_page() ) {
        $classes[] = 'is-front';
    }
    if ( is_singular() && has_post_thumbnail() ) {
        $classes[] = 'has-featured';
    }
    return $classes;
}
add_filter( 'body_class', 'executive_founders_body_classes' );

/**
 * Allow YouTube/Vimeo URLs in the video CPT meta.
 */
function executive_founders_is_safe_video_url( $url ) {
    $url   = esc_url_raw( $url );
    $host  = wp_parse_url( $url, PHP_URL_HOST );
    if ( ! $host ) {
        return '';
    }
    $allow = array( 'www.youtube.com', 'youtube.com', 'youtu.be', 'player.vimeo.com', 'vimeo.com' );
    foreach ( $allow as $allowed ) {
        if ( strtolower( $host ) === $allowed ) {
            return $url;
        }
    }
    return '';
}

require_once get_template_directory() . '/inc/customizer.php';
require_once get_template_directory() . '/inc/custom-post-types.php';
require_once get_template_directory() . '/inc/icons.php';
