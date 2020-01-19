<?php

function getUserId($username)
{
    require '../dbconnection.php';

    $stmt = $db->prepare('SELECT id FROM user WHERE username = ?');
    $stmt->execute($username);

    $db = null;

    return $data = $stmt->fetch();

}