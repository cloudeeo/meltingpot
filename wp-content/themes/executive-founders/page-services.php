<?php
/**
 * Template Name: Services
 * Slug: services
 *
 * @package Executive_Founders
 */

get_header(); ?>

<main class="site-main" id="site-main" role="main">

    <section class="page-hero">
        <div class="container">
            <p class="eyebrow"><?php esc_html_e( 'What we do', 'executive-founders' ); ?></p>
            <h1><?php esc_html_e( 'Strategic advisory, governance and operational leadership', 'executive-founders' ); ?></h1>
            <p class="page-lede"><?php esc_html_e( 'We design and steer the structures that turn strategy into execution — from governance and PMO orchestration to AI adoption and organisational scaling.', 'executive-founders' ); ?></p>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <ul class="service-list service-list-detailed" role="list">
                <?php
                $services = array(
                    array(
                        'icon'  => 'advisory',
                        'title' => __( 'Strategic Advisory', 'executive-founders' ),
                        'body'  => __( 'We work alongside executives and founders to navigate inflection points — clarifying priorities, sharpening strategic options and supporting decision-making with structure and discipline.', 'executive-founders' ),
                        'bullets' => array(
                            __( 'Leadership team coaching and decision support', 'executive-founders' ),
                            __( 'Strategic prioritisation and roadmap design', 'executive-founders' ),
                            __( 'Board and investor preparation', 'executive-founders' ),
                        ),
                    ),
                    array(
                        'icon'  => 'governance',
                        'title' => __( 'Governance & Operational Leadership', 'executive-founders' ),
                        'body'  => __( 'We help organisations structure accountability and decision-making — designing governance models that match the complexity of the business and the pace of change.', 'executive-founders' ),
                        'bullets' => array(
                            __( 'Governance model design and operating rhythm', 'executive-founders' ),
                            __( 'RACI / decision rights frameworks', 'executive-founders' ),
                            __( 'Interim operational leadership', 'executive-founders' ),
                        ),
                    ),
                    array(
                        'icon'  => 'pmo',
                        'title' => __( 'PMO & Programme Governance', 'executive-founders' ),
                        'body'  => __( 'We coordinate execution across initiatives — establishing programme governance, transparent reporting and the operating cadence required to move at scale.', 'executive-founders' ),
                        'bullets' => array(
                            __( 'Strategic PMO set-up and uplift', 'executive-founders' ),
                            __( 'Portfolio prioritisation and dependency management', 'executive-founders' ),
                            __( 'Programme delivery oversight', 'executive-founders' ),
                        ),
                    ),
                    array(
                        'icon'  => 'scale',
                        'title' => __( 'Organisational Scaling', 'executive-founders' ),
                        'body'  => __( 'We build structures that grow with the business — designing operating models, role architecture and processes that absorb complexity instead of breaking under it.', 'executive-founders' ),
                        'bullets' => array(
                            __( 'Target operating model design', 'executive-founders' ),
                            __( 'Org design and leadership team architecture', 'executive-founders' ),
                            __( 'Process and workflow standardisation', 'executive-founders' ),
                        ),
                    ),
                    array(
                        'icon'  => 'ai',
                        'title' => __( 'AI Governance & Adoption', 'executive-founders' ),
                        'body'  => __( 'We govern AI integration responsibly — structuring ownership, risk management and adoption frameworks so AI scales sustainably across the organisation.', 'executive-founders' ),
                        'bullets' => array(
                            __( 'AI governance and policy frameworks', 'executive-founders' ),
                            __( 'Shadow-AI assessment and remediation', 'executive-founders' ),
                            __( 'Responsible AI adoption roadmap', 'executive-founders' ),
                        ),
                    ),
                );
                foreach ( $services as $svc ) : ?>
                    <li class="service-item-detailed">
                        <header class="service-item-header">
                            <span class="service-icon" aria-hidden="true">
                                <?php executive_founders_service_icon( $svc['icon'] ); ?>
                            </span>
                            <h2><?php echo esc_html( $svc['title'] ); ?></h2>
                        </header>
                        <p><?php echo esc_html( $svc['body'] ); ?></p>
                        <ul class="bullet-list">
                            <?php foreach ( $svc['bullets'] as $b ) : ?>
                                <li><?php echo esc_html( $b ); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </li>
                <?php endforeach; ?>
            </ul>

            <?php while ( have_posts() ) : the_post(); ?>
                <?php if ( get_the_content() ) : ?>
                    <div class="prose"><?php the_content(); ?></div>
                <?php endif; ?>
            <?php endwhile; ?>
        </div>
    </section>

    <section class="section section-dark">
        <div class="container closing">
            <h2><?php esc_html_e( 'Looking for a structured conversation about your organisation?', 'executive-founders' ); ?></h2>
            <p><?php esc_html_e( 'We work with leadership teams through medium and long-term engagements focused on sustainable organisational evolution.', 'executive-founders' ); ?></p>
            <a class="btn btn-light" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Get in touch', 'executive-founders' ); ?></a>
        </div>
    </section>

</main>

<?php get_footer(); ?>
