<?php
/**
 * Template part: video card.
 *
 * @package Executive_Founders
 */

$video_url = get_post_meta( get_the_ID(), '_ef_video_url', true );
$duration  = get_post_meta( get_the_ID(), '_ef_video_duration', true );
?>
<article <?php post_class( 'card card-video' ); ?>>
    <a class="card-media card-media-video" href="<?php echo esc_url( $video_url ?: get_permalink() ); ?>"<?php echo $video_url ? ' target="_blank" rel="noopener"' : ''; ?>>
        <?php if ( has_post_thumbnail() ) : ?>
            <?php the_post_thumbnail( 'ef-card', array( 'loading' => 'lazy', 'decoding' => 'async', 'alt' => '' ) ); ?>
        <?php else : ?>
            <span class="video-placeholder" aria-hidden="true"></span>
        <?php endif; ?>
        <span class="video-play" aria-hidden="true">
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" focusable="false">
                <circle cx="24" cy="24" r="22" fill="rgba(15, 23, 42, 0.85)"/>
                <path d="M20 16l14 8-14 8z" fill="#ffffff"/>
            </svg>
        </span>
        <?php if ( $duration ) : ?>
            <span class="video-duration"><?php echo esc_html( $duration ); ?></span>
        <?php endif; ?>
    </a>
    <div class="card-body">
        <h3 class="card-title">
            <a href="<?php echo esc_url( $video_url ?: get_permalink() ); ?>"<?php echo $video_url ? ' target="_blank" rel="noopener"' : ''; ?>>
                <?php the_title(); ?>
            </a>
        </h3>
        <p class="card-excerpt"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 20, '…' ) ); ?></p>
    </div>
</article>
