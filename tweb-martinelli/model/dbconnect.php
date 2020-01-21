<?php
  /**
   * Connessione al DBMS
   *
   */

  try {
    $dsn = 'mysql:dbname=twebdb;host=localhost;';
    $db = new PDO($dsn, 'root');
    // attributo per il report degli errori
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  } catch (PDOException $exception) {
    echo 'Error with the database.';
    $exception->getMessage();
  }

?>
