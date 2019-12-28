/*
Stefano Martinelli - 812155
Realizzazione della pagina home.php
Vengono effettuate varie chiamate Ajax per ottenere le informazioni necessarie alla creazione
del DOM.
Implementazione di Autocompleter e Drag & Drop.
*/

jQuery(document).ready(function () {
  jQuery('#containerhome').fadeIn(800);
  var user;
  jQuery.ajax({
    type: 'GET',
    url: '../model/getuser.php',
    data: '',
    dataType: 'JSON',
    success: function(result){
      user = result.user;
    },
    error: function(error) {
      console.log("Errore: imposibile ottenere le informazioni dell'utente.");
    }
  });

  jQuery.ajax({
    type: 'GET',
    url: '../model/home/getProductsHome.php',
    data: '',
    dataType: 'JSON',
    success: function(result){
      setHome(result);
    },
    error: function(error) {
      console.log(error.msg);
    }
  });

  Object.size = function(obj) {
    var size = 0, key;
    for (key in obj)
      if (obj.hasOwnProperty(key)) size++;
    return size;
  };

  function setHome(product) {
    var size = Object.size(product);

    setTextOfClass();

    var nodeul = document.createElement('ul'); // ul
    nodeul.id = 'gridhome';
    document.getElementById('containerhome').appendChild(nodeul);
    for(var i = 0; i < size; i++) {
      var nodeli = document.createElement('li'); // li
      nodeul.appendChild(nodeli);
      var nodediv = document.createElement('div'); // div
      nodediv.className = 'prdct';
      nodeli.appendChild(nodediv);
      var a = document.createElement('a');
      a.setAttribute('href', 'product.php?prod='+product[i]['name']);
      var img = document.createElement('img');
      img.setAttribute('src', '../img/smartphone/'+ product[i]['name'].replace(/ /g, '') +'.png');
      img.setAttribute('title', product[i]['name']);
      img.className = 'imgphome';
      a.prepend(img);
      nodediv.appendChild(a);

      var nodep = document.createElement('p'); // p
      nodep.setAttribute('alt', 'user');
      jQuery(nodep).html(user);
      nodep.hide();
      nodep.className = 'user';
      nodediv.appendChild(nodep);

      nodep = document.createElement('p'); // p
      nodep.setAttribute('alt', 'nameproduct');
      jQuery(nodep).html(product[i]['name']);
      nodep.hide();
      nodep.className = 'nameprdct';
      nodediv.appendChild(nodep);

      nodep = document.createElement('p'); // p
      nodep.className = 'p-info';
      jQuery(nodep).html(product[i]['name'] + ' - ' + product[i]['price'] + '&euro;');
      nodeli.appendChild(nodep);
    }
    dragandrop();
  }

  function setTextOfClass() {
    document.getElementsByClassName('close')[0].innerHTML = '&times;';
    document.getElementsByClassName('modelsubtext')[0].innerHTML =
      'Il prodotto selezionato si trover&agrave; nella sezione apposita.';
  }

  setModal();

  var modal = document.getElementById('myModal');
  var btn = document.getElementById('myBtn');
  var span = document.getElementsByClassName('close')[0];

  function modf () { // Apertura della finestra
      modal.style.display = 'block';
  }

  span.onclick = function() { // Chiusura della finestra cliccando su X
      modal.style.display = 'none';
  }

  window.onclick = function(event) { // Chiusura della finestra cliccando fuori
      if (event.target == modal) modal.style.display = 'none';
  }

  function dragandrop() {

    jQuery('.prdct').draggable({
      helper:'clone',
      cursorAt:{
        left: 50,
        top: 50,
      },
      tolerance: 'touch'
    });

    jQuery('.bannerscontainer :first').droppable({
      accept: '.prdct',
      hoverClass: 'ui-state-higlight',
      drop: function(event, ui){
        event.preventDefault();
        jQuery.ajax({
          type: 'POST',
          url: '../model/home/cartviadrop.php',
          data: {
            user: ui.draggable.find('.user').text(),
            name: ui.draggable.find('.nameprdct').text(),
          },
          dataType: 'JSON',
          success: function(result){
            var json = result;
            if(json.msg.includes('aggiunto'))
              jQuery('.hmodal').text('Prodotto aggiunto');
            else jQuery('.hmodal').text('Prodotto già presente');
            jQuery('.modeltext').text(json.msg);
            modf();
          },
          error: function(error){
            var json = error;
            console.log(json.msg);
          },
        });
      }
    });

    jQuery('#wishbanner :last').droppable({
      accept: '.prdct',
      hoverClass: 'ui-state-higlight',
      drop: function(event, ui){
        event.preventDefault();
        jQuery.ajax({
          type: 'POST',
          url: '../model/home/wishviadrop.php',
          data: {
            user: ui.draggable.find('.user').text(),
            name: ui.draggable.find('.nameprdct').text(),
          },
          dataType: 'JSON',
          success: function(result){
            var json = result;
            if(json.msg.includes('aggiunto'))
              jQuery('.hmodal').text('Prodotto aggiunto');
            else jQuery('.hmodal').text('Prodotto già presente');
            jQuery('.modeltext').text(json.msg);
            modf();
          },
          error: function(result){
            var json = result;
            console.log(json.msg);
          },
        });
      }
    });
  }

  // Searchbox
  jQuery('#searchbox').focus(function() {
    jQuery('.bannerscontainer').slideUp();
  });
  // Searchbox
  jQuery('#searchbox').focusout(function() {
    jQuery('.bannerscontainer').slideDown();
  });

  jQuery.ajax({
    type: 'GET',
    url: '../model/product/getproducts.php',
    data: '',
    dataType: 'JSON',
    success: function(result){
      var productsList = JSON.parse(JSON.stringify(result));
      new Autocompleter.Local(
        'searchbox',
        'searchboxlistarea',
        productsList,
        {}
      );
    },
    error: function(error) {
      console.log('Errore');
    }
  });

  function setModal() {
    var nodediv = document.createElement('div'); // div
    nodediv.className = 'modal-content';
    document.getElementById('myModal').appendChild(nodediv);
    var node = document.createElement('div');
    node.className = 'modal-header';
    nodediv.appendChild(node);
    var nodespan = document.createElement('span');
    nodespan.className = 'close';
    node.appendChild(nodespan);
    var nodeh = document.createElement('h2');
    nodeh.className = 'hmodal';
    node.appendChild(nodeh);
    var node = document.createElement('div');
    node.className = 'modal-body';
    nodediv.appendChild(node);
    var nodep = document.createElement('p');
    node.appendChild(nodep);
    var nodep = document.createElement('p');
    nodep.className = 'modelsubtext';
    node.appendChild(nodep);
  }
});
