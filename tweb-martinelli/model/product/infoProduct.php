<?php
  /**
   * Funzione per ottenere tutte le informazioni di un dato prodotto
   *
   */

  require '../common.php';
  require '../dbconnect.php';

  $product = $_SESSION['product'];

  $rows = $db->query("SELECT * FROM product WHERE name='$product'");
  $r = array();
  if ($rows) {
    foreach($rows as $row)
      $r[] = $row;
  }
  $db = null;
  echo json_encode($r);

?>
