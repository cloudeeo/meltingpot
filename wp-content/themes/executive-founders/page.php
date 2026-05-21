<?php
/**
 * Default page template.
 *
 * @package Executive_Founders
 */

get_header(); ?>

<main class="site-main" id="site-main" role="main">
    <?php while ( have_posts() ) : the_post(); ?>
        <section class="page-hero">
            <div class="container">
                <h1><?php the_title(); ?></h1>
                <?php if ( has_excerpt() ) : ?>
                    <div class="page-lede"><?php the_excerpt(); ?></div>
                <?php endif; ?>
            </div>
        </section>

        <section class="section">
            <div class="container prose">
                <?php the_content(); ?>
            </div>
        </section>
    <?php endwhile; ?>
</main>

<?php get_footer(); ?>
