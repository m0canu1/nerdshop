<?php

require '../dbconnection.php';

if (!isset($_SESSION)) {
    session_start();
}

if (!$_POST['username'] || !$_POST['password']) {
    echo json_encode(array('msg'=>'Errore. Compilare entrambi i campi.'));
} elseif (!ctype_alpha($_POST['username'])) {
        echo json_encode(array('msg' => 'Caratteri non validi nell\'username.'));
} else {
    echo $_POST['username'];
    echo $_POST['password'];
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    if (checkPassword($username, $password)) {
        if (isset($_SESSION)) session_regenerate_id(true);
        $_SESSION['user'] = $username;
        echo json_encode(array('url' => 'view/home.php', 'msg'=>'Bentornato ' . $username . '!'));
    } else {
        echo json_encode(array('msg'=>'Username o password non validi.'));
    }

}
function checkPassword($username, $password)
{
    $stmt = $db->prepare('SELECT * FROM user WHERE username = ? AND password = ?');
    $stmt->execute(array($username, $password));
    echo $stmt->rowCount();
    if ($stmt->rowCount()) {
        echo json_encode(array('msg' => 'trovato uno stronzo'));
        return true;
    }
    echo json_encode(array('msg' => 'nessuno stronzo'));
    return false;
}