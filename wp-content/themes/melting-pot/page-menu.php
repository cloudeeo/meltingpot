<?php
/**
 * Template Name: Menu
 * Slug: menu
 *
 * Menu / Services page template.
 *
 * @package Melting_Pot
 */

get_header(); ?>

<main class="site-main">

    <!-- Menu Intro Section -->
    <section class="menu-intro">
        <div class="container">
            <h1><?php esc_html_e( 'Elevate Your Content with Our Menu of Services.', 'melting-pot' ); ?></h1>

            <p class="menu-intro-subtitle">
                <?php esc_html_e(
                    'From short-form animations to cinematic AI productions, social posts, carousels, and custom visuals — design your own content mix with our flexible menu.',
                    'melting-pot'
                ); ?>
            </p>

            <div class="menu-categories-overview">
                <div class="menu-cat-item">
                    <h3><?php esc_html_e( 'Small Bites', 'melting-pot' ); ?></h3>
                    <p><?php esc_html_e( 'Quick, creative content packs to boost your online presence.', 'melting-pot' ); ?></p>
                </div>
                <div class="menu-cat-item">
                    <h3><?php esc_html_e( 'Mains', 'melting-pot' ); ?></h3>
                    <p><?php esc_html_e( 'Premium, tailored content packages designed to drive growth and authority.', 'melting-pot' ); ?></p>
                </div>
                <div class="menu-cat-item">
                    <h3><?php esc_html_e( 'Sides', 'melting-pot' ); ?></h3>
                    <p><?php esc_html_e( 'Add-ons to refine and enhance your content strategy.', 'melting-pot' ); ?></p>
                </div>
            </div>

            <?php
            $pdf_url = get_theme_mod( 'mp_menu_pdf_url', '' );
            if ( $pdf_url ) : ?>
                <a href="<?php echo esc_url( $pdf_url ); ?>" class="btn btn-primary" download>
                    <?php esc_html_e( 'Download Our Menu', 'melting-pot' ); ?>
                </a>
            <?php else : ?>
                <a href="#menu-details" class="btn btn-primary">
                    <?php esc_html_e( 'Download Our Menu', 'melting-pot' ); ?>
                </a>
            <?php endif; ?>
        </div>
    </section>

    <!-- Menu Items (from CPT) -->
    <section class="menu-details" id="menu-details">
        <div class="container">
            <?php
            $categories = get_terms( array(
                'taxonomy'   => 'menu_category',
                'hide_empty' => true,
            ) );

            if ( ! empty( $categories ) && ! is_wp_error( $categories ) ) :
                foreach ( $categories as $category ) : ?>
                    <div class="menu-category-block">
                        <h2 class="menu-category-title"><?php echo esc_html( $category->name ); ?></h2>
                        <?php if ( $category->description ) : ?>
                            <p class="menu-category-desc"><?php echo esc_html( $category->description ); ?></p>
                        <?php endif; ?>

                        <div class="menu-items-list">
                            <?php
                            $items = new WP_Query( array(
                                'post_type'      => 'mp_menu_item',
                                'posts_per_page' => -1,
                                'orderby'        => 'menu_order',
                                'order'          => 'ASC',
                                'tax_query'      => array(
                                    array(
                                        'taxonomy' => 'menu_category',
                                        'field'    => 'term_id',
                                        'terms'    => $category->term_id,
                                    ),
                                ),
                            ) );

                            if ( $items->have_posts() ) :
                                while ( $items->have_posts() ) : $items->the_post();
                                    get_template_part( 'template-parts/menu-item-card' );
                                endwhile;
                                wp_reset_postdata();
                            endif;
                            ?>
                        </div>
                    </div>
                <?php endforeach;
            else : ?>
                <div class="menu-empty">
                    <p><?php esc_html_e( 'Menu items will appear here once added via the WordPress admin.', 'melting-pot' ); ?></p>
                </div>
            <?php endif; ?>
        </div>
    </section>

</main>

<?php get_footer(); ?>
