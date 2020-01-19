<?php

if (!isset($_SESSION)) {
    session_start();
}

if (!$_POST['username'] || !$_POST['password']) {
    echo json_encode(array('msg' => 'Errore. Compilare entrambi i campi.'), JSON_THROW_ON_ERROR, 512);
} elseif (!ctype_alpha($_POST['username'])) {
        echo json_encode(array('msg' => 'Caratteri non validi nell\'username.'), JSON_THROW_ON_ERROR, 512);
} else {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    if (checkPassword($username, $password)) {
        if (isset($_SESSION)) session_regenerate_id(true);
        $_SESSION['user'] = $username;
        echo json_encode(array('url' => 'view/home.php', 'msg' => 'Bentornato ' . $username . '!'), JSON_THROW_ON_ERROR, 512);
    } else {
        echo json_encode(array('msg' => 'Username o password non validi.'), JSON_THROW_ON_ERROR, 512);
    }

}
function checkPassword($username, $password)
{
    require '../dbconnection.php';
    $stmt = $db->prepare('SELECT firstname FROM user WHERE username = ? AND password = ?');
    $data = $stmt->execute(array($username, $password));
    if ($data) {
        return $data;
    }
    return false;
}