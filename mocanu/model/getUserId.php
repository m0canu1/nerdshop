<?php

function getUserId($username)
{
    require '../dbconnection.php';

    $stmt = $db->prepare('SELECT id FROM user WHERE username = ?');
    $stmt->execute(array($username));

    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    $db = null;

    return $data['id'];

}