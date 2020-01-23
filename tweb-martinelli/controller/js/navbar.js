/*
Stefano Martinelli - 812155
Creazione della navigation-bar.
*/

jQuery(document).ready(function() {
  // Creazione della lista delle icone presenti nella navbar
  var nodeul = document.createElement('ul');
  nodeul.className = 'ul-navbar';
  document.getElementsByTagName('BODY')[0].prepend(nodeul);
  var nodeli = document.createElement('li');
  nodeul.appendChild(nodeli);

  // Creazione dell'icona relativa all'Homepage
  var a = document.createElement('a');
  a.setAttribute('href', 'home.php');
  nodeli.appendChild(a);
  var img = document.createElement('img');
  img.setAttribute('src', '/img/LogoWhite115x40.png');
  img.setAttribute('title', 'Home page di TWebShop');
  img.setAttribute('alt', 'banner logo');
  a.prepend(img);
  nodeli = document.createElement('li');
  nodeul.appendChild(nodeli);

  // Creazione dell'icona relativa al Logout
  img = document.createElement('img');
  img.id = 'logoutlogo';
  img.setAttribute('src', '/img/icons/logout.png');
  img.setAttribute('title', 'Effettua il log out');
  img.setAttribute('alt', 'logout logo');
  nodeli.prepend(img);
  nodeli = document.createElement('li');
  nodeul.appendChild(nodeli);

  // Creazione dell'icona relativa al Carrello
  a = document.createElement('a');
  a.id = 'cartlogo';
  a.setAttribute('href', './cart.php');
  nodeli.appendChild(a);
  img = document.createElement('img');
  img.setAttribute('src', '/img/icons/cart.png');
  img.setAttribute('title', 'Carrello');
  img.setAttribute('alt', 'cart logo');
  a.prepend(img);
  nodeli = document.createElement('li');
  nodeul.appendChild(nodeli);

  // Creazione dell'icona relativa alla Wishlist
  a = document.createElement('a');
  a.id = 'wishlogo';
  a.setAttribute('href', './wish.php');
  nodeli.appendChild(a);
  var img = document.createElement('img');
  img.setAttribute('src', '/img/icons/wish.png');
  img.setAttribute('title', 'Lista dei desideri');
  img.setAttribute('alt', 'wish logo');
  a.prepend(img);
  nodeli = document.createElement('li');
  nodeul.appendChild(nodeli);

  // Creazione dell'icona relativa agli Ordini
  a = document.createElement('a');
  a.setAttribute('href', './orders.php');
  nodeli.appendChild(a);
  img = document.createElement('img');
  img.id = 'Ordini';
  img.setAttribute('src', '/img/icons/order.png');
  img.setAttribute('title', 'Ordini');
  img.setAttribute('alt', 'order logo');
  a.prepend(img);
  nodeli = document.createElement('li');
  nodeul.appendChild(nodeli);

  // Creazione dell'icona relativa alla sezione Giochi
  a = document.createElement('a');
  a.setAttribute('href', './game.php');
  nodeli.appendChild(a);
  img = document.createElement('img');
  img.id = 'Gioco';
  img.setAttribute('src', '/img/icons/game.png');
  img.setAttribute('title', 'Gioco');
  img.setAttribute('alt', 'game logo');
  a.prepend(img);
});
