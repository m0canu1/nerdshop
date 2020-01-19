<?php
include('top.html');
include('../model/common.php');
$_SESSION['product'] = filter_input(INPUT_GET, "prod");
?>
<!-- CSS -->
<link href="/view/css/product.css" type="text/css" rel="stylesheet" />
<!-- jQuery -->
<!--<script src="../controller/js/product/product.js"></script>-->

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
include('bottom.html');
?>
