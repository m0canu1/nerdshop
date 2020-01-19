<?php
include('top.php');
include('../model/common.php');
?>

<!-- CSS -->
<link href="../view/css/home.css" type="text/css" rel="stylesheet" />
<!-- jQuery -->
<script src="../controller/js/home/home.js"></script>

<div id="containerhome">
    <form action="/view/product.php">
        <input id="searchbox" name="prod" size="40" type="text" placeholder="Cerca un prodotto.."/>
<!--        todo provabilmente inutile-->
        <div id="searchboxlistarea"></div>
    </form>

    <!-- Modal -->
    <div id="myModal" class="modal">
    </div>

    <div class="bannerscontainer">
        <ul class="banner effect">
            <li>
                <h2 class="bannertitle">Aggiungi al carrello!</h2>
                <p class="bannertitle">Trascina qui il prodotto.</p>
            </li>
            <li><div class="cartbanner">
                    <a href="../view/cart.php"><img class="bannerimg" src="../img/banner/banner1.png" alt="">
                    </a></div>
            </li>
        </ul>
        <ul class="banner effect">
            <li>
                <h2 class="bannertitle">Vinci sconti giocando!</h2>
                <p class="bannertitle">&emsp;Clicca qui per ottenere sconti.</p>
            </li>
            <li>
                <a href="../view/game.php">
                    <img class="bannerimg" src="../img/banner/banner2.png" alt="">
                </a>
            </li>
        </ul>
        <ul class="banner effect">
            <li>
                <h2 class="bannertitle">Aggiungi alla wishlist!</h2>
                <p class="bannertitle">Trascina qui il prodotto.</p>
            </li>
            <li><div id="wishbanner">
                    <a href="../view/wish.php">
                        <img class="bannerimg" src="../img/banner/banner3.png" alt="">
                    </a></div></li>
        </ul>
    </div>

</div>

<?php
include('bottom.php');
?>
