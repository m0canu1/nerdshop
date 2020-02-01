<?php
/**
 * Funzione per ottenere tutti i prodotto presenti nel carrello di un utente
 */

require '../common.php';
require '../dbconnection.php';

$id_user = getUserId($_SESSION['user']);

$id_user = $db->quote($id_user);

$rows = $db->query("SELECT * FROM product JOIN cart c on product.id = c.id_product WHERE id_user = $id_user");

$result = array();
if ($rows) {
    foreach ($rows as $row) {
        $result[] = $row;
    }
}
$db = null;
echo json_encode($result);

// TODO ok