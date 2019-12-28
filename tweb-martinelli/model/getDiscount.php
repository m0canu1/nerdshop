<?php
  /**
   * Funzione per ottenere lo sconto, se presente, di un dato utente
   *
   */

  require '../model/dbconnect.php';
  require '../model/common.php';

  $user = $_SESSION['user'];
  $id_user = getUserId($user);
  $rows = $db->query("SELECT discount FROM user WHERE id = '$id_user'");
  $db = null;
  if ($rows) {
    foreach($rows as $row) {
      $discount = $row['discount'];
      echo json_encode(array('discount'=>$discount));
    }
  } else {
    return false;
  }

  function getUserId($username){
    require '../model/dbconnect.php';
    $user = $db->quote($username);
    $rows_user = $db->query("SELECT id FROM user WHERE username = $user");
    if ($rows_user) {
      foreach($rows_user as $row)
        return $row['id'];
    }
  } // id di un dato username
?>
