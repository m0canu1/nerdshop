<?php
/**
 * In questa pagina sono presenti i vari smartphone aggiunti dall'utente.
 * Da qui è possibile completare un acquisto o trasferire un prodotto nella Wishlist.
 */
include 'top.html';
require '../model/common.php';
?>

<!-- CSS -->
<link href="../view/css/cartwish.css" type="text/css" rel="stylesheet" />
<!-- jQuery -->
<script src="../controller/js/product/cart.js"></script>

<div class="cart">
    <div class="desc-cart">
        <h1>Il mio carrello</h1>
        <p class="nocart"></p>
    </div>
    <div class="numcart">
        <span>Numero prodotti: </span> <span class="numcartp"></span>
    </div>
</div>

<?php
include('bottom.html');
?>