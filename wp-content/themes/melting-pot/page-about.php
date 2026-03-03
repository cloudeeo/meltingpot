<?php
/**
 * Template Name: About Us
 * Slug: about-us
 *
 * About Us page template.
 *
 * @package Melting_Pot
 */

get_header(); ?>

<main class="site-main">
    <section class="about-section">
        <div class="container about-grid">
            <div class="about-content">
                <h1><?php esc_html_e( 'Built for Impact', 'melting-pot' ); ?></h1>

                <p>
                    <?php esc_html_e(
                        'Melting Pot is a Swiss creative studio by Executive Founders, blending advanced AI production with deep social media expertise to deliver high-impact digital content.',
                        'melting-pot'
                    ); ?>
                </p>

                <p>
                    <?php esc_html_e(
                        'Our work draws on over a decade of experience and a proven track record — including 800M+ views on YouTube, 300K+ subscribers, and large audiences built across platforms.',
                        'melting-pot'
                    ); ?>
                </p>

                <p>
                    <?php esc_html_e(
                        'We focus on content that captures attention, builds authority, and drives measurable visibility.',
                        'melting-pot'
                    ); ?>
                </p>

                <?php
                // Allow page content from the editor to be displayed below
                while ( have_posts() ) :
                    the_post();
                    the_content();
                endwhile;
                ?>
            </div>
            <div class="about-illustration">
                <!-- Rocket illustration placeholder -->
                <svg width="200" height="260" viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="100" cy="240" rx="60" ry="12" fill="#f0f0f0"/>
                    <path d="M100 20 C100 20 140 80 140 160 C140 200 100 220 100 220 C100 220 60 200 60 160 C60 80 100 20 100 20Z" fill="#D94F4F" stroke="#333" stroke-width="2"/>
                    <circle cx="100" cy="120" r="16" fill="white" stroke="#333" stroke-width="2"/>
                    <circle cx="100" cy="120" r="8" fill="#2d2d7c"/>
                    <path d="M60 160 C60 160 40 170 35 190 L60 180Z" fill="#D94F4F" stroke="#333" stroke-width="1.5"/>
                    <path d="M140 160 C140 160 160 170 165 190 L140 180Z" fill="#D94F4F" stroke="#333" stroke-width="1.5"/>
                    <path d="M85 220 L80 250 L100 240 L120 250 L115 220" fill="#FF8C00" stroke="#333" stroke-width="1.5"/>
                </svg>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
