<?php
/**
 * Template Name: News
 * Slug: news
 *
 * Lists latest blog posts.
 *
 * @package Executive_Founders
 */

get_header(); ?>

<main class="site-main" id="site-main" role="main">

    <section class="page-hero">
        <div class="container">
            <p class="eyebrow"><?php esc_html_e( 'News & insights', 'executive-founders' ); ?></p>
            <h1><?php esc_html_e( 'Perspectives from the field', 'executive-founders' ); ?></h1>
            <p class="page-lede"><?php esc_html_e( 'Articles, observations and frameworks on governance, transformation, leadership and operational scaling.', 'executive-founders' ); ?></p>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <?php
            $paged = max( 1, (int) get_query_var( 'paged' ) );
            $news = new WP_Query( array(
                'post_type'      => 'post',
                'posts_per_page' => 9,
                'paged'          => $paged,
                'ignore_sticky_posts' => true,
            ) );

            if ( $news->have_posts() ) : ?>
                <ul class="card-grid card-grid-3" role="list">
                    <?php while ( $news->have_posts() ) : $news->the_post(); ?>
                        <li><?php get_template_part( 'template-parts/post-card' ); ?></li>
                    <?php endwhile; ?>
                </ul>

                <nav class="pagination" aria-label="<?php esc_attr_e( 'Posts navigation', 'executive-founders' ); ?>">
                    <?php
                    echo paginate_links( array(
                        'total'     => $news->max_num_pages,
                        'current'   => $paged,
                        'mid_size'  => 1,
                        'prev_text' => esc_html__( '← Newer', 'executive-founders' ),
                        'next_text' => esc_html__( 'Older →', 'executive-founders' ),
                    ) );
                    ?>
                </nav>
            <?php
                wp_reset_postdata();
            else : ?>
                <p class="empty-state"><?php esc_html_e( 'No posts yet. Check back soon for updates.', 'executive-founders' ); ?></p>
            <?php endif; ?>
        </div>
    </section>

</main>

<?php get_footer(); ?>
