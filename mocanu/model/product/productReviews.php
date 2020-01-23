<?php

/**
 * Funzione per ottenere tutte le recensioni di un prodotto
 */

require '../dbconnection.php';
require '../common.php';

$product = $_SESSION['product'];
$id_prod = getProdId($product);
$id_prod = $db->quote($id_prod);
$rows = $db->query("SELECT * FROM review WHERE id_product = $id_prod");
$r = $rows->fetchAll(PDO::FETCH_ASSOC);
//print_r($r);
//
////if ($rows) {
////    foreach($rows as $row)
////        $r[] = $row;
////}
////
//////TODO FORTISSIMI DUBBI
//$i = 0;
//while($i < count($r)){
//    $r[$i][1] = getUsername($r[$i][1]);
//    $i++;
//}
//$db = null;
//
//print_r($r);

echo json_encode($r);