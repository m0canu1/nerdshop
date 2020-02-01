/**
 * Realizzazione della pagina user.php
 * Vengono effettuate varie chiamate Ajax per ottenere le informazioni necessarie alla creazione
 * del DOM.
 */

/**
 * recupera le informazioni dell'utente
 */
jQuery(document).ready(function () {
    var user;
    jQuery.ajax({
        type: 'GET',
        url: '../model/getuser.php',
        data: '',
        dataType: 'json',
        success: function (result) {
            user = result.user;
        },
        error: function (error) {
            console.log(error);
            console.log("Errore: impossibile ottenere informazioni dell'utente.");
        }
    });

    /**
     * recupero della wishlist e creazione tramite setWish()
     */
    jQuery.ajax({
        type: 'GET',
        url: '../model/product/getWish.php',
        data: '',
        dataType: 'JSON',
        success: function(result){

            setWish(result);
        },
        error: function(error) {
            console.log(error);
            console.log('Errore: impossibile ottenere informazioni della Wishlist.');
        }
    });


    /**
     * rimozione di un prodotto dalla wishlist
     */
    jQuery(document).on('submit', '.removefromwish',function () {
        //todo è giusto this al posto di event
        event.preventDefault();
        var elem = jQuery(this).find('input[name="idprod"]');
        jQuery.ajax({
            type: 'POST',
            url: '../model/product/removeFromWish.php',
            data:{
                id: elem.val(),
                user: jQuery('#user').val(),
            },
            dataType: 'json',
            success: function (result) {
                elem.parent().siblings(':first').text(result.msg);
                elem.parent().hide();
                elem.parent().siblings(':last').hide();
            }
        })
    });

    /**
     * aggiunta di un prodotto al carrello
     */
    jQuery(document).on('submit', '.addtocart', function(){
        event.preventDefault();
        var elem = jQuery(this).find("input[name='idp']");
        jQuery.ajax({
            type: 'POST',
            url: '../model/product/addToCartFromWish.php',
            data:{
                id: elem.val(),
                user: jQuery('.user').val(),
            },
            dataType: 'json',
            success: function(result){
                elem.parent().siblings(':first').text(result.msg);
                elem.parent().hide();
                elem.parent().siblings(':last').hide();
            }
        });
    });

    function setWish(object) {
        var size = Object.size(object);
        jQuery('.numwishp').html(size);

        if (size === 0) {
            jQuery('.nowish').html('Ancora nessun prodotto presente nella tua wishlist.');
        }

        for (var i = 0; i < size; i++) {
            var nodecontainer = document.createElement('div');
            nodecontainer.className = 'wish_container';
            //todo capire ('wish')[0]
            document.getElementsByClassName('wish')[0].appendChild(nodecontainer);

            var nodeimg = document.createElement('div');
            nodeimg.className = 'wish_img';
            nodecontainer.appendChild(nodeimg);

            var a = document.createElement('a');
            a.setAttribute('href', 'product.php?prod=' + object[i][1]);

            var img = document.createElement('img');
            img.setAttribute('src', '../../img/smartphone/' + object[i][1].replace(/ /g, '') + '.png');
            img.setAttribute('title', object[i][1]);
            img.className = 'imgwish';

            a.prepend(img);
            nodeimg.appendChild(a);

            setInfo(nodecontainer, object, i);

            var nodeorder = document.createElement('div');
            nodeorder.className = 'wish_order';
            nodecontainer.appendChild(nodeorder);

            setFirstForm(nodeorder, object, i);
            setSecondForm(nodeorder, object, i);
        }
    }

    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj)
            if (obj.hasOwnProperty(key)) size++;
        return size;
    };

    /**
     * Setta le informazioni di ogni prodotto
     * @param nodecontainer
     * @param object
     * @param i
     */
    function setInfo(nodecontainer, object, i) {
        var nodeinfo = document.createElement('div');
        nodeinfo.className = 'wish_info';
        nodecontainer.appendChild(nodeinfo);
        nodeinfo.appendChild(document.createElement('br'));

        // nome del prodotto
        var node = document.createElement("span");
        node.className = 'wishnameprod';
        node.innerHTML = object[i][1];
        nodeinfo.appendChild(node);
        node.appendChild(document.createElement('br'));
        node.appendChild(document.createElement('br'));

        // memoria del prodotto
        node = document.createElement("span");
        node.className = 'wish_subinfo';
        node.innerHTML = 'Memoria: ' + object[i][8];
        nodeinfo.appendChild(node);
        node.appendChild(document.createElement('br'));

        // colore del prodotto
        node = document.createElement('span');
        node.className = 'wish_subinfo';
        node.innerHTML = 'Colorazione: ' + object[i][5];
        nodeinfo.appendChild(node);
        node.appendChild(document.createElement('br'));
        node.appendChild(document.createElement('br'));

        // quantità del prodotto
        node = document.createElement('span');
        if (object[i][2] > 0) {
            node.innerHTML = 'Disponibilità immediata.';
            node.className = 'yavailability';
        } else {
            node.innerHTML = 'Prodotto esaurito';
            node.className = 'navailability';
        }

        // disponibilità del prodotto
        nodeinfo.appendChild(node);
        node.appendChild(document.createElement('br'));
        node.appendChild(document.createElement('br'));
        node = document.createElement('span'); //result
        node.className = 'result';
        nodeinfo.appendChild(node);
    }

    /**
     * Creazione del form per l'aggiunta al carrello
     * @param nodeorder
     * @param object
     * @param i
     */
    function setFirstForm(nodeorder, object, i) {
        var node = document.createElement('h3');
        node.innerHTML = 'Totale: ' + object[i][4] + '&euro;';
        nodeorder.appendChild(node);

        // creazione del form
        var nodeform = document.createElement('form');
        nodeform.className = 'addtocart';
        nodeform.setAttribute('method', 'POST');
        nodeorder.appendChild(nodeform);

        // input del form
        var nodeinput = document.createElement('input');
        nodeinput.type = 'hidden';
        nodeinput.name = 'idp';
        nodeinput.value = object[i][0];
        nodeinput.className = 'id';
        nodeform.appendChild(nodeinput);

        //input del form
        nodeinput = document.createElement('input');
        nodeinput.type = 'hidden';
        nodeinput.value = user;
        nodeinput.className = 'user';
        nodeform.appendChild(nodeinput);

        // button del form
        var nodecart = document.createElement('button');
        nodecart.id = 'addtocartfromwish';
        nodeform.appendChild(nodecart);
        nodecart.type = 'submit';
        nodecart.name = 'addtocart';

        // icona del form
        var img = document.createElement('img');
        img.setAttribute('src', '../img/icons/cart2.png');
        img.title = 'Carrello';
        img.alt = 'Aggiungi al carrello';
        nodecart.prepend(img);

    }

    /**
     * creazione del form per la rimozione dalla wishlist
     * @param nodeorder
     * @param object
     * @param i
     */
    function setSecondForm(nodeorder, object, i) {
        var nodeform = document.createElement('form'); //creazione del form
        nodeform.className = 'removefromwish';
        nodeorder.appendChild(nodeform);
        nodeform.setAttribute('method', 'POST');

        var node = document.createElement('input'); // input del form
        node.type = 'hidden';
        node.name = 'idprod';
        node.value = object[i][0];
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