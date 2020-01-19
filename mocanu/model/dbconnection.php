<?php
/**
 * Connessione al DBMS
 */

    $hostname = 'localhost';
    $dbname = 'twebdb';
    $user = 'root';
    $pass = 'root';

try {
    $db = new PDO ("mysql:host=$hostname;dbname=$dbname", $user, $pass);
    // attributo per il report degli errori
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $exception) {
    echo 'Database error:';
    echo $exception->getMessage();
}

