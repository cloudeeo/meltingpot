<?php
/**
 * Template Name: About
 * Slug: about
 *
 * @package Executive_Founders
 */

get_header(); ?>

<main class="site-main" id="site-main" role="main">

    <section class="page-hero">
        <div class="container">
            <p class="eyebrow"><?php esc_html_e( 'About', 'executive-founders' ); ?></p>
            <h1><?php esc_html_e( 'We operate at leadership level, not at task level.', 'executive-founders' ); ?></h1>
            <p class="page-lede"><?php esc_html_e( 'Executive Founders is a strategic and operational advisory firm. We work with executives, founders and leadership teams to bring clarity, structure and governance to organisations navigating growth and change.', 'executive-founders' ); ?></p>
        </div>
    </section>

    <section class="section">
        <div class="container about-grid">
            <div class="about-content prose">
                <h2><?php esc_html_e( 'Who we are', 'executive-founders' ); ?></h2>
                <p><?php esc_html_e( 'Modern organisations do not fail because of lack of vision. They fail when governance, execution and organisational alignment do not scale at the same speed as complexity.', 'executive-founders' ); ?></p>
                <p><?php esc_html_e( 'We operate alongside leadership teams to help organisations structure transformation, coordinate execution and scale sustainably over time. Our work bridges strategy, governance and execution.', 'executive-founders' ); ?></p>

                <h2><?php esc_html_e( 'How we engage', 'executive-founders' ); ?></h2>
                <p><?php esc_html_e( 'We work through medium and long-term engagements focused on sustainable organisational evolution — not isolated deliverables. Where specialised competencies are required, we coordinate the right experts within a clear governance framework.', 'executive-founders' ); ?></p>

                <?php while ( have_posts() ) : the_post(); ?>
                    <?php if ( get_the_content() ) : ?>
                        <?php the_content(); ?>
                    <?php endif; ?>
                <?php endwhile; ?>
            </div>

            <aside class="about-side">
                <ul class="meta-list" role="list">
                    <li>
                        <h3><?php esc_html_e( 'Our mission', 'executive-founders' ); ?></h3>
                        <p><?php esc_html_e( 'Helping organisations scale operationally with clarity, structure and sustainable governance.', 'executive-founders' ); ?></p>
                    </li>
                    <li>
                        <h3><?php esc_html_e( 'Our approach', 'executive-founders' ); ?></h3>
                        <p><?php esc_html_e( 'Advisory-led, execution-oriented partnerships at leadership level for lasting organisational impact.', 'executive-founders' ); ?></p>
                    </li>
                    <li>
                        <h3><?php esc_html_e( 'Where we focus', 'executive-founders' ); ?></h3>
                        <p><?php esc_html_e( 'Consulting & advisory, fintech & technology, digital platforms, innovation-driven businesses.', 'executive-founders' ); ?></p>
                    </li>
                </ul>
            </aside>
        </div>
    </section>

</main>

<?php get_footer(); ?>
