<?php
/**
 * Inserimento di un prodotto nel Carrello di un dato utente
 */

require '../dbconnection.php';
require '../common.php';

$id_prod = $_POST['id'];
$id_user = getUserId($_POST['user']);

echo addToCart($id_user, $id_prod);
