<?
  /**
   * Funzione per ottenere tutte le recensioni di un dato prodotto
   *
   */

  require '../common.php';
  require '../dbconnect.php';

  $product = $_SESSION['product'];
  $id_prod = getProdId($product);
  $rows = $db->query("SELECT * FROM review WHERE id_product = $id_prod");
  $r = array();
  if ($rows) {
    foreach($rows as $row)
      $r[] = $row;
  }

  $i = 0;
  while($i < count($r)){
    $r[$i][1] = getUserReview($r[$i][1]);
    $i++;
  }
  $db = null;
  echo json_encode($r);

  function getProdId($product){
    require '../dbconnect.php';
    $prod = $db->quote($product);
    $rows_prod = $db->query("SELECT id FROM product WHERE name = $prod");
    if ($rows_prod) {
      foreach($rows_prod as $row)
        return $row['id'];
    }
  } // id di un dato prodotto

  function getUserReview($id_user){
    require '../dbconnect.php';
    $rows = $db->query("SELECT username FROM user WHERE id = $id_user");
    if ($rows) {
      foreach($rows as $row)
        return $row['username'];
    }
  } // recensioni di un dato utente

?>
