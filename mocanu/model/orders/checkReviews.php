<?php
/**
 * Funzione per verificare la presenza di una recensione
 */

require '../dbconnection.php';
require '../common.php';

// TODO DUBBI SULLA QUERY
$id_user = getUserId($_SESSION['user']);

$id_user = $db->quote($id_user);
$rows = $db->query("SELECT id_product FROM review WHERE review.id_user IN
    ( SELECT id_user FROM ordine WHERE ordine.id_user = $id_user)");
$r = array();
if ($rows) {
    foreach($rows as $row)
        $r[] = $row;
}
$db = null;
echo json_encode($r);