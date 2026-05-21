<?php
/**
 * Main fallback template — used for the blog index.
 *
 * @package Executive_Founders
 */

get_header(); ?>

<main class="site-main" id="site-main" role="main">
    <section class="page-hero">
        <div class="container">
            <p class="eyebrow"><?php esc_html_e( 'Insights', 'executive-founders' ); ?></p>
            <h1><?php is_home() ? single_post_title() : esc_html_e( 'News & insights', 'executive-founders' ); ?></h1>
            <p class="page-lede"><?php esc_html_e( 'Perspectives on governance, transformation, leadership and operational scaling.', 'executive-founders' ); ?></p>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <?php if ( have_posts() ) : ?>
                <ul class="card-grid card-grid-3" role="list">
                    <?php while ( have_posts() ) : the_post(); ?>
                        <li><?php get_template_part( 'template-parts/post-card' ); ?></li>
                    <?php endwhile; ?>
                </ul>

                <nav class="pagination" aria-label="<?php esc_attr_e( 'Posts navigation', 'executive-founders' ); ?>">
                    <?php
                    the_posts_pagination( array(
                        'mid_size'  => 1,
                        'prev_text' => esc_html__( '← Newer', 'executive-founders' ),
                        'next_text' => esc_html__( 'Older →', 'executive-founders' ),
                    ) );
                    ?>
                </nav>
            <?php else : ?>
                <p class="empty-state"><?php esc_html_e( 'No posts yet. Check back soon for updates.', 'executive-founders' ); ?></p>
            <?php endif; ?>
        </div>
    </section>
</main>

<?php get_footer(); ?>
