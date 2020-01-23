<?php
//TODO CONTROLLARE CHE FUNZIONI
require '../dbconnection.php';
require '../common.php';

$id_prod = $_POST['id'];
$user = $_POST['user'];
$id_user = getUserId($user);

if (checkWish($id_user, $id_prod)) {
    $db = null;
    echo json_encode(array('msg' => "Il prodotto è già presente nella wishlist."));
} else {
    $stmt = $db->prepare('INSERT INTO wish (id_user, id_product) VALUES (?, ?)');
    $stmt->execute(array($id_user, $id_prod));
    $db = null;
    echo json_encode(array('msg'=>"Il prodotto è stato aggiunto alla wishlist!"));
}

