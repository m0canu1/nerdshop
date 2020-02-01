/**
 * Realizzazione della pagina cart.php
 * Vengono effettuate varie chiamate Ajax per ottenere le informazioni necessarie alla creazione
 * del DOM.
 */

jQuery(document).ready(function (){
    let user;
    jQuery.ajax({
        type: 'GET',
        url: '../model/getUser.php',
        data: '',
        dataType: 'JSON',
        success: function(result){
            user = result.user;
        },
        error: function(error) {
            console.log("Errore: impossibile ottenere le informazioni dell'utente");
        }
    });
    jQuery.ajax({
        type: 'GET',
        url: '../model/product/getCart.php',
        data: '',
        dataType: 'JSON',
        success: function(result){
            setCart(result);
        },
        error: function(error) {
            console.log(error);
            console.log('Errore: impossibile ottenere le informazioni del Carrello.');
        }
    });

    Object.size = function(obj) {
        let size = 0, key;
        for (key in obj)
            if (obj.hasOwnProperty(key)) size++;
        return size;
    };

    function setCart(obj) {
        let size = Object.size(obj);
        jQuery('.numcartp').html(size);
        if (size === 0) {
            jQuery('.nocart').html("Per aggiungere articoli al tuo carrello naviga su TWebShop," +
                " quando trovi un articolo che ti interessa, clicca su 'Aggiungi al carrello'.");
        }

        for(let i = 0; i < size; i++) {
            const nodecontainer = document.createElement('div');
            nodecontainer.className = 'cart_container';
            document.getElementsByClassName('cart')[0].appendChild(nodecontainer);

            setInfo(nodecontainer, obj, i);

            const nodeorder = document.createElement('div');
            nodeorder.className = 'cart_order';
            nodecontainer.appendChild(nodeorder);

            setFirstForm(nodeorder, obj, i);
            setSecondForm(nodeorder, obj, i);
        }
    }

    jQuery(document).on('submit', '.removefromcart', function(){
        event.preventDefault();
        const elem = jQuery(this).find("input[name='idprod']");
        jQuery.ajax({
            type: 'POST',
            url: '../model/product/removeFromCart.php',
            data:{
                id: jQuery(this).find("input[name='idprod']").val(),
                user: jQuery('#user').val(),
            },
            dataType: 'JSON',
            success: function(result){
                elem.parent().siblings().hide();
                elem.parent().siblings(':first').show();
                elem.parent().siblings(':first').text(result.msg);
                elem.parent().hide();
            },
        });
    });

    jQuery(document).on('submit', '.addtowish', function(){
        event.preventDefault();
        const elem = jQuery(this).find("input[name='idp']");
        jQuery.ajax({
            type: 'POST',
            url: '../model/product/addToWishFromCart.php',
            data:{
                id: jQuery(this).find("input[name='idp']").val(),
                user: jQuery('.user').val(),
            },
            dataType: 'JSON',
            success: function(result){
                elem.parent().siblings().hide();
                elem.parent().siblings(':first').show();
                elem.parent().siblings(':first').text(result.msg);
                elem.parent().hide();
            }
        });
    });

    function setInfo(nodecontainer, obj, i) {
        const nodeimg = document.createElement('div');
        nodeimg.className = 'cart_img';
        nodecontainer.appendChild(nodeimg);

        const a = document.createElement('a');
        a.setAttribute('href', 'product.php?prod='+obj[i][1]);

        const img = document.createElement('img');
        img.setAttribute('src', '../img/smartphone/'+ obj[i][1].replace(/ /g, '') +'.png');
        img.setAttribute('title', obj[i][1]);
        img.className = 'imgcart';
        a.prepend(img);
        nodeimg.appendChild(a);

        const nodeinfo = document.createElement('div'); //cart_info
        nodeinfo.className = 'cart_info';
        nodecontainer.appendChild(nodeinfo);
        nodeinfo.appendChild(document.createElement('br'));

        let node = document.createElement("span"); // nome del prodotto
        node.className = 'cartnameprod';
        node.innerHTML = obj[i][1];
        nodeinfo.appendChild(node);
        node.appendChild(document.createElement('br'));
        node.appendChild(document.createElement('br'));

        node = document.createElement("span"); // memoria del prodotto
        node.className = 'cart_subinfo';
        node.innerHTML = 'Memoria: ' + obj[i][8];
        nodeinfo.appendChild(node);
        node.appendChild(document.createElement('br'));

        node = document.createElement("span"); // colore del prodotto
        node.className = 'cart_subinfo';
        node.innerHTML = 'Colorazione: ' + obj[i][5];
        nodeinfo.appendChild(node);
        node.appendChild(document.createElement('br'));
        node.appendChild(document.createElement('br'));

        node = document.createElement("span"); // quantità del prodotto
        if(obj[i][2] > 0) {
            node.innerHTML = 'Disponibilità immediata.';
            node.style.color = 'green';
        } else {
            node.innerHTML = 'Prodotto esaurito';
            node.style.color = 'red';
        }
        nodeinfo.appendChild(node); // disponibilità del prodotto
        node.appendChild(document.createElement('br'));
        node.appendChild(document.createElement('br'));

        node = document.createElement('span');
        node.className = 'result';
        nodeinfo.appendChild(node);

        node = document.createElement('span');
        node.className = 'result';
        nodeinfo.appendChild(node);
    }

    function setFirstForm(nodeorder, obj, i) {
        const node = document.createElement('h3'); // prezzo del prodotto
        node.innerHTML = 'Totale: ' + obj[i][4] + '&euro;';
        nodeorder.appendChild(node);

        const nodeform = document.createElement('form'); // creazione del form
        nodeform.className = 'addtowish';
        nodeform.setAttribute('method', 'POST');
        nodeorder.appendChild(nodeform);

        let nodeinput = document.createElement('input'); // input del form
        nodeinput.type = 'hidden';
        nodeinput.name = 'idp';
        nodeinput.value = obj[i][0];
        nodeinput.className = 'id';
        nodeform.appendChild(nodeinput);

        nodeinput = document.createElement('input'); // input del form
        nodeinput.type = 'hidden';
        nodeinput.value = user;
        nodeinput.className = 'user';
        nodeform.appendChild(nodeinput);

        const nodewish = document.createElement('button'); // button del form
        nodewish.id = 'submitproductwish';
        nodeform.appendChild(nodewish);
        nodewish.type = 'submit';
        nodewish.name = 'submitwish';

        const img = document.createElement('img'); // icona del form
        img.setAttribute('src', '../img/icons/heart.png');
        img.title = 'Wishlist';
        img.alt = 'Aggiungi alla wishlist';
        nodewish.prepend(img);
    }

    function setSecondForm(nodeorder, obj, i) {
        const nodesecondform = document.createElement('form'); // creazione del form
        nodesecondform.className = 'removefromcart';
        nodeorder.appendChild(nodesecondform);
        nodesecondform.setAttribute('method', 'POST');

        let nodeinput = document.createElement('input'); // input del form
        nodeinput.type = 'hidden';
        nodeinput.name = 'idprod';
        nodeinput.value = obj[i][0];
        nodeinput.id = 'id';
        nodesecondform.appendChild(nodeinput);

        nodeinput = document.createElement('input'); // input del form
        nodeinput.type = 'hidden';
        nodeinput.name = 'idprod';
        nodeinput.value = user;
        nodeinput.id = 'user';
        nodesecondform.appendChild(nodeinput);

        const noderemove = document.createElement('button'); // button del form
        noderemove.className = 'removeprodcart';
        nodesecondform.appendChild(noderemove);
        noderemove.type = 'submit';
        noderemove.name = 'removeprodc';

        const img = document.createElement('img'); // icona del form
        img.setAttribute('src', '../img/icons/bin.png');
        img.title = 'Rimuovi';
        img.alt = 'Rimuovi il prodotto';
        noderemove.prepend(img);

        const nodediv = document.createElement('div'); //div
        nodeorder.appendChild(nodediv);
        let node;
        if (obj[i][2] > 0) {
            const nodethirdform = document.createElement('form'); // creazione del form
            nodediv.appendChild(nodethirdform);
            nodethirdform.setAttribute('action', '../view/new_order.php?prod=' + obj[i][1]);
            nodethirdform.setAttribute('method', 'POST');

            const nodeselect = document.createElement('select'); // select del form
            nodeselect.name = 'shipment';
            nodethirdform.appendChild(nodeselect);

            node = document.createElement('option'); // option del form
            node.value = 'free';
            node.innerHTML = 'Spedizione standard (Gratis)';
            nodeselect.appendChild(node);
            node = document.createElement('option'); // option del form
            node.value = 'one';
            node.innerHTML = 'Consegna 2 giorni (+2,99&euro;)';
            nodeselect.appendChild(node);
            node = document.createElement('option'); // option del form
            node.value = 'two';
            node.innerHTML = 'Consegna 1 giorno (+4,99&euro;)';
            nodeselect.appendChild(node);

            const nodebuy = document.createElement('button'); // button del form
            nodebuy.className = 'buy';
            nodethirdform.appendChild(nodebuy);
            const span = document.createElement('span');
            span.innerHMTL = 'Acquista';
            nodebuy.prepend('Acquista');
            nodethirdform.appendChild(nodebuy);
        }
        const nodeh = document.createElement('hr');
        document.getElementsByClassName('cart')[0].appendChild(nodeh);
    }
});
