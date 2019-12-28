<?php
  /**
   * Inserimento di una recensione per un dato prodotto
   *
   */

  require '../dbconnect.php';

  $username = $_POST['user'];
  $title = $_POST['titlereview'];
  $title = htmlspecialchars($title);
  $product = $_POST['prodreview'];
  $body = $_POST['bodyreview'];
  $body = htmlspecialchars($body);
  date_default_timezone_set('Europe/Rome');
  $date = date('Y/m/d', time());
  $id_user = getUserId($username);
  $id_prod = getProdId($product);

  $sql = "INSERT INTO review (id, id_user, id_product, title, description, data)
    VALUES (DEFAULT, $id_user, $id_prod, '$title', '$body', '$date')";
  $db->exec($sql);
  $db = null;
  echo json_encode(array('msg'=>"Recensione aggiunta con successo!"));

  function getUserId($username){
    require '../../model/dbconnect.php';
    $user = $db->quote($username);
    $rows_user = $db->query("SELECT id FROM user WHERE username = $user");
    if ($rows_user) {
      foreach($rows_user as $row)
        return $row['id'];
    }
  } // id di un dato utente

  function getProdId($product){
    require '../../model/dbconnect.php';
    $prod = $db->quote($product);
    $rows_prod = $db->query("SELECT id FROM product WHERE name = $prod");
    if ($rows_prod) {
      foreach($rows_prod as $row)
        return $row['id'];
    }
  } // id di un dato prodotto
?>
