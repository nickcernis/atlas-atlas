<?php
/**
 * Plugin Name: Log WPGraphQL Requests
 * Plugin URI: https://github.com/nickcernis/atlas-atlas
 * Description: Logs WPGraphQL requests to a Firebase datastore for visualisation on a globe.
 * Author: Nick Cernis
 * Author URI: https://github.com/nickcernis/
 * Text Domain: log-wpgraphql-requests
 * Domain Path: /languages
 * Version: 0.1.0
 * Requires at least: 5.2
 * Requires PHP: 7.2
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package LogWPGraphQLRequests
 */

namespace LogWPGraphQLRequests;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'do_graphql_request', __NAMESPACE__ . '\ping_firebase' );
/**
 * Triggers a Firebase function with the client and server IP.
 */
function ping_firebase() {
	$client_ip = guess_user_ip();
	$server_ip = "35.225.23.42"; // TODO: don't hard-code this.

	wp_remote_get( "https://us-central1-atlasatlas-1f9a2.cloudfunctions.net/logGraphqlRequest?ip={$client_ip}&ip2={$server_ip}" );
}

/**
 * Tries to determine the client IP.
 */
function guess_user_ip() {
	if( ! empty( $_SERVER['HTTP_CLIENT_IP'] ) ) {
		return $_SERVER['HTTP_CLIENT_IP'];
	}

	if ( ! empty($_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
		return $_SERVER['HTTP_X_FORWARDED_FOR'];
	}

	return $_SERVER['REMOTE_ADDR'];
}