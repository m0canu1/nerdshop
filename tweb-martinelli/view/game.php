<!--
  Stefano Martinelli - 812155
  In questa pagina è possibile giocare per ottenere sconti sul prossimo acquisto.
-->
<?php
  include("top.html");
  include("../model/common.php");
?>
<!-- CSS -->
<link href="../view/css/game.css" type="text/css" rel="stylesheet" />
<!-- jQuery -->
<script src="../controller/js/game/game.js"></script>

<div id="game">
  <h1>Indovina lo smartphone!</h1>
  <p class="gamedesc">
    Indovina il maggior numero di smartphone.
    Indovinando 4 dispositivi su 5 vincerai uno sconto da utilizzare per il
    tuo prossimo acquisto. <br> Hai solamente 45 secondi!
  </p>
  <div class="gameres">
    <p>Smartphone indovinati: </p>
    <p><span class="guessed">0</span> su 5 indovinati (<span class="left">0</span> rimanenti)</p>
    <p class="gameresult"></p>
  </div>
  <div id="timer_div">Pronto?</div>

  <div id="gamearea">
    <div></div> <div></div> <div></div> <div></div>
    <div></div> <div></div> <div></div> <div></div>
    <div></div> <div></div> <div></div> <div></div>
    <div></div> <div></div> <div></div> <div></div>
  </div>

  <div id="solutions">
    <button id="solbtn1"><span>?</span></button>
    <button id="solbtn2"><span>?</span></button><br>
    <button id="solbtn3"><span>?</span></button>
    <button id="solbtn4"><span>?</span></button>
  </div>

  <p id="controls">
    <button id="startbutton"><span>Inizia il gioco</span></button>
  </p>
</div>

<div id="alreadygame">
  <p class="alreadyplayed">
    Mi dispiace, hai già ottenuto uno sconto sul tuo prossimo acquisto.
    Dopo aver effettuato un nuovo acquisto potrai di nuovo giocare!
  </p>
  <p>Torna alla <a href="home.php">Home</a></p>
</div>

<?php
  include("bottom.html");
?>
