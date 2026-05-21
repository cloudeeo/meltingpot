<?php
/**
 * Inline SVG icon helpers used across the theme.
 *
 * @package Executive_Founders
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Echo an inline SVG icon for the given key.
 *
 * @param string $key Icon name.
 */
function executive_founders_service_icon( $key ) {
    $icons = array(
        'advisory'   => '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M4 26h24M8 26V14h4v12M16 26V8h4v18M24 26v-6h-3v6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        'governance' => '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M16 4 4 10v2h24v-2L16 4Zm-9 9v11M12 13v11M20 13v11M25 13v11M4 28h24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        'pmo'        => '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><rect x="13" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="4" y="22" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="13" y="22" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="22" y="22" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M16 10v6m-9 6v-3a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v3" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
        'scale'      => '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M4 26 14 16l6 6 8-10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 12h6v6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        'ai'         => '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><circle cx="16" cy="16" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M16 4v4m0 16v4M4 16h4m16 0h4M7 7l3 3m12 12 3 3M7 25l3-3m12-12 3-3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    );

    if ( ! isset( $icons[ $key ] ) ) {
        return;
    }

    echo $icons[ $key ]; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- static SVG markup.
}
