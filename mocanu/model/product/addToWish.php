<?php
//TODO CONTROLLARE CHE FUNZIONI
require '../dbconnection.php';
require '../common.php';

$id_prod = $_POST['id'];
$id_user = getUserId($_POST['user']);

echo addToWish($id_user, $id_prod);
