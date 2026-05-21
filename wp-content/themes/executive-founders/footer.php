<?php
/**
 * The footer template.
 *
 * @package Executive_Founders
 */
?>

<footer class="site-footer" role="contentinfo">
    <div class="container footer-grid">
        <div class="footer-brand">
            <span class="logo-mark" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" focusable="false">
                    <rect width="36" height="36" rx="4" fill="#E0394E"/>
                    <text x="18" y="24" text-anchor="middle" font-family="Inter, sans-serif" font-size="18" font-weight="800" fill="#ffffff">ex.</text>
                </svg>
            </span>
            <div class="footer-brand-text">
                <strong><?php echo esc_html( get_bloginfo( 'name' ) ); ?></strong>
                <p><?php esc_html_e( 'Governance, strategic advisory and operational leadership for modern organisations.', 'executive-founders' ); ?></p>
            </div>
        </div>

        <div class="footer-col">
            <h2 class="footer-heading"><?php esc_html_e( 'Explore', 'executive-founders' ); ?></h2>
            <?php
            if ( has_nav_menu( 'footer' ) ) {
                wp_nav_menu( array(
                    'theme_location' => 'footer',
                    'menu_class'     => 'footer-menu',
                    'container'      => false,
                    'depth'          => 1,
                ) );
            } else {
                ?>
                <ul class="footer-menu">
                    <li><a href="<?php echo esc_url( home_url( '/services/' ) ); ?>"><?php esc_html_e( 'Services', 'executive-founders' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/portfolio/' ) ); ?>"><?php esc_html_e( 'Portfolio', 'executive-founders' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/digital-media/' ) ); ?>"><?php esc_html_e( 'Digital Media', 'executive-founders' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/news/' ) ); ?>"><?php esc_html_e( 'News', 'executive-founders' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/about/' ) ); ?>"><?php esc_html_e( 'About', 'executive-founders' ); ?></a></li>
                </ul>
                <?php
            }
            ?>
        </div>

        <div class="footer-col">
            <h2 class="footer-heading"><?php esc_html_e( 'Contact', 'executive-founders' ); ?></h2>
            <ul class="footer-contact">
                <?php $email = get_theme_mod( 'ef_contact_email', 'info@executivefounders.com' ); ?>
                <?php if ( $email ) : ?>
                    <li><a href="mailto:<?php echo esc_attr( antispambot( $email ) ); ?>"><?php echo esc_html( antispambot( $email ) ); ?></a></li>
                <?php endif; ?>
                <?php $address = get_theme_mod( 'ef_contact_address', '' ); ?>
                <?php if ( $address ) : ?>
                    <li><?php echo wp_kses_post( nl2br( esc_html( $address ) ) ); ?></li>
                <?php endif; ?>
            </ul>

            <ul class="footer-social" aria-label="<?php esc_attr_e( 'Social links', 'executive-founders' ); ?>">
                <?php
                $socials = array(
                    'linkedin' => array( 'label' => 'LinkedIn', 'mod' => 'ef_social_linkedin' ),
                    'youtube'  => array( 'label' => 'YouTube',  'mod' => 'ef_social_youtube' ),
                    'twitter'  => array( 'label' => 'X / Twitter', 'mod' => 'ef_social_twitter' ),
                );
                foreach ( $socials as $key => $social ) :
                    $url = get_theme_mod( $social['mod'], '' );
                    if ( ! $url ) {
                        continue;
                    }
                    ?>
                    <li>
                        <a href="<?php echo esc_url( $url ); ?>" rel="me noopener" target="_blank">
                            <?php echo esc_html( $social['label'] ); ?>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    </div>

    <div class="container footer-base">
        <p class="footer-copy">&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php echo esc_html( get_bloginfo( 'name' ) ); ?>. <?php esc_html_e( 'All rights reserved.', 'executive-founders' ); ?></p>
        <p class="footer-tag"><?php esc_html_e( 'We operate at leadership level, not at task level.', 'executive-founders' ); ?></p>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
