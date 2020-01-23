<?php

//fetchAll — Returns an array containing all of the result set rows
//fetch — Fetches the next row from a result set

$stmt = $db->prepare('SELECT password FROM user WHERE username = ?');

$stmt->execute(array($username));
$data = $stmt->fetch(PDO::FETCH_ASSOC);
echo $data['password'];


$result = $stmt->fetchAll();
$db = null;
echo json_encode($result);


$rows = $db->query("SELECT * FROM wish WHERE (id_user = '$id_user' AND
      id_product = '$id_prod')");
if($rows->rowCount() > 0)
    return true;
else
    return false;


try {
    $stmt = $db->prepare('INSERT INTO user (username, password, firstname, lastname, email)  VALUES (?,?,?,?,?)');
    $stmt->execute(array($user, $password, $fname, $lname, $email));
    echo json_encode(array('msg'=>'Registrazione avvenuta con successo. Effettuare l\'accesso.', 'status'=>true));
} catch (PDOException $exception) {
    if ($exception->errorInfo[1] === 1062) {
        echo json_encode(array('msg'=>'Registrazione non avvenuta, nome utente già presente.', 'status'=>false));
    }
}