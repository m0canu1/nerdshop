<?php
/**
 * Rimozione di un prodotto dal Carrello di un dato utente
 */

require '../dbconnection.php';
require '../common.php';

$id_prod = $_POST['id'];
$id_user = getUserId($_POST['user']);

$id_prod = $db->quote($id_prod);
$id_user = $db->quote($id_user);

$rows = $db->query("DELETE FROM cart where id_user = $id_user and id_product = $id_prod");

if ($rows->rowCount() > 0) {
    $db = null;
    echo json_encode(array('msg'=>"Il prodotto è stato rimosso."));
} else {
    $db = null;
    echo json_encode(array('msg'=>"Il prodotto non è stato rimosso a causa di un errore."));
}

//TODO eliminare file e mettere in common.php?