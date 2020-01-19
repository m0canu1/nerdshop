<?php
require '../dbconnection.php';

/**
 * Funzione per ottenere tutti i prodotti presenti nel database
 */

$rows = $db->query('SELECT name FROM product');
$result = array();
if ($rows) {
    foreach($rows as $row) {
        $result[] = $row['name'];
    }
}
echo json_encode($result, JSON_THROW_ON_ERROR, 512);
$db = null;
