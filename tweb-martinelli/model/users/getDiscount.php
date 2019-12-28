<?php
  /**
   * Funzione per ottenere lo sconto di un dato utente
   *
   */

  include('../common.php');

  function getDiscount($user) {
    require '../dbconnect.php';
    $rows_user = $db->query("SELECT discount FROM user WHERE username = '$user'");
    if ($rows_user) {
      foreach($rows_user as $row)
        return $row['discount'];
    }
  }
  $discount = getDiscount($_SESSION["user"]);
  echo json_encode($discount);
?>
