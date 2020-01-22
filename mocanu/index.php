<!--
L'utente, per poter usufruire dei vari servizi del sito, ha bisogno di accedere o effettuare la-->
<!--registrazione.
-->
<?php
include('view/top.html');
if (!isset($_SESSION)) session_start();
if(isset($_SESSION["flash"])) {
    ?>
    <div id="flash"> <?= $_SESSION["flash"] ?></div>
    <?php
    unset($_SESSION["flash"]);
}
include('view/login.php');
include('view/bottom.html');
?>