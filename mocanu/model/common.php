<?php

$root = $_SERVER["DOCUMENT_ROOT"];

require 'dbconnection.php';

//TODO forse superfluo
if (!isset($_SESSION)) {
    session_start();
} // controllo di $_SESSION

/**
 * controllo di $_SESSION['user'], se non è presente si ritorna a index.php
 */
if (!isset($_SESSION['user'])) {
    header('Location: ../index.php');
    return;
}

/**
 * Verifico la presenza del prodotto nel carrello dell'utente
 * @param $id_user
 * @param $id_prod
 * @return bool
 */
function checkWish($id_user, $id_prod)
{
    $id_prod = $db->quote($id_prod);
    $id_user = $db->quote($id_user);
    $rows = $db->query("SELECT * FROM wish WHERE id_product = $id_prod and id_user = $id_user");

    if ($rows->rowCount() > 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * Verifico la presenza del prodotto nel carrello dell'utente
 * @param $id_user
 * @param $id_prod
 * @return bool
 */
function checkCart($id_user, $id_prod)
{
    $id_prod = $db->quote($id_prod);
    $id_user = $db->quote($id_user);
    $rows = $db->query("SELECT * FROM cart WHERE id_product = $id_prod and id_user = $id_user");

    if ($rows->rowCount() > 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * Trova l'id di un prodotto
 * @param $product
 * @return mixed
 * TODO ERRORE QUIIIIII
 */
function getProdId($product)
{
    require 'dbconnection.php'; //con questo pare funzionare

    //TODO funziona?
    $product = $db->quote($product);
    $rows = $db->query("SELECT id FROM product WHERE name = $product");
    $data = $rows->fetch();
    return $data['id'];
////    foreach($rows as $row) {
////        return $row["id"];
////    }
//
}

//function getProdId($product){
//    require 'dbconnection.php';
//    $prod = $db->quote($product);
//    $rows_prod = $db->query("SELECT id FROM product WHERE name = $prod");
//    if ($rows_prod) {
//        foreach($rows_prod as $row)
//            return $row['id'];
//    }
//}


/**
 * Trova l'id dell'utente
 * @param $username
 * @return mixed
 */
function getUserId($username)
{
    $username = $db->quote($username);
    $rows = $db->query("SELECT id FROM user WHERE username = $username");

    foreach($rows as $row) {
        return $row["id"];
    }
}


/**
 * Trova lo sconto spettante ad un dato utente
 * @param $user
 * @return mixed
 */
function getDiscount($user)
{
    $user = $db->quote($user);
    $rows = $db->query("SELECT discount FROM user WHERE username = $user");
    //TODO verificare rimozione if e ritorno di false dopo foreach
    if ($rows) {
        foreach($rows as $row) {
            return $row['discount'];
        }
    } else {
        return false;
    }
}

//$discount = getDiscount($_SESSION["user"]);
//echo json_encode($discount);

/**
 * @param $product
 * @return bool|mixed
 */
function getProductPrice($product){

    $product = $db->quote($product);
    $rows = $db->query("SELECT price FROM product WHERE name = $product");
    if ($rows) {
        foreach($rows as $row) {
            $price = $row['price'];
            return $price;
        }
    } else {
        return false;
    }
}


function getProdQuantity($product)
{
    $product = $db->quote($product);
    $rows = $db->query("SELECT quantity FROM product WHERE name = $product");
    if ($rows) {
        foreach($rows as $row) {
            return (int) $row['quantity'];
        }
    } else {
        return false;
    }
}


/**
 * Diminuisce la quantita' disponibile del prodotto di quella indicata
 * @param $id_prod
 * @param $quantity
 * TODO testare funzionamento
 */
function updateProdQuantity($id_prod, $quantity)
{
    $quantity = getProdQuantity($id_prod) + $quantity;
    $quantity = $db->quote($quantity);
    $id_prod = $db->quote($id_prod);
    $db->exec("UPDATE product SET quantity = $quantity WHERE id = $id_prod");
}

/**
 * Elimina lo sconto di un utente
 * @param $id_user
 */
function removeUserDiscount($id_user)
{
    $db->exec("UPDATE user SET discount = 0 WHERE id = $id_user");
}

/**
 * Rimuove il prodotto dal carrello dell'utente
 * @param $id_user
 * @param $id_prod
 * @return mixed
 */
function removeFromCart($id_user, $id_prod)
{
    $id_user = $db->quote($id_user);
    $id_prod = $db->quote($id_prod);
    return $db->exec("DELETE FROM cart WHERE id_user = $id_user and id_product = $id_prod");
}

/**
 * Restituisce l'username dell'utente dall'id fornito
 * @param $id_user
 * @return mixed
 */
function getUsername($id_user)
{
    $rows = $db->query("SELECT username FROM user WHERE id = $id_user");
    if ($rows) {
        foreach($rows as $row)
            return $row['username'];
    }
}