<?php
/**
 * Single post template.
 *
 * @package Executive_Founders
 */

get_header(); ?>

<main class="site-main" id="site-main" role="main">
    <?php while ( have_posts() ) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class( 'single-post' ); ?>>
            <header class="single-hero">
                <div class="container">
                    <p class="eyebrow"><?php echo esc_html( get_the_date() ); ?> · <?php echo esc_html( get_the_author() ); ?></p>
                    <h1 class="single-title"><?php the_title(); ?></h1>
                    <?php if ( has_excerpt() ) : ?>
                        <div class="single-lede"><?php the_excerpt(); ?></div>
                    <?php endif; ?>
                </div>
            </header>

            <?php if ( has_post_thumbnail() ) : ?>
                <figure class="single-featured">
                    <?php the_post_thumbnail( 'ef-hero', array( 'loading' => 'eager', 'decoding' => 'async' ) ); ?>
                </figure>
            <?php endif; ?>

            <div class="container single-body">
                <div class="prose">
                    <?php
                    the_content();
                    wp_link_pages( array(
                        'before' => '<nav class="page-links">' . esc_html__( 'Pages:', 'executive-founders' ),
                        'after'  => '</nav>',
                    ) );
                    ?>
                </div>

                <?php
                $tags = get_the_tag_list( '<ul class="tag-list"><li>', '</li><li>', '</li></ul>' );
                if ( $tags ) {
                    echo $tags; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                }
                ?>
            </div>
        </article>

        <?php if ( comments_open() || get_comments_number() ) : ?>
            <section class="container comments-section">
                <?php comments_template(); ?>
            </section>
        <?php endif; ?>
    <?php endwhile; ?>
</main>

<?php get_footer(); ?>
