<?php
/**
 * Search results template.
 *
 * @package Executive_Founders
 */

get_header(); ?>

<main class="site-main" id="site-main" role="main">
    <section class="page-hero">
        <div class="container">
            <p class="eyebrow"><?php esc_html_e( 'Search', 'executive-founders' ); ?></p>
            <h1>
                <?php
                /* translators: %s: search query. */
                printf( esc_html__( 'Results for: %s', 'executive-founders' ), '<span>' . esc_html( get_search_query() ) . '</span>' );
                ?>
            </h1>
            <div class="page-lede"><?php get_search_form(); ?></div>
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

                <?php the_posts_pagination( array( 'mid_size' => 1 ) ); ?>
            <?php else : ?>
                <p class="empty-state"><?php esc_html_e( 'No results found. Try a different search term.', 'executive-founders' ); ?></p>
            <?php endif; ?>
        </div>
    </section>
</main>

<?php get_footer(); ?>
