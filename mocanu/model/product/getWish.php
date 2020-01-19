<?php
/**
 * Funzione per ottenere tutti i prodotti presenti nella Wishlist di un dato utente.
 */

require '../common.php';
require '../dbconnection.php';
require '../getUserId.php';

$user_id = getUserId($_SESSION['user']);
$stmt = $db->prepare('SELECT * FROM product JOIN wish w on product.id = w.id_product');
$result = array();

if ($stmt->execute()) {
    foreach ($stmt->fetchAll() as $row) {
        $result = $row;
    }
}
$db = null;
echo json_encode($result, JSON_THROW_ON_ERROR, 512);