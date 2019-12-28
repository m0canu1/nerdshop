<?php
  /**
   * Inserimento di un prodotto nella Wishlist di un dato utente
   *
   */

  require '../dbconnect.php';
  require '../getUserId.php';

  $id_prod = $_POST['id'];
  $user = $_POST['user'];
  $id_user = getUserId($user);

  if(checkUserAndProd($id_user, $id_prod)){
    $db = null;
    echo json_encode(array('msg'=>"Il prodotto è già presente nella wishlist."));
  } else {
    $sql = "INSERT INTO wish (id_user, id_product)
      VALUES ('$id_user', '$id_prod')";
    $db->exec($sql);
    $db = null;
    echo json_encode(array('msg'=>"Il prodotto è stato aggiunto alla wishlist!"));
  }

  function checkUserAndProd($id_user, $id_prod){
    require '../dbconnect.php';
    $rows = $db->query("SELECT * FROM wish WHERE (id_user = '$id_user' AND
      id_product = '$id_prod')");
    if($rows->rowCount() > 0)
      return true;
    else
      return false;
  } // verifica corrispondenza tra id_utente e id_prodotto

?>
