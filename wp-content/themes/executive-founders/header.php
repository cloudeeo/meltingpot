<?php
/**
 * The header template.
 *
 * @package Executive_Founders
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#0F172A">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link screen-reader-text" href="#site-main"><?php esc_html_e( 'Skip to content', 'executive-founders' ); ?></a>

<header class="site-header" id="site-header" role="banner">
    <div class="container header-inner">
        <div class="site-branding">
            <?php if ( has_custom_logo() ) : ?>
                <?php the_custom_logo(); ?>
            <?php else : ?>
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-logo" rel="home" aria-label="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?> — <?php esc_attr_e( 'home', 'executive-founders' ); ?>">
                    <span class="logo-mark" aria-hidden="true">
                        <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" focusable="false">
                            <rect width="36" height="36" rx="4" fill="#E0394E"/>
                            <text x="18" y="24" text-anchor="middle" font-family="Inter, sans-serif" font-size="18" font-weight="800" fill="#ffffff">ex.</text>
                        </svg>
                    </span>
                    <span class="logo-text">
                        <strong><?php echo esc_html( get_bloginfo( 'name' ) ); ?></strong>
                        <?php $tagline = get_bloginfo( 'description', 'display' ); ?>
                        <?php if ( $tagline ) : ?>
                            <small><?php echo esc_html( $tagline ); ?></small>
                        <?php endif; ?>
                    </span>
                </a>
            <?php endif; ?>
        </div>

        <button class="menu-toggle" id="menu-toggle" aria-label="<?php esc_attr_e( 'Toggle navigation', 'executive-founders' ); ?>" aria-controls="main-navigation" aria-expanded="false">
            <span class="hamburger" aria-hidden="true"></span>
        </button>

        <nav class="main-navigation" id="main-navigation" aria-label="<?php esc_attr_e( 'Primary Menu', 'executive-founders' ); ?>">
            <?php
            wp_nav_menu( array(
                'theme_location' => 'primary',
                'menu_class'     => 'nav-menu',
                'container'      => false,
                'depth'          => 2,
                'fallback_cb'    => 'executive_founders_fallback_menu',
            ) );
            ?>
            <a class="nav-cta" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">
                <?php esc_html_e( 'Get in touch', 'executive-founders' ); ?>
            </a>
        </nav>
    </div>
</header>
