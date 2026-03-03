<?php
/**
 * Template Name: Contact
 * Slug: contact
 *
 * Contact page template.
 *
 * @package Melting_Pot
 */

get_header(); ?>

<main class="site-main">
    <section class="contact-section">
        <div class="container contact-grid">
            <div class="contact-content">
                <h1><?php esc_html_e( 'Get in Touch!', 'melting-pot' ); ?></h1>
                <p class="contact-subtitle">
                    <?php esc_html_e( "Tell us what you need (a health, website, campaign). We'll take it from there.", 'melting-pot' ); ?>
                </p>

                <?php
                $cf7_shortcode = get_theme_mod( 'mp_cf7_shortcode', '' );

                if ( $cf7_shortcode ) :
                    echo do_shortcode( $cf7_shortcode );
                else :
                    // Fallback styled form (non-functional until CF7 is configured)
                ?>
                    <form class="contact-form" action="#" method="post">
                        <div class="form-group">
                            <input type="text" name="name" placeholder="<?php esc_attr_e( 'Name', 'melting-pot' ); ?>" required>
                        </div>
                        <div class="form-group">
                            <input type="email" name="email" placeholder="<?php esc_attr_e( 'Email', 'melting-pot' ); ?>" required>
                        </div>
                        <div class="form-group">
                            <input type="text" name="company" placeholder="<?php esc_attr_e( 'Company / Role (optional)', 'melting-pot' ); ?>">
                        </div>
                        <div class="form-group">
                            <textarea name="message" rows="4" placeholder="<?php esc_attr_e( 'Your Message', 'melting-pot' ); ?>" required></textarea>
                        </div>
                        <div class="form-group">
                            <select name="service" required>
                                <option value="" disabled selected><?php esc_html_e( 'What do you need?', 'melting-pot' ); ?></option>
                                <option value="ai-video"><?php esc_html_e( 'Cinematic AI Video', 'melting-pot' ); ?></option>
                                <option value="social-content"><?php esc_html_e( 'Social Media Content', 'melting-pot' ); ?></option>
                                <option value="strategy"><?php esc_html_e( 'Social Media Strategy', 'melting-pot' ); ?></option>
                                <option value="other"><?php esc_html_e( 'Other', 'melting-pot' ); ?></option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary"><?php esc_html_e( 'Send Message', 'melting-pot' ); ?></button>
                        <p class="form-note"><?php esc_html_e( "We'll never share your info.", 'melting-pot' ); ?></p>
                    </form>
                <?php endif; ?>
            </div>

            <div class="contact-illustration">
                <!-- Person with paper airplane illustration -->
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="80" r="20" fill="#ffe0b2" stroke="#333" stroke-width="2"/>
                    <path d="M80 100 C80 100 70 140 75 170 L90 170 L95 130 L105 130 L110 170 L125 170 C130 140 120 100 120 100Z" fill="#2d2d7c" stroke="#333" stroke-width="1.5"/>
                    <path d="M80 100 L55 130" stroke="#333" stroke-width="2" stroke-linecap="round"/>
                    <path d="M120 100 L150 85" stroke="#333" stroke-width="2" stroke-linecap="round"/>
                    <polygon points="148,70 170,60 160,85 148,82" fill="#D94F4F" stroke="#333" stroke-width="1.5"/>
                    <polygon points="170,60 190,50 175,65" fill="#ffc107" stroke="#333" stroke-width="1"/>
                </svg>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
