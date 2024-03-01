<?php
/*
Plugin Name: Elegance In Code
Description: Elegance In Code Core Plugin
Version: 1.0
Author: Nibir Ahmed
Author URI: https://nibirahmed.com
*/

// Enqueue JavaScript file
function ec_plugin_enqueue_script() {
    
    wp_enqueue_script('jquery');

    wp_enqueue_script('ec-plugin-script', plugins_url('js/ec-script.js', __FILE__), array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'ec_plugin_enqueue_script');

   
add_filter( 'woocommerce_checkout_cart_item_quantity', 'ec_checkout_item_quantity_input', 9999, 3 );
  
function ec_checkout_item_quantity_input( $product_quantity, $cart_item, $cart_item_key ) {
   $product = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
   $product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );
   if ( ! $product->is_sold_individually() ) {
      $product_quantity = woocommerce_quantity_input( array(
         'input_name'  => 'shipping_method_qty_' . $product_id,
         'input_value' => $cart_item['quantity'],
         'max_value'   => $product->get_max_purchase_quantity(),
         'min_value'   => '0',
      ), $product, false );
      $product_quantity .= '<input type="hidden" name="product_key_' . $product_id . '" value="' . $cart_item_key . '">';
   }
   return $product_quantity;
}
 
add_action( 'woocommerce_checkout_update_order_review', 'ec_update_item_quantity_checkout' );
 
function ec_update_item_quantity_checkout( $post_data ) {
   parse_str( $post_data, $post_data_array );
   $updated_qty = false;
   foreach ( $post_data_array as $key => $value ) {   
      if ( substr( $key, 0, 20 ) === 'shipping_method_qty_' ) {         
         $id = substr( $key, 20 );   
         WC()->cart->set_quantity( $post_data_array['product_key_' . $id], $post_data_array[$key], false );
         $updated_qty = true;
      }     
   }  
   if ( $updated_qty ) WC()->cart->calculate_totals();
}