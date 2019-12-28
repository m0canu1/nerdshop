<?php
  /**
   * Inserimento di un prodotto nel Carrello di un dato utente
   * Funzione utilizzata durante il Drag & Drop
   */

  require '../dbconnect.php';
  require '../getUserId.php';

  $user = substr($_POST['user'], 0);
  $name = substr($_POST['name'], 0);
  $id_user = getUserId($user);
  $id_prod = getProdId($name);

  if(checkUserAndProd($id_user, $id_prod)){
    $db = null;
    echo json_encode(array("msg"=>"Il prodotto $_POST[name] è già presente nel carrello."));
  } else {
    $sql = "INSERT INTO cart (id_user, id_product) VALUES ('$id_user', '$id_prod')";
    $db->exec($sql);
    $db = null;
    echo json_encode(array("msg"=>"Il prodotto $_POST[name] è stato aggiunto al carrello."));
  }

  function checkUserAndProd($id_user, $id_prod){
    require '../dbconnect.php';
    $rows = $db->query("SELECT * FROM cart WHERE (id_user = '$id_user' AND
      id_product = '$id_prod')");
    if($rows->rowCount() > 0)
      return true;
    else
      return false;
  } // verifica corrispondenza tra id_utente e id_prodotto

  function getProdId($product){
    require '../../model/dbconnect.php';
    $prod = $db->quote($product);
    $rows_prod = $db->query("SELECT id FROM product WHERE name = $prod");
    if ($rows_prod) {
      foreach($rows_prod as $row) {
        return $row["id"];
      }
    }
  }  // id di un dato prodotto
?>
