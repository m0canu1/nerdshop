<?php

/**
 * Inserimento di un prodotto nel Carrello di un utente
 * ed eliminazione da wishlist
 */

require '../dbconnection.php';
require '../common.php';

$id_prod = $_POST['id'];
$id_user = getUserId($_POST['user']);

if (checkWish($id_user, $id_prod)) { //se gia' presente nella wishlist, elimina da carrello
    removeFromWish($id_user, $id_prod);
    echo json_encode(array('msg' => "Il prodotto è già presente nella wishlist."));
} else {
    removeFromCart($id_user, $id_prod);
    echo addToWish($id_user, $id_prod);
}