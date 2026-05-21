<?php
/**
 * Front page template — adapts the Executive Founders strategic brochure
 * into a single, narrative landing experience.
 *
 * @package Executive_Founders
 */

get_header(); ?>

<main class="site-main" id="site-main" role="main">

    <!-- ====== Hero ====== -->
    <section class="hero" aria-labelledby="hero-title">
        <div class="container hero-inner">
            <p class="eyebrow"><?php esc_html_e( 'Governance · Strategic Advisory · Organisational Transformation', 'executive-founders' ); ?></p>
            <h1 id="hero-title" class="hero-title">
                <?php echo esc_html( get_theme_mod( 'ef_hero_title', 'Executive Founders' ) ); ?>
            </h1>
            <p class="hero-lede">
                <?php echo esc_html( get_theme_mod( 'ef_hero_lede', 'We help organisations, executives and leadership teams scale with clarity, structure and operational excellence.' ) ); ?>
            </p>
            <div class="hero-cta">
                <a class="btn btn-primary" href="<?php echo esc_url( home_url( '/services/' ) ); ?>">
                    <?php esc_html_e( 'Explore our services', 'executive-founders' ); ?>
                </a>
                <a class="btn btn-ghost" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">
                    <?php esc_html_e( 'Start a conversation', 'executive-founders' ); ?>
                </a>
            </div>
        </div>
        <div class="container hero-divider" aria-hidden="true"></div>
    </section>

    <!-- ====== Approach ====== -->
    <section class="section section-light" aria-labelledby="approach-title">
        <div class="container">
            <header class="section-head">
                <h2 id="approach-title"><?php esc_html_e( 'Strategic advisory partners for organisations in growth and transformation', 'executive-founders' ); ?></h2>
                <p class="section-lede">
                    <?php esc_html_e( 'Executive Founders supports companies navigating complex and evolving environments. We work alongside executives, founders and leadership teams to strengthen governance, structure transformation initiatives and create scalable operational models.', 'executive-founders' ); ?>
                </p>
            </header>

            <ul class="card-grid card-grid-4" role="list">
                <?php
                $approach = array(
                    array(
                        'title' => __( 'Organisational Growth', 'executive-founders' ),
                        'body'  => __( 'Scaling structures and teams without losing operational coherence.', 'executive-founders' ),
                    ),
                    array(
                        'title' => __( 'Operational Complexity', 'executive-founders' ),
                        'body'  => __( 'Reducing friction and improving alignment across functions.', 'executive-founders' ),
                    ),
                    array(
                        'title' => __( 'Strategic Transformation', 'executive-founders' ),
                        'body'  => __( 'Structuring and guiding change initiatives from strategy to execution.', 'executive-founders' ),
                    ),
                    array(
                        'title' => __( 'Leadership Alignment', 'executive-founders' ),
                        'body'  => __( 'Coordinating decision-making and execution at leadership level.', 'executive-founders' ),
                    ),
                );
                foreach ( $approach as $item ) : ?>
                    <li class="card card-soft">
                        <h3><?php echo esc_html( $item['title'] ); ?></h3>
                        <p><?php echo esc_html( $item['body'] ); ?></p>
                    </li>
                <?php endforeach; ?>
            </ul>

            <blockquote class="pullquote">
                <p><?php esc_html_e( 'Our role is to bridge strategy, governance and execution — operating at leadership level, helping organisations structure and guide transformation sustainably over time.', 'executive-founders' ); ?></p>
            </blockquote>
        </div>
    </section>

    <!-- ====== Services ====== -->
    <section class="section" aria-labelledby="services-title">
        <div class="container">
            <header class="section-head">
                <h2 id="services-title"><?php esc_html_e( 'Transforming complexity into structured execution', 'executive-founders' ); ?></h2>
                <p class="section-lede"><?php esc_html_e( 'Five areas where we create lasting organisational impact.', 'executive-founders' ); ?></p>
            </header>

            <ul class="service-list" role="list">
                <?php
                $services = array(
                    array(
                        'title' => __( 'Strategic Advisory', 'executive-founders' ),
                        'body'  => __( 'Guiding leadership through complexity and change.', 'executive-founders' ),
                        'icon'  => 'advisory',
                    ),
                    array(
                        'title' => __( 'Governance & Operational Leadership', 'executive-founders' ),
                        'body'  => __( 'Structuring accountability and decision-making.', 'executive-founders' ),
                        'icon'  => 'governance',
                    ),
                    array(
                        'title' => __( 'PMO & Programme Governance', 'executive-founders' ),
                        'body'  => __( 'Coordinating execution across initiatives.', 'executive-founders' ),
                        'icon'  => 'pmo',
                    ),
                    array(
                        'title' => __( 'Organisational Scaling', 'executive-founders' ),
                        'body'  => __( 'Building structures that grow with the business.', 'executive-founders' ),
                        'icon'  => 'scale',
                    ),
                    array(
                        'title' => __( 'AI Governance & Adoption', 'executive-founders' ),
                        'body'  => __( 'Governing AI integration responsibly.', 'executive-founders' ),
                        'icon'  => 'ai',
                    ),
                );
                foreach ( $services as $svc ) : ?>
                    <li class="service-item">
                        <span class="service-icon" aria-hidden="true">
                            <?php executive_founders_service_icon( $svc['icon'] ); ?>
                        </span>
                        <div>
                            <h3><?php echo esc_html( $svc['title'] ); ?></h3>
                            <p><?php echo esc_html( $svc['body'] ); ?></p>
                        </div>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    </section>

    <!-- ====== Advisory-led, execution-oriented ====== -->
    <section class="section section-split" aria-labelledby="model-title">
        <div class="container split-grid">
            <div class="split-content">
                <p class="eyebrow"><?php esc_html_e( 'Our model', 'executive-founders' ); ?></p>
                <h2 id="model-title"><?php esc_html_e( 'Advisory-led, execution-oriented', 'executive-founders' ); ?></h2>
                <p>
                    <?php esc_html_e( 'Executive Founders operates alongside leadership teams as a strategic and operational advisory partner — not to replace internal teams or provide isolated operational services.', 'executive-founders' ); ?>
                </p>

                <div class="dual-list">
                    <div>
                        <h3><?php esc_html_e( 'We help organisations', 'executive-founders' ); ?></h3>
                        <ul>
                            <li><?php esc_html_e( 'Structure transformation initiatives', 'executive-founders' ); ?></li>
                            <li><?php esc_html_e( 'Strengthen governance', 'executive-founders' ); ?></li>
                            <li><?php esc_html_e( 'Coordinate execution', 'executive-founders' ); ?></li>
                            <li><?php esc_html_e( 'Align teams and priorities', 'executive-founders' ); ?></li>
                            <li><?php esc_html_e( 'Guide organisational change', 'executive-founders' ); ?></li>
                            <li><?php esc_html_e( 'Accelerate decision-making', 'executive-founders' ); ?></li>
                        </ul>
                    </div>
                    <div>
                        <h3><?php esc_html_e( 'Our role is to', 'executive-founders' ); ?></h3>
                        <ul>
                            <li><?php esc_html_e( 'Provide direction', 'executive-founders' ); ?></li>
                            <li><?php esc_html_e( 'Create operational structure', 'executive-founders' ); ?></li>
                            <li><?php esc_html_e( 'Orchestrate execution', 'executive-founders' ); ?></li>
                            <li><?php esc_html_e( 'Coordinate the right expertise when needed', 'executive-founders' ); ?></li>
                            <li><?php esc_html_e( 'Move initiatives effectively from strategy to execution', 'executive-founders' ); ?></li>
                        </ul>
                    </div>
                </div>

                <p class="callout callout-info">
                    <?php esc_html_e( 'We work closely with decision-makers through medium and long-term engagements focused on sustainable organisational evolution.', 'executive-founders' ); ?>
                </p>
            </div>
        </div>
    </section>

    <!-- ====== Situations ====== -->
    <section class="section section-light" aria-labelledby="situations-title">
        <div class="container">
            <header class="section-head">
                <h2 id="situations-title"><?php esc_html_e( 'Typical situations where we create value', 'executive-founders' ); ?></h2>
                <p class="section-lede"><?php esc_html_e( 'Organisations reach a point where complexity outpaces their existing structures. These are the moments where Executive Founders creates the most impact.', 'executive-founders' ); ?></p>
            </header>

            <ul class="card-grid card-grid-3 card-grid-accent" role="list">
                <?php
                $situations = array(
                    array(
                        'title' => __( 'Scaling Complexity', 'executive-founders' ),
                        'body'  => __( 'Growth generates operational friction, misalignment and execution bottlenecks that existing structures cannot absorb.', 'executive-founders' ),
                    ),
                    array(
                        'title' => __( 'Leadership Overload', 'executive-founders' ),
                        'body'  => __( 'Executives and leadership teams become central decision points for operational coordination, limiting strategic focus.', 'executive-founders' ),
                    ),
                    array(
                        'title' => __( 'Fragmented Execution', 'executive-founders' ),
                        'body'  => __( 'Teams, priorities and initiatives lose alignment and operational consistency across the organisation.', 'executive-founders' ),
                    ),
                    array(
                        'title' => __( 'Transformation Pressure', 'executive-founders' ),
                        'body'  => __( 'Organisations struggle to evolve operationally while continuing to deliver on existing commitments.', 'executive-founders' ),
                    ),
                    array(
                        'title' => __( 'Governance Gaps', 'executive-founders' ),
                        'body'  => __( 'Responsibilities, accountability and decision-making structures become unclear as the organisation grows.', 'executive-founders' ),
                    ),
                );
                foreach ( $situations as $s ) : ?>
                    <li class="card card-accent">
                        <h3><?php echo esc_html( $s['title'] ); ?></h3>
                        <p><?php echo esc_html( $s['body'] ); ?></p>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    </section>

    <!-- ====== AI Governance Spotlight ====== -->
    <section class="section section-spotlight" aria-labelledby="ai-title">
        <div class="container">
            <p class="eyebrow"><?php esc_html_e( 'AI Governance', 'executive-founders' ); ?></p>
            <h2 id="ai-title"><?php esc_html_e( 'AI is not only a technology shift — it is an organisational transformation challenge.', 'executive-founders' ); ?></h2>
            <p class="section-lede">
                <?php esc_html_e( 'Most organisations adopt AI without a governance framework — creating shadow AI practices, fragmented adoption, unclear ownership and compliance risks.', 'executive-founders' ); ?>
            </p>

            <ul class="card-grid card-grid-3 card-grid-outline" role="list">
                <li class="card card-outline">
                    <h3><?php esc_html_e( 'AI Governance Models', 'executive-founders' ); ?></h3>
                    <p><?php esc_html_e( 'Structuring ownership, accountability and oversight.', 'executive-founders' ); ?></p>
                </li>
                <li class="card card-outline">
                    <h3><?php esc_html_e( 'Adoption Frameworks', 'executive-founders' ); ?></h3>
                    <p><?php esc_html_e( 'Guiding responsible AI integration across the organisation.', 'executive-founders' ); ?></p>
                </li>
                <li class="card card-outline">
                    <h3><?php esc_html_e( 'Risk & Compliance', 'executive-founders' ); ?></h3>
                    <p><?php esc_html_e( 'Managing shadow AI, data exposure and operational inconsistency.', 'executive-founders' ); ?></p>
                </li>
            </ul>

            <p class="callout callout-strong">
                <?php esc_html_e( 'We believe the real challenge is not how organisations use AI. The real challenge is how organisations implement, govern and scale AI responsibly and sustainably.', 'executive-founders' ); ?>
            </p>
        </div>
    </section>

    <!-- ====== Experience ====== -->
    <section class="section" aria-labelledby="experience-title">
        <div class="container">
            <header class="section-head">
                <h2 id="experience-title"><?php esc_html_e( 'Experience across growth and transformation environments', 'executive-founders' ); ?></h2>
            </header>

            <ul class="card-grid card-grid-2 card-grid-quiet" role="list">
                <?php
                $sectors = array(
                    array(
                        'title' => __( 'Consulting & Advisory', 'executive-founders' ),
                        'body'  => __( 'Supporting advisory-led organisations in structuring governance and scaling operational models.', 'executive-founders' ),
                    ),
                    array(
                        'title' => __( 'Fintech & Technology', 'executive-founders' ),
                        'body'  => __( 'Guiding fast-growth technology and fintech businesses through operational complexity and transformation.', 'executive-founders' ),
                    ),
                    array(
                        'title' => __( 'Digital Platforms', 'executive-founders' ),
                        'body'  => __( 'Structuring programme governance and execution coordination for digital-first organisations.', 'executive-founders' ),
                    ),
                    array(
                        'title' => __( 'Innovation-Driven Businesses', 'executive-founders' ),
                        'body'  => __( 'Helping innovation-led companies align leadership, scale operations and govern transformation.', 'executive-founders' ),
                    ),
                );
                foreach ( $sectors as $sec ) : ?>
                    <li class="card card-quiet">
                        <h3><?php echo esc_html( $sec['title'] ); ?></h3>
                        <p><?php echo esc_html( $sec['body'] ); ?></p>
                    </li>
                <?php endforeach; ?>
            </ul>

            <p class="section-footnote">
                <?php esc_html_e( 'Typical initiatives include governance structuring, strategic programme leadership, operational transformation, PMO governance, organisational scaling, leadership alignment and execution coordination. We collaborate with specialised experts and operational partners when specific competencies are required, ensuring organisations receive the right expertise within a structured governance framework.', 'executive-founders' ); ?>
            </p>
        </div>
    </section>

    <!-- ====== Closing statement / CTA ====== -->
    <section class="section section-dark" aria-labelledby="closing-title">
        <div class="container closing">
            <h2 id="closing-title"><?php esc_html_e( 'Modern organisations do not fail because of lack of vision.', 'executive-founders' ); ?></h2>
            <p class="closing-lede">
                <?php esc_html_e( 'They fail when governance, execution and organisational alignment do not scale at the same speed as complexity.', 'executive-founders' ); ?>
            </p>
            <p>
                <?php esc_html_e( 'Executive Founders operates alongside leadership teams to help organisations structure transformation, coordinate execution and scale sustainably over time. We provide strategic and operational advisory designed to bring clarity, alignment and governance to organisations navigating growth and change.', 'executive-founders' ); ?>
            </p>
            <a class="btn btn-light" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">
                <?php esc_html_e( 'Discuss your situation', 'executive-founders' ); ?>
            </a>
        </div>
    </section>

    <?php
    // Optionally surface latest news on the home page.
    $latest = new WP_Query( array(
        'post_type'      => 'post',
        'posts_per_page' => 3,
        'ignore_sticky_posts' => true,
    ) );
    if ( $latest->have_posts() ) : ?>
        <section class="section section-light" aria-labelledby="latest-news-title">
            <div class="container">
                <header class="section-head section-head-row">
                    <h2 id="latest-news-title"><?php esc_html_e( 'Latest insights', 'executive-founders' ); ?></h2>
                    <a class="section-link" href="<?php echo esc_url( get_post_type_archive_link( 'post' ) ?: home_url( '/news/' ) ); ?>">
                        <?php esc_html_e( 'All news', 'executive-founders' ); ?> →
                    </a>
                </header>
                <ul class="card-grid card-grid-3" role="list">
                    <?php while ( $latest->have_posts() ) : $latest->the_post(); ?>
                        <li><?php get_template_part( 'template-parts/post-card' ); ?></li>
                    <?php endwhile; ?>
                </ul>
            </div>
        </section>
    <?php
    endif;
    wp_reset_postdata();
    ?>

</main>

<?php get_footer(); ?>
