<?php
  /**
   * Creazione di un nuovo ordine
   *
   */

  require '../dbconnect.php';

  if(!$_POST['fname'] || !$_POST['lname'] || !$_POST['addrs'] || !$_POST['city'] || !$_POST['cap']){
    echo json_encode(array('msg'=>"Errore durante l'acquisto, inserire tutti i campi."));
    exit;
  }

  if(!ctype_alpha($_POST['fname']) || !ctype_alpha($_POST['lname'])) {
    echo json_encode(array('msg'=>"Non sono ammessi caratteri speciali."));
    exit;
  }

  $user = $_POST['user'];
  $fname= $_POST['fname'];
  $lname= $_POST['lname'];
  $addrs= $_POST['addrs'];
  $city= $_POST['city'];
  $cap= $_POST['cap'];
  $product= $_POST['product'];
  $shipment= $_POST['shipment'];

  date_default_timezone_set('Europe/Rome');
  $date = date('Y/m/d', time());

  $id_user = getUserId($user);
  $id_prod = getProdId($product);

  if(strcmp(trim($shipment),"free") == 0) {
    $shipment = 0;
  } else if (strcmp(trim($shipment),"two") == 0) {
    $shipment = 2.99;
  } else {
   $shipment = 4.99;
  }

  $discount = getDiscount($user);
  $cost = getPrice($product) + $shipment - $discount;
  $sql = "INSERT INTO ordine (id, id_user, id_product, cost, name, surname, address, city, cap, data)
    VALUES (DEFAULT, $id_user, $id_prod, $cost, '$fname', '$lname', '$addrs', '$city', $cap, '$date')";
  $db->query($sql);
  $quantity = getQuantity($product);
  $stmt = "UPDATE product SET quantity = ? WHERE name = ?";
  $db->prepare($stmt)->execute([$quantity-1, $product]);
  $stmt = "UPDATE user SET discount = ? WHERE id = ?";
  $db->prepare($stmt)->execute([0, $id_user]);
  $remfromcart = "DELETE FROM cart WHERE (id_user = $id_user AND id_product = $id_prod)";

  if($remfromcart){
    $db->exec($remfromcart);
  } else {
    $db = null;
    echo json_encode(array('msg'=>"Errore durante l'acquisto, riprovare."));
  }
  $db = null;
  echo json_encode(array('msg'=>"Il prodotto è stato acquistato!"));
?>

<?php
  function getQuantity($product){
    require '../dbconnect.php';
    $rows = $db->query("SELECT quantity FROM product WHERE name = '$product'");
    if ($rows) {
      foreach($rows as $row) {
        $quantity = (int) $row['quantity'];
        return $quantity;
      }
    } else {
      return false;
    }
  } // quantità di un dato prodotto

  function getPrice($product){
    require '../dbconnect.php';
    $rows = $db->query("SELECT price FROM product WHERE name = '$product'");
    if ($rows) {
      foreach($rows as $row) {
        $price = $row['price'];
        return $price;
      }
    } else {
      return false;
    }
  } // prezzo di un dato prodotto

  function getDiscount($user){
    require '../dbconnect.php';
    $rows = $db->query("SELECT discount FROM user WHERE username = '$user'");
    if ($rows) {
      foreach($rows as $row) {
        $discount = $row['discount'];
        return $discount;
      }
    } else {
      return false;
    }
  } // sconto di un dato utente

  function getUserId($username){
    require '../dbconnect.php';
    $user = $db->quote($username);
    $rows_user = $db->query("SELECT id FROM user WHERE username = $user");
    if ($rows_user) {
      foreach($rows_user as $row)
        return $row['id'];
    }
  } // id di un dato utente

  function getProdId($product){
    require '../dbconnect.php';
    $prod = $db->quote($product);
    $rows_prod = $db->query("SELECT id FROM product WHERE name = $prod");
    if ($rows_prod) {
      foreach($rows_prod as $row)
        return $row['id'];
    }
  } // id di un dato prodotto
?>
