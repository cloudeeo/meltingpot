<?php
/**
 * The header template.
 *
 * @package Melting_Pot
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header" id="site-header">
    <div class="container header-inner">
        <div class="site-branding">
            <?php if ( has_custom_logo() ) : ?>
                <?php the_custom_logo(); ?>
            <?php else : ?>
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-logo-text">
                    <span class="logo-icon">🍲</span>
                    <span class="logo-text">
                        <strong>MELTING POT</strong>
                        <small>by executive founders</small>
                    </span>
                </a>
            <?php endif; ?>
        </div>

        <button class="menu-toggle" id="menu-toggle" aria-label="<?php esc_attr_e( 'Toggle navigation', 'melting-pot' ); ?>" aria-expanded="false">
            <span class="hamburger"></span>
        </button>

        <nav class="main-navigation" id="main-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Primary Menu', 'melting-pot' ); ?>">
            <?php
            wp_nav_menu( array(
                'theme_location' => 'primary',
                'menu_class'     => 'nav-menu',
                'container'      => false,
                'fallback_cb'    => 'melting_pot_fallback_menu',
            ) );
            ?>
        </nav>
    </div>
</header>

<?php
/**
 * Fallback menu if no menu is assigned.
 */
function melting_pot_fallback_menu() {
    $pages = array(
        'Home'      => home_url( '/' ),
        'About Us'  => home_url( '/about-us/' ),
        'Menu'      => home_url( '/menu/' ),
        'Portfolio' => home_url( '/portfolio/' ),
        'Contact'   => home_url( '/contact/' ),
    );
    echo '<ul class="nav-menu">';
    foreach ( $pages as $label => $url ) {
        echo '<li><a href="' . esc_url( $url ) . '">' . esc_html( $label ) . '</a></li>';
    }
    echo '</ul>';
}
?>
