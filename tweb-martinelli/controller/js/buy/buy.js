/*
Stefano Martinelli - 812155
Realizzazione della pagina buy.php
Vengono effettuate varie chiamate Ajax per ottenere le informazioni necessarie alla creazione
del DOM.
*/

jQuery(document).ready(function (){
  var user, shipment, discount;

  jQuery.ajax({
    type: 'GET',
    url: '../model/getUser.php',
    data: '',
    dataType: 'JSON',
    success: function(result){
      user = result.user;
    },
    error: function(error) {
      console.log(error.msg);
    }
  });

  jQuery.ajax({
    type: 'GET',
    url: '../model/getShipment.php',
    data: '',
    dataType: 'JSON',
    success: function(result){
      shipment = result.shipment;
    },
    error: function(error) {
      console.log(error.msg);
    }
  });

  jQuery.ajax({
    type: 'GET',
    url: '../model/getDiscount.php',
    data: '',
    dataType: 'JSON',
    success: function(result){
      discount = result.discount;
      buy();
    },
    error: function(error) {
      console.log(error.msg);
    }
  });

  function buy() {
    jQuery.ajax({
      type: 'GET',
      url: '../model/product/infoProduct.php',
      data: '',
      dataType: 'JSON',
      success: function(result){
        if(result[0]['quantity'] == 0)
          location.href = '../view/home.php';
        setBuy(result);
      },
      error: function(error) {
        console.log(error.msg);
      }
    });
  }

  Object.size = function(obj) {
    var size = 0, key;
    for (key in obj)
      if (obj.hasOwnProperty(key)) size++;
    return size;
  };

  function setBuy(product) {
    setForm(product);
    setTable(product);

    jQuery(document).on('submit', '#addrslct', function(){
      jQuery('.addrselect').hide();
      jQuery('.ordertable').hide();
      event.preventDefault();
      jQuery.ajax({
        type: 'POST',
        url: '../model/buy/new_order.php',
        data: {
          user: jQuery('#user').val(),
          fname: jQuery('#fname').val(),
          lname: jQuery('#lname').val(),
          addrs: jQuery('#addrs').val(),
          city: jQuery('#city').val(),
          cap: jQuery('#cap').val(),
          product: jQuery('#product').val(),
          shipment: jQuery('#shipment').val(),
        },
        dataType: 'JSON',
        success: function(result){
          jQuery('.norder').text(result.msg);
          jQuery('.redorder').show();
        },
        error: function(result){
          console.log(result.msg);
        }
      });
    });
  }

  function setForm(product) {
    var nodeh = document.createElement('h2');
    nodeh.innerHTML = 'Dettagli di fatturazione';
    document.getElementsByClassName('addrselect')[0].appendChild(nodeh);
    var nodeform = document.createElement('form'); // creazione del form
    nodeform.id = 'addrslct';
    nodeform.setAttribute('method', 'POST');
    document.getElementsByClassName('addrselect')[0].appendChild(nodeform);
    var nodeinput = document.createElement('input'); // input nome del form
    nodeinput.type = 'hidden';
    nodeinput.id = 'user';
    nodeinput.value = user;
    nodeform.appendChild(nodeinput);
    var nodelabel = document.createElement('label'); // label nome del form
    nodelabel.innerHTML = 'Nome';
    nodelabel.for = 'fname';
    nodeform.appendChild(nodelabel);
    nodeinput = document.createElement('input'); // input nome del form
    nodeinput.type = 'text';
    nodeinput.id = 'fname';
    nodeinput.name = 'firstname'
    nodeinput.innerHTML = 'Nome';
    nodeform.appendChild(nodeinput);
    nodelabel = document.createElement('label'); // label cognome del form
    nodelabel.innerHTML = 'Cognome';
    nodelabel.for = 'lname';
    nodeform.appendChild(nodelabel);
    nodeinput = document.createElement('input'); // input cognome del form
    nodeinput.type = 'text';
    nodeinput.id = 'lname';
    nodeinput.name = 'lastname'
    nodeinput.innerHTML = 'Cognome';
    nodeform.appendChild(nodeinput);
    nodelabel = document.createElement('label'); // label indirizzo del form
    nodelabel.innerHTML = 'Indirizzo';
    nodelabel.for = 'address';
    nodeform.appendChild(nodelabel);
    nodeinput = document.createElement('input'); //input indirizzo del form
    nodeinput.type = 'text';
    nodeinput.id = 'addrs';
    nodeinput.name = 'address';
    nodeinput.placeholder = 'Via e numero civico'
    nodeinput.innerHTML = 'Indirizzo';
    nodeform.appendChild(nodeinput);
    nodelabel = document.createElement('label'); // label città del form
    nodelabel.innerHTML = 'Città';
    nodelabel.for = 'city';
    nodelabel.setAttribute('required', true);
    nodeform.appendChild(nodelabel);
    nodeinput = document.createElement('input'); // input città del form
    nodeinput.type = 'text';
    nodeinput.id = 'city';
    nodeinput.name = 'city';
    nodeform.appendChild(nodeinput);
    nodelabel = document.createElement('label'); // label cap del form
    nodelabel.innerHTML = 'CAP';
    nodelabel.for = 'cap';
    nodeform.appendChild(nodelabel);
    nodeinput = document.createElement('input'); // input cap del form
    nodeinput.type = 'text';
    nodeinput.id = 'cap';
    nodeinput.name = 'cap';
    nodeform.appendChild(nodeinput);

    nodeinput = document.createElement('input'); //input prodotto del form
    nodeinput.type = 'hidden';
    nodeinput.id = 'product';
    nodeinput.value = product[0]['name'];
    nodeinput.name = 'product';
    nodeform.appendChild(nodeinput);

    nodeinput = document.createElement('input'); //input spedizione del form
    nodeinput.type = 'hidden';
    nodeinput.id = 'shipment';
    nodeinput.value = shipment;
    nodeinput.name = 'shipment';
    nodeform.appendChild(nodeinput);

    var nodebutton = document.createElement('button'); // button del form
    nodebutton.type = 'submit';
    nodebutton.value = 'gobuy';
    nodebutton.innerHTML = "Procedi all'acquisto";
    nodeform.appendChild(nodebutton);

    var nodep = document.createElement('p');
    nodep.className = 'norder';
    document.getElementsByClassName('resultorder')[0].appendChild(nodep);
    nodep = document.createElement('p');
    nodep.className = 'redorder';
    document.getElementsByClassName('resultorder')[0].appendChild(nodep);
    var a = document.createElement('a');
    a.setAttribute('href', '../view/home.php');
    a.innerHTML = 'Ritorna alla Home';
    var a2 = document.createElement('a');
    a2.setAttribute('href', '../view/orders.php');
    a2.innerHTML = 'Vai ai tuoi Ordini';
    nodep.appendChild(a);
    nodep.append(' - ');
    nodep.appendChild(a2);

  } // creazione del form

  function setTable(product) {
    var nh2 = document.createElement('h2');
    nh2.innerHTML = 'Il tuo ordine';
    document.getElementsByClassName('ordertable')[0].appendChild(nh2);

    var nodetable = document.createElement('table');
    nodetable.className = 'tborder';
    document.getElementsByClassName('ordertable')[0].appendChild(nodetable);

    var nodetr = document.createElement('tr');
    nodetable.appendChild(nodetr);

    var nodetd = document.createElement('td');
    nodetd.className = 'tdbold';
    nodetd.innerHTML = 'Prodotto';
    nodetr.appendChild(nodetd);

    nodetd = document.createElement('td');
    nodetd.className = 'tdbold';
    nodetd.innerHTML = 'Totale';
    nodetr.appendChild(nodetd);

    var nodetr = document.createElement('tr');
    nodetable.appendChild(nodetr);
    nodetd = document.createElement('td');
    nodetd.className = 'buyproduct';
    nodetd.innerHTML = product[0]['name'];
    nodetr.appendChild(nodetd);
    nodetd = document.createElement('td');
    nodetd.innerHTML = Number(product[0]['price']) - Number(discount) + '&euro;';

    if(discount > 0){
      var nodespan = document.createElement('span');
      nodespan.className = 'discapp';
      nodespan.innerHTML = ' (Sconto applicato)';
      nodetd.appendChild(nodespan);
    }
    nodetr.appendChild(nodetd);
    nodetr = document.createElement('tr');
    nodetable.appendChild(nodetr);
    nodetd = document.createElement('td');
    nodetd.className = 'tdbold';
    nodetd.innerHTML = 'SUBTOTALE';
    nodetr.appendChild(nodetd);

    nodetd = document.createElement('td');
    nodetd.className = 'tdbold';
    nodetd.innerHTML = Number(product[0]['price']) - Number(discount) + '&euro;';
    nodetr.appendChild(nodetd);

    nodetr = document.createElement('tr');
    nodetable.appendChild(nodetr);
    nodetd = document.createElement('td');
    nodetd.className = 'tdbold';
    nodetd.innerHTML = 'SPEDIZIONE';
    nodetr.appendChild(nodetd);

    nodetd = document.createElement('td');
    nodetd.className = 'tdbold';
    var shp;
    if(shipment == 'one')
      shp = 2.99;
    else if (shipment == 'two')
      shp = 4.99;
    else shp = 0;
    nodetd.innerHTML = shp + '&euro;';
    nodetr.appendChild(nodetd);

    nodetr = document.createElement('tr');
    nodetable.appendChild(nodetr);
    nodetd = document.createElement('td');
    nodetd.className = 'tdbold';
    nodetd.innerHTML = 'TOTALE';
    nodetr.appendChild(nodetd);

    nodetd = document.createElement('td');
    nodetd.className = 'tdbold';
    nodetd.innerHTML = Number(product[0]['price']) - Number(discount) + Number(shp) + '&euro;';
    nodetr.appendChild(nodetd);
  } // creazione della tabella dell'ordine
});
