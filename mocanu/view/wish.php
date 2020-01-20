<?php
/**
 * In questa pagina sono presenti i vari smartphone aggiunti dall'utente. Questa pagina ha lo scopo
 * di salvare i prodotti che "colpiscono" l'utente. Da qui è possibile trasferire un prodotto nel
 * Carrello.
 */

include 'top.html';
include '../model/common.php';
?>

<!--CSS-->
<link href="css/cartwish.css" type="text/css" rel="stylesheet">

<!--jQuery-->
<script src='../controller/js/product/wish.js'></script>

<div class="wish">
    <div class="desc-wish">
        <h1>La mia wishlist</h1>
        <p class="nowish"></p>
    </div>
    <div class="numwish">
        <span>Numero prodotti: <span class="numwishp"></span></span>
    </div>
</div>

<?php
include 'bottom.html';
?>
