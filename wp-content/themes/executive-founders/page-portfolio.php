<?php
/**
 * Template Name: Portfolio
 * Slug: portfolio
 *
 * Displays case studies from the ef_case_study CPT.
 *
 * @package Executive_Founders
 */

get_header(); ?>

<main class="site-main" id="site-main" role="main">

    <section class="page-hero">
        <div class="container">
            <p class="eyebrow"><?php esc_html_e( 'Portfolio', 'executive-founders' ); ?></p>
            <h1><?php esc_html_e( 'Selected engagements', 'executive-founders' ); ?></h1>
            <p class="page-lede"><?php esc_html_e( 'A view into the organisations we partner with — governance redesigns, transformation programmes and scaling initiatives across consulting, fintech, technology and digital platforms.', 'executive-founders' ); ?></p>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <?php
            $case_studies = new WP_Query( array(
                'post_type'      => 'ef_case_study',
                'posts_per_page' => 12,
                'orderby'        => 'menu_order date',
                'order'          => 'DESC',
            ) );

            if ( $case_studies->have_posts() ) : ?>
                <ul class="card-grid card-grid-2" role="list">
                    <?php while ( $case_studies->have_posts() ) : $case_studies->the_post(); ?>
                        <li><?php get_template_part( 'template-parts/case-study-card' ); ?></li>
                    <?php endwhile; ?>
                </ul>
            <?php
                wp_reset_postdata();
            else : ?>
                <div class="empty-state empty-state-callout">
                    <h2><?php esc_html_e( 'Case studies coming soon', 'executive-founders' ); ?></h2>
                    <p><?php esc_html_e( 'We are preparing a curated selection of engagements to share publicly. In the meantime, we are happy to discuss relevant references on a confidential basis.', 'executive-founders' ); ?></p>
                    <a class="btn btn-primary" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Request references', 'executive-founders' ); ?></a>
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
