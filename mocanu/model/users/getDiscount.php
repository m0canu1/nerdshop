<?php
/**
 * Funzione per ottenere lo sconto di un dato utente
 */

include('../common.php');
require '../dbconnect.php';

function getDiscount($user) {
    $stmt = $db->prepare('SELECT discount FROM user WHERE username = ?');
    $data = $stmt->execute(array($user));
    if ($data) {
        var_dump($data);
        return $data['discount'];
    }
}
$discount = getDiscount($_SESSION["user"]);
echo json_encode($discount);
