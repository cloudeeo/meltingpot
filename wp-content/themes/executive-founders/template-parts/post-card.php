<?php
/**
 * Template part: blog post card.
 *
 * @package Executive_Founders
 */
?>
<article <?php post_class( 'card card-post' ); ?>>
    <?php if ( has_post_thumbnail() ) : ?>
        <a class="card-media" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
            <?php the_post_thumbnail( 'ef-card', array( 'loading' => 'lazy', 'decoding' => 'async' ) ); ?>
        </a>
    <?php endif; ?>

    <div class="card-body">
        <p class="card-meta"><time datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>"><?php echo esc_html( get_the_date() ); ?></time></p>
        <h3 class="card-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
        <p class="card-excerpt"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 22, '…' ) ); ?></p>
        <p class="card-link"><a href="<?php the_permalink(); ?>"><?php esc_html_e( 'Read article', 'executive-founders' ); ?> →</a></p>
    </div>
</article>
