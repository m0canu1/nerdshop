<?php
  /**
   * Aggiunta di uno sconto per un dato utente
   *
   */

  include("../common.php");
  require '../dbconnect.php';
  require '../getUserId.php';

  $id_user = getUserId($_SESSION["user"]);
  $stmt = "UPDATE user SET discount = ? WHERE id = ?";
  $db->prepare($stmt)->execute([20,   $id_user]);
  echo json_encode(array("msg"=>"Sconto applicato con successo!"));

?>
