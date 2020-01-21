<?php
/**
 *   In questa pagina vengono mostrati tutti gli ordini completati e le informazioni relative (prezzo,
 * data dell'acquisto ecc.). Tramite questa pagina è possibile rilasciare le recensioni dei prodotti
 * acquistati.
 */


include("top.html");
include("../model/common.php");
?>

<!-- CSS -->
<link href="../view/css/orders.css" type="text/css" rel="stylesheet" />
<!-- jQuery -->
<script src="../controller/js/orders/order.js"></script>

<div id="order">
    <h1>I miei ordini</h1>
    <p class="noord"></p>
</div>
<div class="listorder"></div>


<?php
include("bottom.html");
?>
