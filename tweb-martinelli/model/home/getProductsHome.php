<?php
  /**
   * Funzione per ottenere i nomi e i prezzi di tutti i prodotti presenti nel database
   *
   */

  require '../dbconnect.php';
  $rows = $db->query('SELECT name, price FROM product');
  $r = array();
  if ($rows) {
    foreach($rows as $row)
      $r[] = $row;
  }
  $db = null;
  echo json_encode($r);
?>
