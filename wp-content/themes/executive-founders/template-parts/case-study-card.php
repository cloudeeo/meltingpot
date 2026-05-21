<?php
/**
 * Template part: case study card.
 *
 * @package Executive_Founders
 */

$client = get_post_meta( get_the_ID(), '_ef_cs_client', true );
$year   = get_post_meta( get_the_ID(), '_ef_cs_year', true );
$sector = get_the_terms( get_the_ID(), 'ef_sector' );
?>
<article <?php post_class( 'card card-case' ); ?>>
    <?php if ( has_post_thumbnail() ) : ?>
        <a class="card-media" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
            <?php the_post_thumbnail( 'ef-card', array( 'loading' => 'lazy', 'decoding' => 'async' ) ); ?>
        </a>
    <?php endif; ?>

    <div class="card-body">
        <p class="card-meta">
            <?php if ( $sector && ! is_wp_error( $sector ) ) : ?>
                <span class="card-tag"><?php echo esc_html( $sector[0]->name ); ?></span>
            <?php endif; ?>
            <?php if ( $year ) : ?>
                <span class="card-year"><?php echo esc_html( $year ); ?></span>
            <?php endif; ?>
        </p>
        <h3 class="card-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
        <?php if ( $client ) : ?>
            <p class="card-client"><?php echo esc_html( $client ); ?></p>
        <?php endif; ?>
        <p class="card-excerpt"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 28, '…' ) ); ?></p>
        <p class="card-link"><a href="<?php the_permalink(); ?>"><?php esc_html_e( 'Read engagement', 'executive-founders' ); ?> →</a></p>
    </div>
</article>
