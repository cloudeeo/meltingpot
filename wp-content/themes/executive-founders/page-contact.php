<?php
/**
 * Template Name: Contact
 * Slug: contact
 *
 * @package Executive_Founders
 */

get_header(); ?>

<main class="site-main" id="site-main" role="main">

    <section class="page-hero">
        <div class="container">
            <p class="eyebrow"><?php esc_html_e( 'Contact', 'executive-founders' ); ?></p>
            <h1><?php esc_html_e( 'Start a conversation', 'executive-founders' ); ?></h1>
            <p class="page-lede"><?php esc_html_e( 'Tell us about your organisation, the moment you are in, and what you would like to achieve. We will respond personally to discuss whether a structured engagement makes sense.', 'executive-founders' ); ?></p>
        </div>
    </section>

    <section class="section">
        <div class="container contact-grid">
            <div class="contact-form-wrap">
                <?php
                $cf7 = get_theme_mod( 'ef_cf7_shortcode', '' );
                if ( $cf7 ) {
                    echo do_shortcode( $cf7 );
                } else {
                    ?>
                    <form class="contact-form" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
                        <input type="hidden" name="action" value="ef_contact_fallback">
                        <?php wp_nonce_field( 'ef_contact', 'ef_contact_nonce' ); ?>
                        <div class="form-row">
                            <label for="ef-name"><?php esc_html_e( 'Name', 'executive-founders' ); ?></label>
                            <input type="text" id="ef-name" name="name" required autocomplete="name">
                        </div>
                        <div class="form-row">
                            <label for="ef-email"><?php esc_html_e( 'Email', 'executive-founders' ); ?></label>
                            <input type="email" id="ef-email" name="email" required autocomplete="email">
                        </div>
                        <div class="form-row">
                            <label for="ef-org"><?php esc_html_e( 'Organisation & role', 'executive-founders' ); ?></label>
                            <input type="text" id="ef-org" name="organisation" autocomplete="organization">
                        </div>
                        <div class="form-row">
                            <label for="ef-topic"><?php esc_html_e( 'Area of interest', 'executive-founders' ); ?></label>
                            <select id="ef-topic" name="topic">
                                <option value=""><?php esc_html_e( 'Please choose…', 'executive-founders' ); ?></option>
                                <option value="strategic-advisory"><?php esc_html_e( 'Strategic Advisory', 'executive-founders' ); ?></option>
                                <option value="governance"><?php esc_html_e( 'Governance & Operational Leadership', 'executive-founders' ); ?></option>
                                <option value="pmo"><?php esc_html_e( 'PMO & Programme Governance', 'executive-founders' ); ?></option>
                                <option value="scaling"><?php esc_html_e( 'Organisational Scaling', 'executive-founders' ); ?></option>
                                <option value="ai-governance"><?php esc_html_e( 'AI Governance & Adoption', 'executive-founders' ); ?></option>
                                <option value="other"><?php esc_html_e( 'Other', 'executive-founders' ); ?></option>
                            </select>
                        </div>
                        <div class="form-row">
                            <label for="ef-message"><?php esc_html_e( 'What would you like to discuss?', 'executive-founders' ); ?></label>
                            <textarea id="ef-message" name="message" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary"><?php esc_html_e( 'Send message', 'executive-founders' ); ?></button>
                        <p class="form-note"><?php esc_html_e( 'We treat every message confidentially. Configure a Contact Form 7 shortcode in the Customizer to enable delivery.', 'executive-founders' ); ?></p>
                    </form>
                    <?php
                }
                ?>
            </div>

            <aside class="contact-side">
                <h2><?php esc_html_e( 'Get in touch', 'executive-founders' ); ?></h2>
                <ul class="meta-list" role="list">
                    <li>
                        <h3><?php esc_html_e( 'Email', 'executive-founders' ); ?></h3>
                        <p>
                            <?php $email = get_theme_mod( 'ef_contact_email', 'info@executivefounders.com' ); ?>
                            <a href="mailto:<?php echo esc_attr( antispambot( $email ) ); ?>"><?php echo esc_html( antispambot( $email ) ); ?></a>
                        </p>
                    </li>
                    <?php $address = get_theme_mod( 'ef_contact_address', '' ); ?>
                    <?php if ( $address ) : ?>
                        <li>
                            <h3><?php esc_html_e( 'Where we are', 'executive-founders' ); ?></h3>
                            <p><?php echo wp_kses_post( nl2br( esc_html( $address ) ) ); ?></p>
                        </li>
                    <?php endif; ?>
                    <li>
                        <h3><?php esc_html_e( 'What to expect', 'executive-founders' ); ?></h3>
                        <p><?php esc_html_e( 'We respond within two working days with proposed next steps or a short call to scope the engagement.', 'executive-founders' ); ?></p>
                    </li>
                </ul>
            </aside>
        </div>
    </section>

</main>

<?php get_footer(); ?>
