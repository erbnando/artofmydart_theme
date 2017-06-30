<?php

spl_autoload_register( function ( $class ) {
	$classname_pieces = explode( '_', strtolower( $class ) );
	$class_file       = get_template_directory() . "/lib/" . implode( '-', $classname_pieces ) . ".php";
	if ( file_exists( $class_file ) ) {
		include_once  $class_file;
	} else {
		$class_file = get_template_directory() . "/lib/" . array_pop( $classname_pieces ) . "s/" . implode( '-', $classname_pieces ) . ".php";
		if ( file_exists( $class_file ) ) {
			include_once $class_file;
		}
	}
} );

$Theme_Support = new Theme_Support();
$Theme_Support->init();

$Theme_Enqueue = new Theme_Enqueue();
$Theme_Enqueue->init();

$Theme_Endpoints = new Theme_Endpoints();
$Theme_Endpoints->init();

function enqueue_font_awesome() {
	wp_enqueue_style( 'font-awesome', get_template_directory_uri() . '/fonts/font-awesome/css/font-awesome.min.css', array(), '4.7.0' ); 
	}
add_action( 'wp_enqueue_scripts', 'enqueue_font_awesome' );

add_image_size( 'home', 600, 600 );

add_action('after_setup_theme', 'remove_admin_bar');
function remove_admin_bar() {
	show_admin_bar(false);
}
