<?php
require '../dbconnection.php';

/**
 * Funzione per ottenere i nomi e i prezzi di tutti i prodotti presenti nel database.
 */
$rows = $db->query('SELECT name, price FROM product');
$result = array();
if ($rows) {
    foreach($rows as $row) {
        $result[] = $row;
    }
}
$db = null;
echo json_encode($result, JSON_THROW_ON_ERROR, 512);
