<?php
/**
 * Custom post types and taxonomies.
 *
 * @package Executive_Founders
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register Case Study CPT.
 */
function executive_founders_register_case_studies() {
    $labels = array(
        'name'               => _x( 'Case Studies', 'post type general name', 'executive-founders' ),
        'singular_name'      => _x( 'Case Study', 'post type singular name', 'executive-founders' ),
        'menu_name'          => _x( 'Case Studies', 'admin menu', 'executive-founders' ),
        'add_new'            => _x( 'Add New', 'case study', 'executive-founders' ),
        'add_new_item'       => __( 'Add new case study', 'executive-founders' ),
        'edit_item'          => __( 'Edit case study', 'executive-founders' ),
        'new_item'           => __( 'New case study', 'executive-founders' ),
        'view_item'          => __( 'View case study', 'executive-founders' ),
        'all_items'          => __( 'All case studies', 'executive-founders' ),
        'search_items'       => __( 'Search case studies', 'executive-founders' ),
        'not_found'          => __( 'No case studies found.', 'executive-founders' ),
        'not_found_in_trash' => __( 'No case studies in Trash.', 'executive-founders' ),
    );

    register_post_type( 'ef_case_study', array(
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => 'case-studies',
        'rewrite'            => array( 'slug' => 'case-study' ),
        'show_in_rest'       => true,
        'menu_position'      => 21,
        'menu_icon'          => 'dashicons-portfolio',
        'supports'           => array( 'title', 'editor', 'excerpt', 'thumbnail', 'page-attributes' ),
    ) );
}
add_action( 'init', 'executive_founders_register_case_studies' );

/**
 * Register Sector taxonomy for case studies.
 */
function executive_founders_register_case_study_sector() {
    register_taxonomy( 'ef_sector', array( 'ef_case_study' ), array(
        'labels'            => array(
            'name'          => __( 'Sectors', 'executive-founders' ),
            'singular_name' => __( 'Sector', 'executive-founders' ),
        ),
        'hierarchical'      => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
        'rewrite'           => array( 'slug' => 'sector' ),
    ) );
}
add_action( 'init', 'executive_founders_register_case_study_sector' );

/**
 * Register Video CPT.
 */
function executive_founders_register_videos() {
    $labels = array(
        'name'               => _x( 'Videos', 'post type general name', 'executive-founders' ),
        'singular_name'      => _x( 'Video', 'post type singular name', 'executive-founders' ),
        'menu_name'          => _x( 'Videos', 'admin menu', 'executive-founders' ),
        'add_new'            => _x( 'Add New', 'video', 'executive-founders' ),
        'add_new_item'       => __( 'Add new video', 'executive-founders' ),
        'edit_item'          => __( 'Edit video', 'executive-founders' ),
        'new_item'           => __( 'New video', 'executive-founders' ),
        'view_item'          => __( 'View video', 'executive-founders' ),
        'all_items'          => __( 'All videos', 'executive-founders' ),
        'search_items'       => __( 'Search videos', 'executive-founders' ),
        'not_found'          => __( 'No videos found.', 'executive-founders' ),
        'not_found_in_trash' => __( 'No videos in Trash.', 'executive-founders' ),
    );

    register_post_type( 'ef_video', array(
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => 'videos',
        'rewrite'            => array( 'slug' => 'video' ),
        'show_in_rest'       => true,
        'menu_position'      => 22,
        'menu_icon'          => 'dashicons-video-alt3',
        'supports'           => array( 'title', 'editor', 'excerpt', 'thumbnail', 'page-attributes' ),
    ) );
}
add_action( 'init', 'executive_founders_register_videos' );

/**
 * Video meta box: external URL (YouTube/Vimeo).
 */
function executive_founders_add_video_meta_box() {
    add_meta_box(
        'ef_video_meta',
        __( 'Video source', 'executive-founders' ),
        'executive_founders_video_meta_box_callback',
        'ef_video',
        'side',
        'high'
    );
}
add_action( 'add_meta_boxes', 'executive_founders_add_video_meta_box' );

