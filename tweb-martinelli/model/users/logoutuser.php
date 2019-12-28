<?php
  /**
   * Logout da parte dell'utente
   * Distruzione della sessione
   */
   
  include("../common.php");
  session_unset();
  session_destroy();
  session_start();
  setFlashMsg("Logout effettuato, arrivederci!");
  echo json_encode(array("url"=>"../index.php"));

  function setFlashMsg($flash_message = NULL){
    if($flash_message) $_SESSION["flash"] = $flash_message;
  } // messaggio da mostrare
?>
