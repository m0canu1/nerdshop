<!--
  Stefano Martinelli - 812155
  In questa pagina l'utente può visualizzare le varie caratteristiche del prodotto (prezzo, memoria,
  sistema operativo ecc.) e le recensioni, se presenti. Tramite questa pagina l'utente può
  aggiungere il prodotto selezionato nel suo Carrello o nella sua Wishlist.
-->
<?php
  include("top.html");
  include("../model/common.php");
  $_SESSION['product'] = filter_input(INPUT_GET, "prod");
?>
<!-- CSS -->
<link href="/view/css/product.css" type="text/css" rel="stylesheet" />
<!-- jQuery -->
<script src="../controller/js/product/product.js"></script>

<div class="container">
  <div class="product_img">
  </div>
  <div class="product_cont">
  </div>
  <div class="contact_cont">
  </div>
</div>

<div class="review_cont">
</div>

<?php
  include("bottom.html");
?>
