<?php
/**
 * Creazione di un nuovo ordine
 */

require '../dbconnection.php';
require '../common.php';

if(!$_POST['fname'] || !$_POST['lname'] || !$_POST['addrs'] || !$_POST['city'] || !$_POST['cap']){
    echo json_encode(array('msg'=>"Errore durante l'acquisto, inserire tutti i campi."));
    exit;
}

if(!ctype_alpha($_POST['fname']) || !ctype_alpha($_POST['lname'])) {
    echo json_encode(array('msg'=>"Non sono ammessi caratteri speciali."));
    exit;
}

$user = $_POST['user'];
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$addrs = $_POST['addrs'];
$city = $_POST['city'];
$cap = $_POST['cap'];
$product = $_POST['product'];
$shipment = $_POST['shipment'];

date_default_timezone_set('Europe/Rome');
$date = date('Y/m/d', time());

$id_user = getUserId($user);
$id_prod = getProdId($product);
$discount = getDiscount($user);

if(strcmp(trim($shipment),"free") == 0) {
    $shipment = 0;
} else if (strcmp(trim($shipment),"two") == 0) {
    $shipment = 2.99;
} else {
    $shipment = 4.99;
}

$cost = getProductPrice($product) + $shipment - $discount;

$id_prod = $db->quote($id_prod);
$id_user = $db->quote($id_user);
$db->query("INSERT INTO wish (id_user, id_product) VALUES ($id_user, $id_prod)");

//TODO da finire