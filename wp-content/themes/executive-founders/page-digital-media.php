<?php
/**
 * Template Name: Digital Media
 * Slug: digital-media
 *
 * Displays videos from the ef_video CPT.
 *
 * @package Executive_Founders
 */

get_header(); ?>

<main class="site-main" id="site-main" role="main">

    <section class="page-hero">
        <div class="container">
            <p class="eyebrow"><?php esc_html_e( 'Digital Media', 'executive-founders' ); ?></p>
            <h1><?php esc_html_e( 'Conversations on governance and transformation', 'executive-founders' ); ?></h1>
            <p class="page-lede"><?php esc_html_e( 'Short-form videos, talks and interviews on the operational realities of scaling, governance gaps, transformation pressure and AI adoption.', 'executive-founders' ); ?></p>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <?php
            $videos = new WP_Query( array(
                'post_type'      => 'ef_video',
                'posts_per_page' => 12,
                'orderby'        => 'menu_order date',
                'order'          => 'DESC',
            ) );

            if ( $videos->have_posts() ) : ?>
                <ul class="video-grid" role="list">
                    <?php while ( $videos->have_posts() ) : $videos->the_post(); ?>
                        <li><?php get_template_part( 'template-parts/video-card' ); ?></li>
                    <?php endwhile; ?>
                </ul>
            <?php
                wp_reset_postdata();
            else : ?>
                <div class="empty-state empty-state-callout">
                    <h2><?php esc_html_e( 'Videos coming soon', 'executive-founders' ); ?></h2>
                    <p><?php esc_html_e( 'We are producing a library of short-form videos on governance, transformation and AI adoption. Subscribe to our newsletter to be notified when new content is published.', 'executive-founders' ); ?></p>
                    <a class="btn btn-primary" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Stay informed', 'executive-founders' ); ?></a>
                </div>
            <?php endif; ?>

            <?php while ( have_posts() ) : the_post(); ?>
                <?php if ( get_the_content() ) : ?>
                    <div class="prose"><?php the_content(); ?></div>
                <?php endif; ?>
            <?php endwhile; ?>
        </div>
    </section>

</main>

<?php get_footer(); ?>