function executive_founders_video_meta_box_callback( $post ) {
    wp_nonce_field( 'ef_video_meta', 'ef_video_meta_nonce' );
    $url      = get_post_meta( $post->ID, '_ef_video_url', true );
    $duration = get_post_meta( $post->ID, '_ef_video_duration', true );
    ?>
    <p>
        <label for="ef_video_url"><?php esc_html_e( 'YouTube or Vimeo URL', 'executive-founders' ); ?></label>
        <input type="url" id="ef_video_url" name="ef_video_url" value="<?php echo esc_attr( $url ); ?>" class="widefat" placeholder="https://www.youtube.com/watch?v=…">
    </p>
    <p>
        <label for="ef_video_duration"><?php esc_html_e( 'Duration (e.g. 4:32)', 'executive-founders' ); ?></label>
        <input type="text" id="ef_video_duration" name="ef_video_duration" value="<?php echo esc_attr( $duration ); ?>" class="widefat">
    </p>
    <?php
}

function executive_founders_save_video_meta( $post_id ) {
    if ( ! isset( $_POST['ef_video_meta_nonce'] ) || ! wp_verify_nonce( $_POST['ef_video_meta_nonce'], 'ef_video_meta' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    if ( isset( $_POST['ef_video_url'] ) ) {
        $safe = executive_founders_is_safe_video_url( wp_unslash( $_POST['ef_video_url'] ) );
        update_post_meta( $post_id, '_ef_video_url', $safe );
    }
    if ( isset( $_POST['ef_video_duration'] ) ) {
        update_post_meta( $post_id, '_ef_video_duration', sanitize_text_field( wp_unslash( $_POST['ef_video_duration'] ) ) );
    }
}
add_action( 'save_post_ef_video', 'executive_founders_save_video_meta' );

/**
 * Case study meta box: client name, year.
 */
function executive_founders_add_case_study_meta_box() {
    add_meta_box(
        'ef_case_study_meta',
        __( 'Case study details', 'executive-founders' ),
        'executive_founders_case_study_meta_box_callback',
        'ef_case_study',
        'side',
        'high'
    );
}
add_action( 'add_meta_boxes', 'executive_founders_add_case_study_meta_box' );

function executive_founders_case_study_meta_box_callback( $post ) {
    wp_nonce_field( 'ef_case_study_meta', 'ef_case_study_meta_nonce' );
    $client = get_post_meta( $post->ID, '_ef_cs_client', true );
    $year   = get_post_meta( $post->ID, '_ef_cs_year', true );
    ?>
    <p>
        <label for="ef_cs_client"><?php esc_html_e( 'Client (or anonymised label)', 'executive-founders' ); ?></label>
        <input type="text" id="ef_cs_client" name="ef_cs_client" value="<?php echo esc_attr( $client ); ?>" class="widefat">
    </p>
    <p>
        <label for="ef_cs_year"><?php esc_html_e( 'Year', 'executive-founders' ); ?></label>
        <input type="text" id="ef_cs_year" name="ef_cs_year" value="<?php echo esc_attr( $year ); ?>" class="widefat">
    </p>
    <?php
}

function executive_founders_save_case_study_meta( $post_id ) {
    if ( ! isset( $_POST['ef_case_study_meta_nonce'] ) || ! wp_verify_nonce( $_POST['ef_case_study_meta_nonce'], 'ef_case_study_meta' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }
    if ( isset( $_POST['ef_cs_client'] ) ) {
        update_post_meta( $post_id, '_ef_cs_client', sanitize_text_field( wp_unslash( $_POST['ef_cs_client'] ) ) );
    }
    if ( isset( $_POST['ef_cs_year'] ) ) {
        update_post_meta( $post_id, '_ef_cs_year', sanitize_text_field( wp_unslash( $_POST['ef_cs_year'] ) ) );
    }
}
add_action( 'save_post_ef_case_study', 'executive_founders_save_case_study_meta' );
