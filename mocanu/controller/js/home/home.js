/**
 * Realizzazione della pagina home.php
 Vengono effettuate varie chiamate Ajax per ottenere le informazioni necessarie alla creazione
 del DOM.
 Implementazione di Autocompleter e Drag & Drop.
 */

jQuery(document).ready(function () {

    jQuery('#containerhome').fadeIn(800);
    var user;

    /**
     * Recupera le informazioni dell'utente
     */
    jQuery.ajax({
        type: 'GET',
        url: '../model/getuser.php',
        data: '',
        dataType: 'json',
        success: function (result) {
            user = result.user;
        },
        error: function () {
            console.log("Errore: impossibile ottenere le informazioni dell'utente.");
        }
    });

    /**
     * Recupera la home dei prodotti
     */
    jQuery.ajax({
        type: 'GET',
        url: '../model/home/getProductsHome.php',
        data: '',
        dataType: 'json',
        success: function (result) {
            setHome(result)
        },
        error: function (error) {
            console.log(error)
        }
    });

    /**
     * Searchbox
     */
    jQuery('#searchbox').focus(function() {
        jQuery('.bannerscontainer').slideUp();
    })
        .focusout(function() { //focusout sul #searchbox
        jQuery('.bannerscontainer').slideDown();
    });

    jQuery.ajax({
        type: 'GET',
        url: '../model/product/getProducts.php',
        data: '',
        dataType: 'json',
        success: function (result) {
            //TODO gestire meglio i json?
            var productList = JSON.parse(JSON.stringify(result));
            //todo da capire
            new Autocompleter.Local(
                'searchbox',
                'searchboxlistarea',
                productList,
                {}
            );
        },
        error: function (error) {
            console.log('Errore recupero prodotti');
        }
    });


    /**
     * Calcola la dimensione dell'oggetto
     * @param obj
     * @returns {number}
     */
    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj)
            if (obj.hasOwnProperty(key)) size++;
        return size;
    };

    function setHome(products) {
        var size = Object.size(products);

        //TODO da fare
        // setTextOfCLass();

        var nodeul = document.createElement('ul');
        nodeul.id = 'gridhome';

        document.getElementById('containerhome').appendChild(nodeul);

        for (var i = 0; i < size; i++) {
            var nodeli = document.createElement('li');

            nodeul.appendChild(nodeli);
            var nodediv = document.createElement('div');
            nodediv.className = 'product';

            nodeli.appendChild(nodediv);
            var a = document.createElement('a');

            a.setAttribute('href', 'product.php?prod=' + products[i]['name']);
            var img = document.createElement('img');
            img.setAttribute('src', '../img/smartphone/' + products[i]['name'].replace(/ /g, '') + '.png');
            img.setAttribute('title', products[i]['name']);
            img.className = 'imgphone';
            a.prepend(img);

            nodediv.appendChild(a);
            //TODO che cosa sono?
            var nodep = document.createElement('p');
            nodep.setAttribute('alt', 'user');
            jQuery(nodep).html(user);
            nodep.hide();
            nodep.className = 'user';

            nodediv.appendChild(nodep);
            nodep = document.createElement('p');
            nodep.setAttribute('alt', 'nameproduct');
            jQuery(nodep).html(products[i]['name']);
            nodep.hide();
            nodep.className = 'nameproduct';

            nodediv.appendChild(nodep);
            nodep = document.createElement('p');
            nodep.className = 'p-info';
            jQuery(nodep).html(products[i]['name'] + ' - ' + products[i]['price'] + '&euro;');
            nodeli.appendChild(nodep);

        }
        //todo da fare
        // draganddrop();
    }


    setModal();

    var modal = document.getElementById('myModal');
    //TODO forse inutile
    // var button = document.getElementById('myBtn');
    var span = document.getElementsByClassName('close')[0];

    function modf() {
        modal.style.display = 'block';
    }

    span.onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    function setModal() {
        var nodediv = document.createElement('div');
        nodediv.className = 'modal-content';
        document.getElementById('MyModal').appendChild(nodediv);

        var node = document.createElement('div');
        node.className = 'modal-header';
        nodediv.appendChild(node);

        var nodespan = document.createElement('span');
        nodespan.className = 'close';
        node.appendChild(nodespan);

        var nodeh = document.createElement('h2');
        nodeh.className = 'hmodal';
        node.appendChild(nodeh);

        var nodep = document.createElement('p');
        node.appendChild(nodep);

        nodep = document.createElement('p');
        nodep.className = 'modelsubtext';
        node.appendChild(nodep);
    }
});
