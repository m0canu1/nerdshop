/*
Stefano Martinelli - 812155
Creazione del footer, tranne per la pagina index.php
*/

jQuery(document).ready(function(){

  /*if(window.location.href != 'http://localhost/progetto/index.php' &&
  window.location.href != 'http://localhost/progetto/') {*/
    var nodediv = document.createElement('div');
    nodediv.className = 'footer-left';
    document.getElementsByClassName('footer')[0].appendChild(nodediv);
    var nodep = document.createElement('p');
    nodep.className = 'footer-links';
    nodediv.appendChild(nodep);
    nodea = document.createElement('a');
    nodea.setAttribute('href', 'home.php');
    jQuery(nodea).html('Home - ');
    nodep.appendChild(nodea);
    nodea = document.createElement('a');
    nodea.setAttribute('href', 'orders.php');
    jQuery(nodea).html('&nbsp;Ordini - ');
    nodep.appendChild(nodea);
    nodea = document.createElement('a');
    nodea.setAttribute('href', 'cart.php');
    jQuery(nodea).html('&nbsp;Carrello - ');
    nodep.appendChild(nodea);
    nodea = document.createElement('a');
    nodea.setAttribute('href', 'wish.php');
    jQuery(nodea).html(' &nbsp;Wishlist - ');
    nodep.appendChild(nodea);
    nodea = document.createElement('a');
    nodea.setAttribute('href', 'game.php');
    jQuery(nodea).html('&nbsp;Game');
    nodep.appendChild(nodea);
    nodep = document.createElement('p');
    jQuery(nodep).html('TWebShop &copy; 2018');
    nodediv.appendChild(nodep);
  /*} else {
    jQuery('div').removeClass('footer');
  }*/
});
