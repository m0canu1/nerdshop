<?php
/**
 * Funzione per ottenere tutti gli ordini da parte di un utente
 */

require '../dbconnection.php';
require '../common.php';

$id_user = getUserId($_SESSION['user']);
$id_user = $db->quote($id_user);

$rows = $db->query("SELECT * FROM ordine WHERE id_user = $id_user ORDER BY id DESC");
$r = array();
if ($rows) {
    foreach($rows as $row)
        $r[] = $row;
}
$db = null;
echo json_encode($r);