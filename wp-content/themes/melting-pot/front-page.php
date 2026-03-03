<?php
/**
 * Home page template (static front page).
 *
 * @package Melting_Pot
 */

get_header(); ?>

<main class="site-main">

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h1 class="hero-headline">
                <?php echo esc_html( get_theme_mod( 'mp_hero_headline', 'High-Impact Content That Gets Seen.' ) ); ?>
            </h1>

            <div class="hero-stats">
                <div class="stat-item">
                    <div class="stat-icon">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="24" r="22" stroke="#D94F4F" stroke-width="2" fill="none"/>
                            <path d="M16 24l4 4 8-8" stroke="#D94F4F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <p class="stat-text"><?php echo esc_html( get_theme_mod( 'mp_hero_stat_1', '1M+ Impressions Generated' ) ); ?></p>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="24" r="22" stroke="#D94F4F" stroke-width="2" fill="none"/>
                            <path d="M24 14v10l6 4" stroke="#D94F4F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <p class="stat-text"><?php echo esc_html( get_theme_mod( 'mp_hero_stat_2', 'Grow Your Profile Organically' ) ); ?></p>
                </div>
            </div>

            <a href="<?php echo esc_url( home_url( '/portfolio/' ) ); ?>" class="btn btn-primary">View Portfolio</a>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services">
        <div class="container">
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">
                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="4" y="8" width="48" height="34" rx="3" stroke="#333" stroke-width="2" fill="none"/>
                            <polygon points="23,18 23,34 35,26" fill="#D94F4F"/>
                            <line x1="4" y1="46" x2="52" y2="46" stroke="#333" stroke-width="2"/>
                        </svg>
                    </div>
                    <h3><?php esc_html_e( 'Cinematic AI Videos', 'melting-pot' ); ?></h3>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="12" y="4" width="32" height="48" rx="4" stroke="#333" stroke-width="2" fill="none"/>
                            <circle cx="28" cy="28" r="8" stroke="#D94F4F" stroke-width="2" fill="none"/>
                            <circle cx="28" cy="28" r="3" fill="#D94F4F"/>
                        </svg>
                    </div>
                    <h3><?php esc_html_e( 'Social Media Content', 'melting-pot' ); ?></h3>
                </div>
                <div class="service-card">
                    <div class="service-icon">
                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="28" cy="28" r="20" stroke="#333" stroke-width="2" fill="none"/>
                            <path d="M28 12 L32 24 L44 24 L34 32 L38 44 L28 36 L18 44 L22 32 L12 24 L24 24 Z" stroke="#D94F4F" stroke-width="1.5" fill="none"/>
                        </svg>
                    </div>
                    <h3><?php esc_html_e( 'Social Media Strategy', 'melting-pot' ); ?></h3>
                </div>
            </div>
        </div>
    </section>

</main>

<?php get_footer(); ?>
