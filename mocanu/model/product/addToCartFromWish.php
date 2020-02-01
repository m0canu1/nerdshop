<?php
/**
 * Inserimento di un prodotto nel Carrello di un utente
 * ed eliminazione da wishlist
 */

require '../dbconnection.php';
require '../common.php';

$id_prod = $_POST['id'];
$id_user = getUserId($_POST['user']);

if (checkCart($id_user, $id_prod)) { //se gia' presente nel carrello, elimina da wishlist
    removeFromWish($id_user, $id_prod);
    echo json_encode(array('msg'=>"Il prodotto è già presente nel carrello."));
} else {
    removeFromWish($id_user, $id_prod);
    echo addToCart($id_user, $id_prod);
}