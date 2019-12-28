<?php
  /**
   * Funzione per verificare la presenza di una recensione
   *
   */

  require '../dbconnect.php';
  require '../common.php';

  $id_user = getUserId($_SESSION['user']);
  $rows = $db->query("SELECT id_product FROM review WHERE review.id_user IN
    ( SELECT id_user FROM ordine WHERE ordine.id_user = '$id_user')");
  $r = array();
  if ($rows) {
    foreach($rows as $row)
      $r[] = $row;
  }
  $db = null;
  echo json_encode($r);

  function getUserId($username){
    require '../dbconnect.php';
    $user = $db->quote($username);
    $rows_user = $db->query("SELECT id FROM user WHERE username = $user");
    if ($rows_user) {
      foreach($rows_user as $row)
        return $row['id'];
    }
  } // id di un dato utente
?>
