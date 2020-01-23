<?php
/**
  * In questa pagina vengono aggiunte tutte le informazioni per la spedizione del prodotto scelto.
  * Oltre a questo vengono mostrate le info riguardanti il prodotto e il suo acquisto (nome del
  * prodotto, spese di spedizione, eventuali sconti ecc.)
  */

  include("top.html");
  include("../model/common.php");
  $_SESSION['product'] = $product = filter_input(INPUT_GET, "prod");
  if(isset($_POST["shipment"])) $_SESSION['shipment'] = $_POST["shipment"];
  else $_SESSION['shipment'] = "free";
?>

<!-- CSS -->
<link href="css/buy.css" type="text/css" rel="stylesheet" />
<!-- jQuery -->
<script src="../controller/js/buy/buy.js"></script>

<div class="addrselect"></div>

<div class="resultorder"></div>

<div class="ordertable"></div>

<?php
  include("bottom.html");
?>