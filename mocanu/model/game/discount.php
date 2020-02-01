<?php
/**
 * Aggiunta di uno sconto per un dato utente
 */

require '../dbconnection.php';
require '../common.php';

$id_user = getUserId($_SESSION["user"]);

$id_user = $db->quote($id_user);
$db->query("UPDATE user SET discount = 20, where id = $id_user");
echo json_encode(array('msg'=>"Sconto applicato con successo!"));
