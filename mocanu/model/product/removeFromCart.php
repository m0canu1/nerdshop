<?php
/**
 * Rimozione di un prodotto dal Carrello di un dato utente
 */

require '../dbconnection.php';
require '../common.php';

$id_prod = $_POST['id'];
$id_user = getUserId($_POST['user']);

echo removeFromCart($id_user, $id_prod);