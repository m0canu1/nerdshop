<?php
  if(!isset($_SESSION)) session_start(); // controllo di $_SESSION

  if(!isset($_SESSION['user'])) {
      header('Location: ../index.php');
      return;
  } // controllo di $_SESSION['user'], se non è presente si ritorna a index.php
?>
