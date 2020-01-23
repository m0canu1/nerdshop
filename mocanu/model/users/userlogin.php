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
    $password = $_POST['password'];
    if (checkPassword($username, $password)) {
        if (isset($_SESSION)) session_regenerate_id(true);
        $_SESSION['user'] = $username;
        echo json_encode(array('url' => 'view/home.php', 'msg' => 'Bentornato ' . $username . '!'), JSON_THROW_ON_ERROR, 512);
    } else {
//        setFlashMsg("Username o password non validi.");
        echo json_encode(array('url' => 'view/home.php', 'msg' => 'Username o password non validi.'), JSON_THROW_ON_ERROR, 512);
    }

}
function checkPassword($username, $password)
{
    require '../dbconnection.php';
    $stmt = $db->prepare('SELECT password FROM user WHERE username = ?');

    $stmt->execute(array($username));
    $hash = $stmt->fetch(PDO::FETCH_ASSOC);

//    echo $hash['password'];

    if (password_verify($password, $hash['password'])) {
        return true;
    } else {
        return false;
    }
}

function setFlashMsg($flash_message = NULL){
    if($flash_message) $_SESSION["flash"] = $flash_message;
} // messaggio da mostrare