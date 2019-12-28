<?php
  /**
   * Registrazione da parte di un nuovo utente
   *
   */

  if(!isset($_SESSION)) session_start();
  require '../dbconnect.php';

  /**
   * Vengono controllati i dati immessi dall'utente.
   * Casi in cui la registrazione fallisce:
   * 1) qualche campo del form non è stato compilato;
   * 2) l'indirizzo mail o username è già stato usato.
   */
  if(!$_POST["username"] || !$_POST["password"] || !$_POST["mail"] || !$_POST["firstname"] ||
  !$_POST['lastname']){
    setFlashMsg("Registrazione non avvenuta, compilare tutti i campi.");
    echo json_encode(array("msg"=>"Registrazione non avvenuta, compilare tutti i campi."));
  } else if(!ctype_alpha($_POST["username"])){
    setFlashMsg("Registrazione non avvenuta, non sono ammessi caratteri speciali per l'username.");
    echo json_encode(array("msg"=>"Registrazione non avvenuta, non sono ammessi caratteri speciali per l'username."));
  } else if(isset($_POST["username"]) && isset($_POST["password"])) {
    $user = $_POST['username'];
    $password = md5($_POST['password']);
    $email = $_POST['mail'];
    $fname = $_POST['firstname'];
    $lname = $_POST['lastname'];
    $searchString = '@';
    if(strpos($email, $searchString) !== false ) {
      $rows_user = $db->query("SELECT username FROM user WHERE username = '$user'");
      $rows_mail = $db->query("SELECT mail FROM user WHERE mail = '$email'");

      if(($rows_user->rowCount() > 0) || ($rows_mail->rowCount() > 0)){
        setFlashMsg("Registrazione non avvenuta, nome utente già presente.");
        echo json_encode(array("msg"=>"Registrazione non avvenuta, nome utente già presente."));
      } else {
        $sql = "INSERT INTO user (id, username, password, name, surname, mail, discount)
        VALUES (DEFAULT, '$user', '$password', '$fname', '$lname', '$email', 0)";
        $db->exec($sql);
        setFlashMsg("Registrazione avvenuta. Effettuare l'accesso.");
        echo json_encode(array("msg"=>"Registrazione avvenuta."));
      }
      return;
    }
    setFlashMsg("Mail inserita non valida, riprovare.");
    echo json_encode(array("msg"=>"Mail inserita non valida, riprovare."));
  }

  function setFlashMsg($flash_message = NULL) {
    if($flash_message) $_SESSION["flash"] = $flash_message;
  } // messaggio da mostrare
?>
