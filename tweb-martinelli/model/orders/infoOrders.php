<?php
  /**
   * Funzione per ottenere tutti gli ordini da parte di un utente
   *
   */

  require '../common.php';
  require '../dbconnect.php';
  require '../getUserId.php';

  $id_user = getUserId($_SESSION['user']);
  $rows = $db->query("SELECT * FROM ordine WHERE id_user = '$id_user' ORDER BY id DESC");
  $r = array();
  if ($rows) {
    foreach($rows as $row)
      $r[] = $row;
  }
  $db = null;
  echo json_encode($r);

?>
