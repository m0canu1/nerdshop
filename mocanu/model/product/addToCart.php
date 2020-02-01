<?php
/**
 * Inserimento di un prodotto nel Carrello di un dato utente
 */

require '../dbconnection.php';
require '../common.php';

$id_prod = $_POST['id'];
$user = $_POST['user'];

$id_user = getUserId($user);
if (checkCart($id_user, $id_prod)) {
    $db = null;
    echo json_encode(array('msg' => 'Il prodotto è già presente nel carrello.',));
} else {
    $id_user = $db->quote($id_user);
    $id_prod = $db->quote($id_prod);

    $db->query("INSERT INTO cart (id_user, id_product) VALUES ($id_user, $id_prod)");
    $db = null;
    echo json_encode(array('msg'=>'Il prodotto è stato aggiunto al carrello!'));

}

//TODO eliminare file e mettere in common.php?