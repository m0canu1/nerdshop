<?php
  /**
   * Rimozione di un prodotto dal Carrello di un dato utente
   *
   */

  require '../dbconnect.php';
  require '../getUserId.php';

  $id_prod = $_POST['id'];
  $user = $_POST['user'];
  $id_user = getUserId($user);
  $sql = "DELETE FROM cart WHERE (id_user = $id_user AND id_product = $id_prod)";
  if($sql){
    $db->exec($sql);
    $db = null;
    echo json_encode(array('msg'=>"Il prodotto è stato rimosso."));
  } else {
    $db = null;
    echo json_encode(array('msg'=>"Il prodotto non è stato rimosso a causa di un errore."));
  }

?>
