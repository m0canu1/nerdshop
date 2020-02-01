<?php
/**
 * Inserimento di una recensione per un dato prodotto
 */

require '../dbconnection.php';
require '../common.php';

$username = $_POST['user'];
$title = $_POST['titlereview'];
$title = htmlspecialchars($title); //TODO cosa fa?
$product = $_POST['prodreview'];
$body = $_POST['bodyreview'];
$body = htmlspecialchars($body);
date_default_timezone_set('Europe/Rome');
$date = date('Y/m/d', time());
$id_user = getUserId($username);
$id_prod = getProdId($product);

$id_user = $db->quote($id_user);
$id_prod = $db->quote($id_prod);
$title = $db->quote($title);
$body = $db->quote($body);
$date = $db->quote($date);

$db->query("INSERT INTO review (id, id_user, id_product, title, description, data) VALUES (DEFAULT, $id_user, $id_prod, $title, $body, $date)");
echo json_encode(array('msg'=>"Recensione aggiunta con successo!"));
