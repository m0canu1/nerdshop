<?php
  /**
   * Funzione per ottenere tutti i prodotti presenti nella Wishlist di un dato utente
   *
   */

  require '../common.php';
  require '../dbconnect.php';
  require '../getUserId.php';

  $id_user = getUserId($_SESSION['user']);
  $rows = $db->query("SELECT * FROM product JOIN wish WHERE (wish.id_user = '$id_user'
    AND wish.id_product = product.id)");
  $r = array();
  if ($rows) {
    foreach($rows as $row)
      $r[] = $row;
  }
  $db = null;
  echo json_encode($r);

?>
