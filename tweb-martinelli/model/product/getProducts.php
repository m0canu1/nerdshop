<?php
  /**
   * Funzione per ottenere tutti i prodotti presenti nel database
   *
   */

  require '../dbconnect.php';
  $rows = $db->query("SELECT name FROM product");
  $r = array();
  if ($rows) {
    foreach($rows as $row)
      $r[] = $row['name'];
  }
  $db = null;
  echo json_encode($r);

?>
