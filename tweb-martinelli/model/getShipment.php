<?php
  require 'common.php';
  echo json_encode(array('shipment'=>$_SESSION['shipment']));
?>
