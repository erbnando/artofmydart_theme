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

add_image_size( 'book_cover', 552 );

add_action('after_setup_theme', 'remove_admin_bar');
function remove_admin_bar() {
	show_admin_bar(false);
}

function image_crop_dimensions($default, $orig_w, $orig_h, $new_w, $new_h, $crop){
    if ( !$crop ) return null; // let the wordpress default function handle this

    $aspect_ratio = $orig_w / $orig_h;
    $size_ratio = max($new_w / $orig_w, $new_h / $orig_h);

    $crop_w = round($new_w / $size_ratio);
    $crop_h = round($new_h / $size_ratio);

    $s_x = floor( ($orig_w - $crop_w) / 2 );
    $s_y = floor( ($orig_h - $crop_h) / 2 );

    return array( 0, 0, (int) $s_x, (int) $s_y, (int) $new_w, (int) $new_h, (int) $crop_w, (int) $crop_h );
}
add_filter('image_resize_dimensions', 'image_crop_dimensions', 10, 6);

