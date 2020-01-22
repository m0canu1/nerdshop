<?php
//TODO CONTROLLARE CHE FUNZIONI
require '../dbconnection.php';
require '../getUserId.php';

$id_prod = $_POST['id'];
$user = $_POST['user'];
$id_user = getUserId($user);

if (checkUserAndProd($id_user, $id_prod)) {
    $db = null;
    echo json_encode(array('msg' => "Il prodotto è già presente nella wishlist."));
} else {
    $stmt = $db->prepare('INSERT INTO wish (id_user, id_product) VALUES (?, ?)');
    $stmt->execute(array($id_user, $id_prod));
    $db = null;
    echo json_encode(array('msg'=>"Il prodotto è stato aggiunto alla wishlist!"));
}




function checkUserAndProd($id_user, $id_prod)
{
    require '../dbconnection.php';
    $stmt = $db->prepare('SELECT * FROM wish WHERE id_product = ? and id_user = ?');
    $stmt->execute(array($id_prod, $id_user));
    $rows = $stmt->fetchAll();

    if ($rows->rowCount() > 0) {
        return true;
    } else {
        return false;
    }

}