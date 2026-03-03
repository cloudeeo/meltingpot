<?php
/**
 * Register custom post types and taxonomies.
 *
 * @package Melting_Pot
 */

/**
 * Register the Menu Item custom post type.
 */
function melting_pot_register_cpt() {
    $labels = array(
        'name'               => _x( 'Menu Items', 'post type general name', 'melting-pot' ),
        'singular_name'      => _x( 'Menu Item', 'post type singular name', 'melting-pot' ),
        'menu_name'          => _x( 'Menu Items', 'admin menu', 'melting-pot' ),
        'add_new'            => _x( 'Add New', 'menu item', 'melting-pot' ),
        'add_new_item'       => __( 'Add New Menu Item', 'melting-pot' ),
        'new_item'           => __( 'New Menu Item', 'melting-pot' ),
        'edit_item'          => __( 'Edit Menu Item', 'melting-pot' ),
        'view_item'          => __( 'View Menu Item', 'melting-pot' ),
        'all_items'          => __( 'All Menu Items', 'melting-pot' ),
        'search_items'       => __( 'Search Menu Items', 'melting-pot' ),
        'not_found'          => __( 'No menu items found.', 'melting-pot' ),
        'not_found_in_trash' => __( 'No menu items found in Trash.', 'melting-pot' ),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'menu-item' ),
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => 20,
        'menu_icon'          => 'dashicons-food',
        'supports'           => array( 'title', 'editor', 'thumbnail' ),
        'show_in_rest'       => true,
    );

    register_post_type( 'mp_menu_item', $args );
}
add_action( 'init', 'melting_pot_register_cpt' );

/**
 * Register the Menu Category taxonomy.
 */
function melting_pot_register_taxonomy() {
    $labels = array(
        'name'              => _x( 'Menu Categories', 'taxonomy general name', 'melting-pot' ),
        'singular_name'     => _x( 'Menu Category', 'taxonomy singular name', 'melting-pot' ),
        'search_items'      => __( 'Search Menu Categories', 'melting-pot' ),
        'all_items'         => __( 'All Menu Categories', 'melting-pot' ),
        'parent_item'       => __( 'Parent Menu Category', 'melting-pot' ),
        'parent_item_colon' => __( 'Parent Menu Category:', 'melting-pot' ),
        'edit_item'         => __( 'Edit Menu Category', 'melting-pot' ),
        'update_item'       => __( 'Update Menu Category', 'melting-pot' ),
        'add_new_item'      => __( 'Add New Menu Category', 'melting-pot' ),
        'new_item_name'     => __( 'New Menu Category Name', 'melting-pot' ),
        'menu_name'         => __( 'Menu Categories', 'melting-pot' ),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'menu-category' ),
        'show_in_rest'      => true,
    );

    register_taxonomy( 'menu_category', array( 'mp_menu_item' ), $args );
}
add_action( 'init', 'melting_pot_register_taxonomy' );

/**
 * Add meta box for price field.
 */
function melting_pot_add_meta_boxes() {
    add_meta_box(
        'mp_menu_item_price',
        __( 'Price', 'melting-pot' ),
        'melting_pot_price_meta_box_callback',
        'mp_menu_item',
        'side',
        'high'
    );
}
add_action( 'add_meta_boxes', 'melting_pot_add_meta_boxes' );

/**
 * Render the price meta box.
 */
function melting_pot_price_meta_box_callback( $post ) {
    wp_nonce_field( 'melting_pot_save_price', 'melting_pot_price_nonce' );
    $price = get_post_meta( $post->ID, '_mp_price', true );
    ?>
    <label for="mp_price"><?php esc_html_e( 'Price (e.g. €150)', 'melting-pot' ); ?></label>
    <input type="text" id="mp_price" name="mp_price" value="<?php echo esc_attr( $price ); ?>" class="widefat" />
    <?php
}

/**
 * Save the price meta box data.
 */
function melting_pot_save_price( $post_id ) {
    if ( ! isset( $_POST['melting_pot_price_nonce'] ) ) {
        return;
    }
    if ( ! wp_verify_nonce( $_POST['melting_pot_price_nonce'], 'melting_pot_save_price' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    if ( isset( $_POST['mp_price'] ) ) {
        update_post_meta( $post_id, '_mp_price', sanitize_text_field( $_POST['mp_price'] ) );
    }
}
add_action( 'save_post_mp_menu_item', 'melting_pot_save_price' );

/**
 * Add price column to admin list.
 */
function melting_pot_menu_item_columns( $columns ) {
    $new = array();
    foreach ( $columns as $key => $value ) {
        $new[ $key ] = $value;
        if ( 'title' === $key ) {
            $new['mp_price'] = __( 'Price', 'melting-pot' );
        }
    }
    return $new;
}
add_filter( 'manage_mp_menu_item_posts_columns', 'melting_pot_menu_item_columns' );

/**
 * Populate the price column.
 */
function melting_pot_menu_item_column_content( $column, $post_id ) {
    if ( 'mp_price' === $column ) {
        $price = get_post_meta( $post_id, '_mp_price', true );
        echo esc_html( $price ? $price : '—' );
    }
}
add_action( 'manage_mp_menu_item_posts_custom_column', 'melting_pot_menu_item_column_content', 10, 2 );
