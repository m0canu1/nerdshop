<?php
/**
 * Registrazione di un nuovo utente
 */

if (!isset($_SESSION)) session_start();
require '../dbconnection.php';

/**
 * Vengono controllati i dati immessi dall'utente.
 * Casi in cui una registrazione fallisce:
 * 1) qualche campo del form non è stato compilato
 * 2) l'indirizzo email o username è già stato usato.
 */

if (!$_POST['username'] || !$_POST['password'] || !$_POST['email'] || !$_POST['firstname'] || !$_POST['lastname']) {
    //TODO al posto del messaggio, controllare a livello di jquery la compilazione dei campi
    echo json_encode(array('msg' => 'Registrazione non avvenuta con successo, compilare tutti i campi.'));
} else if (isset($_POST['username']) && isset($_POST['password'])) {
    $user = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $email = $_POST['email'];
    $fname = $_POST['firstname'];
    $lname = $_POST['lastname'];
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        /**
         * TODO SCRIVERE IN RELAZIONE:
         * prova ad eseguire la query per l'inserimento dell'utente nel db
         * se l'email o il nome utente sono già presenti (campi unici nel db
         * restituirà l'eccezione con codice errore 23000
         */
        try {
            $stmt = $db->prepare('INSERT INTO user (username, password, firstname, lastname, email)  VALUES (?,?,?,?,?)');
            $stmt->execute(array($user, $password, $fname, $lname, $email));
            echo json_encode(array('msg'=>'Registrazione avvenuta con successo. Effettuare l\'accesso.', 'status'=>true));
        } catch (PDOException $exception) {
            if ($exception->errorInfo[1] === 1062) {
                echo json_encode(array('msg'=>'Registrazione non avvenuta, nome utente già presente.', 'status'=>false));
            }
        }

    } else {
        //TODO a che serve?
        echo json_encode(array("msg"=>"L'mail inserita non è valida, controllare."));
    }

}

function setFlashMsg($flash_message = NULL)
{
    if($flash_message) $_SESSION['flash'] = $flash_message;
}