<?php
  require 'common.php';
  echo json_encode(array('user'=>$_SESSION['user']));
?>
