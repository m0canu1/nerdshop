<?php
/**
 * Funzione per ottenere le informazioni dei prodotti acquistati da un dato utente
 */
require '../dbconnection.php';
require '../common.php';

$id_user = getUserId($_SESSION['user']);
$id_user = $db->quote($id_user);

// TODO DUBBI SULLA QUERY

$rows = $db->query("SELECT id, name FROM product WHERE id IN (
    SELECT id_product FROM ordine WHERE id_user = $id_user)");
$r = array();
if ($rows) {
    foreach($rows as $row)
        $r[] = $row;
}
$db = null;
echo json_encode($r);