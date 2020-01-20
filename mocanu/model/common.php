<?php

$root = $_SERVER["DOCUMENT_ROOT"];

//TODO forse superfluo
if (!isset($_SESSION)) {
    session_start();
} // controllo di $_SESSION

/**
 * controllo di $_SESSION['user'], se non è presente si ritorna a index.php
 */
if (!isset($_SESSION['user'])) {
    header('Location: ../index.php');
    return;
}

