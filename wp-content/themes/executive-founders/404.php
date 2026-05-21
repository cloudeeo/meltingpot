<?php
/**
 * 404 template.
 *
 * @package Executive_Founders
 */

get_header(); ?>

<main class="site-main" id="site-main" role="main">
    <section class="page-hero">
        <div class="container">
            <p class="eyebrow"><?php esc_html_e( 'Not found', 'executive-founders' ); ?></p>
            <h1><?php esc_html_e( "This page couldn't be located.", 'executive-founders' ); ?></h1>
            <p class="page-lede"><?php esc_html_e( 'The page you were looking for may have moved or been retired. Try searching or return to the homepage.', 'executive-founders' ); ?></p>
            <div class="hero-cta">
                <a class="btn btn-primary" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Back to home', 'executive-founders' ); ?></a>
                <a class="btn btn-ghost" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Contact us', 'executive-founders' ); ?></a>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container"><?php get_search_form(); ?></div>
    </section>
</main>

<?php get_footer(); ?>
