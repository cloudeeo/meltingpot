<?php
/**
 * Template Name: Portfolio
 * Slug: portfolio
 *
 * Portfolio page template.
 *
 * @package Melting_Pot
 */

get_header(); ?>

<main class="site-main">
    <section class="portfolio-section">
        <div class="container">
            <h1><?php esc_html_e( 'Portfolio', 'melting-pot' ); ?></h1>

            <div class="portfolio-grid">
                <div class="portfolio-card">
                    <div class="portfolio-card-icon">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="10" y="16" width="60" height="42" rx="4" stroke="#333" stroke-width="2" fill="#fef3f3"/>
                            <polygon points="34,28 34,48 50,38" fill="#D94F4F"/>
                            <rect x="6" y="60" width="14" height="10" rx="2" fill="#2d2d7c"/>
                            <rect x="22" y="58" width="8" height="12" rx="1" fill="#D94F4F"/>
                            <rect x="52" y="62" width="22" height="6" rx="2" fill="#ffc107"/>
                        </svg>
                    </div>
                    <h3><?php esc_html_e( 'Cinematic AI Videos', 'melting-pot' ); ?></h3>
                </div>

                <div class="portfolio-card">
                    <div class="portfolio-card-icon">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="20" y="6" width="40" height="68" rx="6" stroke="#333" stroke-width="2" fill="#fef3f3"/>
                            <rect x="26" y="18" width="28" height="36" rx="2" fill="#ffe0b2"/>
                            <circle cx="40" cy="36" r="6" fill="#D94F4F"/>
                            <circle cx="40" cy="64" r="4" stroke="#333" stroke-width="1.5" fill="none"/>
                        </svg>
                    </div>
                    <h3><?php esc_html_e( 'Social Media Posts', 'melting-pot' ); ?></h3>
                </div>

                <div class="portfolio-card">
                    <div class="portfolio-card-icon">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="10" y="10" width="50" height="60" rx="3" stroke="#333" stroke-width="2" fill="#fef3f3"/>
                            <line x1="18" y1="24" x2="52" y2="24" stroke="#ccc" stroke-width="1.5"/>
                            <line x1="18" y1="32" x2="48" y2="32" stroke="#ccc" stroke-width="1.5"/>
                            <line x1="18" y1="40" x2="44" y2="40" stroke="#ccc" stroke-width="1.5"/>
                            <path d="M56 16 L70 50 L66 52 L52 18 Z" fill="#ffc107" stroke="#333" stroke-width="1.5"/>
                            <path d="M70 50 L66 52 L64 58 Z" fill="#D94F4F"/>
                        </svg>
                    </div>
                    <h3><?php esc_html_e( 'Satirical Vignettes', 'melting-pot' ); ?></h3>
                </div>
            </div>

            <?php
            // Allow page content from the editor to be displayed below
            while ( have_posts() ) :
                the_post();
                the_content();
            endwhile;
            ?>
        </div>
    </section>
</main>

<?php get_footer(); ?>
