<?php
/**
 * Archive template (categories, tags, custom post type archives).
 *
 * @package Executive_Founders
 */

get_header(); ?>

<main class="site-main" id="site-main" role="main">
    <section class="page-hero">
        <div class="container">
            <p class="eyebrow"><?php echo esc_html( post_type_archive_title( '', false ) ?: single_term_title( '', false ) ); ?></p>
            <h1><?php the_archive_title(); ?></h1>
            <?php
            $desc = get_the_archive_description();
            if ( $desc ) {
                echo '<div class="page-lede">' . wp_kses_post( $desc ) . '</div>';
            }
            ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <?php if ( have_posts() ) : ?>
                <?php
                $is_video = is_post_type_archive( 'ef_video' ) || ( is_tax() && 'ef_video' === ( get_query_var( 'post_type' ) ?: '' ) );
                $is_case  = is_post_type_archive( 'ef_case_study' );
                $grid_classes = 'card-grid card-grid-3';
                if ( $is_video ) {
                    $grid_classes = 'video-grid';
                } elseif ( $is_case ) {
                    $grid_classes = 'card-grid card-grid-2';
                }
                ?>
                <ul class="<?php echo esc_attr( $grid_classes ); ?>" role="list">
                    <?php while ( have_posts() ) : the_post(); ?>
                        <li>
                            <?php
                            $post_type_current = get_post_type();
                            if ( 'ef_video' === $post_type_current ) {
                                get_template_part( 'template-parts/video-card' );
                            } elseif ( 'ef_case_study' === $post_type_current ) {
                                get_template_part( 'template-parts/case-study-card' );
                            } else {
                                get_template_part( 'template-parts/post-card' );
                            }
                            ?>
                        </li>
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
                <p class="empty-state"><?php esc_html_e( 'Nothing to show here yet.', 'executive-founders' ); ?></p>
            <?php endif; ?>
        </div>
    </section>
</main>

<?php get_footer(); ?>
