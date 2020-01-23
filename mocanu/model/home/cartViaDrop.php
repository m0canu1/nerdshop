<?php
/**
 * Inserimento di un prodotto nel Carrello di un dato utente
 * Funzione utilizzata durante il Drag & Drop
 */

require '../dbconnection.php';
require '../common.php';

//TODO controllare se sono meglio queste
//$user = substr($_POST['user'], 0);
//$name = substr($_POST['name'], 0);

$user = $_POST['user'];
$product_name = $_POST['product'];
$id_user = getUserId($user);
$id_prod = getProdId($product_name);


if (checkCart($id_user, $id_prod)) {
    $db = null;
    echo json_encode(array("msg" => "Il prodotto " .$product_name. " è già presente nel carrello."));
} else {
    $id_prod = $db->quote($id_prod);
    $id_user = $db->quote($id_user);
    $db->query("INSERT INTO cart (id_user, id_product) VALUES ($id_user, $id_prod)");
    $db = null;
    echo json_encode(array("msg"=>"Il prodotto ".$product_name." è stato aggiunto al carrello."));
}

