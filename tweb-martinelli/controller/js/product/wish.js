/*
Stefano Martinelli - 812155
Realizzazione della pagina user.php
Vengono effettuate varie chiamate Ajax per ottenere le informazioni necessarie alla creazione
del DOM.
*/

jQuery(document).ready(function (){
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
      console.log(error);
      console.log("Errore: impossibile ottenere informazioni dell'utente.");
    }
  });
  jQuery.ajax({
    type: 'GET',
    url: '../model/product/getWish.php',
    data: '',
    dataType: 'JSON',
    success: function(result){
      setWish(result);
    },
    error: function(error) {
      console.log('Errore: impossibile ottenere informazioni della Wishlist.');
    }
  });

  Object.size = function(obj) {
    var size = 0, key;
    for (key in obj)
      if (obj.hasOwnProperty(key)) size++;
    return size;
  };

  function setWish(obj) {
    var size = Object.size(obj);
    jQuery('.numwishp').html(size);
    if(size==0)
      jQuery('.nowish').html('Per aggiungere articoli alla tua wishlist naviga su TWebShop.');

    for(var i = 0; i < size; i++) {
      var nodecontainer = document.createElement('div');
      nodecontainer.className = 'wish_container'; //container
      document.getElementsByClassName('wish')[0].appendChild(nodecontainer);

      var nodeimg = document.createElement('div');
      nodeimg.className = 'wish_img';
      nodecontainer.appendChild(nodeimg);
      var a = document.createElement('a');
      a.setAttribute('href', 'product.php?prod='+obj[i][1]);
      var img = document.createElement('img');
      img.setAttribute('src', '../img/smartphone/'+ obj[i][1].replace(/ /g, '') +'.png');
      img.setAttribute('title', obj[i][1]);
      img.className = 'imgwish';
      a.prepend(img);
      nodeimg.appendChild(a);

      setInfo(nodecontainer, obj, i);

      var nodeorder = document.createElement('div'); //wish_order
      nodeorder.className = 'wish_order';
      nodecontainer.appendChild(nodeorder);

      setFirstForm(nodeorder, obj, i);
      setSecondForm(nodeorder, obj, i);

    }
  }


  jQuery(document).on('submit', '.removefromwish', function(){
    event.preventDefault();
    var elem = jQuery(this).find("input[name='idprod']");
    jQuery.ajax({
      type: 'POST',
      url: '../model/product/removeFromWish.php',
      data:{
        id: jQuery(this).find("input[name='idprod']").val(),
        user: jQuery('#user').val(),
      },
      dataType: 'JSON',
      success: function(result){
        elem.parent().siblings(':first').text(result.msg);
        elem.parent().hide();
        elem.parent().siblings(':last').hide();
      },
    });
  });

  jQuery(document).on('submit', '.addtocart', function(){
    event.preventDefault();
    var elem = jQuery(this).find("input[name='idp']");
    jQuery.ajax({
      type: 'POST',
      url: '../model/product/addToCartFromWish.php',
      data:{
        id: jQuery(this).find("input[name='idp']").val(),
        user: jQuery('.user').val(),
      },
      dataType: 'JSON',
      success: function(result){
        elem.parent().siblings(':first').text(result.msg);
        elem.parent().hide();
        elem.parent().siblings(':last').hide();
      }
    });
  });


  function setInfo(nodecontainer, obj, i) {
    var nodeinfo = document.createElement('div'); //wish_info
    nodeinfo.className = 'wish_info';
    nodecontainer.appendChild(nodeinfo);
    nodeinfo.appendChild(document.createElement('br'));
    var node = document.createElement("span"); // nome del prodotto
    node.className = 'wishnameprod';
    node.innerHTML = obj[i][1];
    nodeinfo.appendChild(node);
    node.appendChild(document.createElement('br'));
    node.appendChild(document.createElement('br'));
    node = document.createElement("span"); // memoria del prodotto
    node.className = 'wish_subinfo';
    node.innerHTML = 'Memoria: ' + obj[i][8];
    nodeinfo.appendChild(node);
    node.appendChild(document.createElement('br'));
    node = document.createElement('span'); // colore del prodotto
    node.className = 'wish_subinfo';
    node.innerHTML = 'Colorazione: ' + obj[i][5];
    nodeinfo.appendChild(node);
    node.appendChild(document.createElement('br'));
    node.appendChild(document.createElement('br'));
    var node = document.createElement('span'); // quantità del prodotto
    if(obj[i][2] > 0) {
      node.innerHTML = 'Disponibilità immediata.';
      node.className = 'yavailability';
    } else {
      node.innerHTML = 'Prodotto esaurito';
      node.className = 'navailability';
    }
    nodeinfo.appendChild(node); // disponibilità del prodotto
    node.appendChild(document.createElement('br'));
    node.appendChild(document.createElement('br'));
    node = document.createElement('span'); //result
    node.className = 'result';
    nodeinfo.appendChild(node);
  }

  function setFirstForm(nodeorder, obj, i) {
    node = document.createElement('h3');
    node.innerHTML = 'Totale: ' + obj[i][4] + '&euro;';
    nodeorder.appendChild(node);

    var nodeform = document.createElement('form'); // creazione del form
    nodeform.className = 'addtocart';
    nodeform.setAttribute('method', 'POST');
    nodeorder.appendChild(nodeform);
    var nodeinput = document.createElement('input'); // input del form
    nodeinput.type = 'hidden';
    nodeinput.name = 'idp';
    nodeinput.value = obj[i][0];
    nodeinput.className = 'id';
    nodeform.appendChild(nodeinput);
    nodeinput = document.createElement('input'); //input del form
    nodeinput.type = 'hidden';
    nodeinput.value = user;
    nodeinput.className = 'user';
    nodeform.appendChild(nodeinput);
    var nodecart = document.createElement('button'); // button del form
    nodecart.id = 'addtocartfromwish';
    nodeform.appendChild(nodecart);
    nodecart.type = 'submit';
    nodecart.name = 'addtocart';
    img = document.createElement('img'); // icona del form
    img.setAttribute('src', '../img/icons/cart2.png');
    img.title = 'Carrello';
    img.alt = 'Aggiungi al carrello';
    nodecart.prepend(img);
  }

  function setSecondForm(nodeorder, obj, i) {
    var nodeform = document.createElement('form'); //creaione del form
    nodeform.className = 'removefromwish';
    nodeorder.appendChild(nodeform);
    nodeform.setAttribute('method', 'POST');
    var node = document.createElement('input'); // input del form
    node.type = 'hidden';
    node.name = 'idprod';
    node.value = obj[i][0];
    node.id = 'id';
    nodeform.appendChild(node);
    node = document.createElement('input'); // input del form
    node.type = 'hidden';
    node.value = user;
    node.id = 'user';
    nodeform.appendChild(node);
    node = document.createElement('button'); // button del form
    node.className = 'removeprodwish';
    nodeform.appendChild(node);
    node.type = 'submit';
    node.name = 'removeprodw';
    var img = document.createElement('img'); // icona del form
    img.setAttribute('src', '../img/icons/bin.png');
    img.title = 'Rimuovi';
    img.alt = 'Rimuovi il prodotto';
    node.prepend(img);

    var nodehr = document.createElement('hr');
    nodehr.className = 'hrwish';
    document.getElementsByClassName('wish')[0].appendChild(nodehr);
  }

});
