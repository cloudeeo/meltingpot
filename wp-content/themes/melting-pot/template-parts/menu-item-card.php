<?php
/**
 * Template part for displaying a single menu item.
 *
 * @package Melting_Pot
 */

$price = get_post_meta( get_the_ID(), '_mp_price', true );
?>

<div class="menu-item-row">
    <div class="menu-item-info">
        <h4 class="menu-item-name"><?php the_title(); ?></h4>
        <?php if ( get_the_content() ) : ?>
            <p class="menu-item-description"><?php echo esc_html( wp_strip_all_tags( get_the_content() ) ); ?></p>
        <?php endif; ?>
    </div>
    <?php if ( $price ) : ?>
        <span class="menu-item-price"><?php echo esc_html( $price ); ?></span>
    <?php endif; ?>
</div>
