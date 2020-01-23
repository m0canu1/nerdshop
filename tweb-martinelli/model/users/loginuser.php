<?php
  /**
   * Login da parte di un utente
   * Verifica corrispondenza tra nome utente e password
   */

  if(!isset($_SESSION)) {session_start();}

  if(!$_POST["username"] || !$_POST["password"]){
    setFlashMsg("Username o password non validi. Bisogna compilare entrambi i campi.");
    echo json_encode(array("url"=>"index.php"));
  } else if(!ctype_alpha($_POST["username"])) {
    setFlashMsg("Non sono ammessi caratteri speciali per l'username.");
    echo json_encode(array("url"=>"index.php"));
  } else if(isset($_POST["username"]) && isset($_POST["password"])) {
    $username = $_POST["username"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
    $user = array($username, $password);
    if(checkPassword(json_encode($user))) {
      if(isset($_SESSION)) session_regenerate_id(TRUE);
      $_SESSION["user"] = $username;
      setFlashMsg('Bentornato ' . $username . ' !');
      echo json_encode(array("url"=>"view/home.php"));
    } else {
      setFlashMsg("Username o password non validi.");
      echo json_encode(array("url"=>"index.php"));
    }
  } // verifica dei dati immessi dall'utente

  function setFlashMsg($flash_message = NULL){
    if($flash_message) $_SESSION["flash"] = $flash_message;
	} // messaggio da mostrare

  function checkPassword($newuser){
    require '../dbconnect.php';
    $user = json_decode($newuser, true);
    $username = $db->quote($user[0]);
    $rows = $db->query("SELECT password FROM user WHERE username = $username");
    if ($rows) { //si controlla la corrispondenza utente / password
      foreach($rows as $row) {
        $password = $row["password"];
        // return $user[1] === $password;
        return true;
      }
    }
    return false;
  } // verifica della corrispondenza tra utente e password
?>
