/**
 * Realizzazione della pagina home.php
 Vengono effettuate varie chiamate Ajax per ottenere le informazioni necessarie alla creazione
 del DOM.
 Implementazione di Autocompleter e Drag & Drop.
 */

jQuery(document).ready(function () {
    jQuery('#containerhome').fadeIn(800);
    let user;

    /**
     * Recupera le informazioni dell'utente
     */
    jQuery.ajax({
        type: 'GET',
        url: '../model/getuser.php',
        data: '',
        dataType: 'json',
        success: function (result) {
            user = result;
        },
        error: function (error) {
            console.log(error);
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
            const productList = JSON.parse(JSON.stringify(result));
            //todo da capire
            jQuery('#searchbox').autocomplete({
                source: result
            });
            //todo probabilmente inutile
            jQuery('#searchboxlistarea').autocomplete({
                source: productList
            });
        },
        error: function (error) {
            console.log(error)
            console.log('Errore recupero prodotti');
        }
    });


    /**
     * Calcola la dimensione dell'oggetto
     * @param obj
     * @returns {number}
     */
    Object.size = function(obj) {
        let size = 0, key;
        for (key in obj)
            if (obj.hasOwnProperty(key)) size++;
        return size;
    };

    function setHome(products) {
        const size = Object.size(products);

        setTextOfClass();

        const nodeul = document.createElement('ul');
        nodeul.id = 'gridhome';

        document.getElementById('containerhome').appendChild(nodeul);

        for (let i = 0; i < size; i++) {
            const nodeli = document.createElement('li');

            nodeul.appendChild(nodeli);
            const nodediv = document.createElement('div');
            nodediv.className = 'product';

            nodeli.appendChild(nodediv);
            const a = document.createElement('a');

            a.setAttribute('href', 'product.php?prod=' + products[i]['name']);
            const img = document.createElement('img');
            img.setAttribute('src', '../img/smartphone/' + products[i]['name'].replace(/ /g, '') + '.png');
            img.setAttribute('title', products[i]['name']);
            img.className = 'imgphone';
            a.prepend(img);

            nodediv.appendChild(a);
            //TODO che cosa sono?
            let nodep = document.createElement('p');
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
        dragandrop();
    }


    setModal();

    const modal = document.getElementById('myModal');
    //TODO forse inutile
    // var button = document.getElementById('myBtn');
    const span = document.getElementsByClassName('close')[0];

    /**
     * apertura della finestra
     */
    function modf() {
        modal.style.display = 'block';
    }

    /**
     * chiusura della finestra cliccando su X
     */
    span.onclick = function () {
        modal.style.display = 'none';
    };

    /**
     * Chiusura della finestra cliccando fuori
     * @param event
     */
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    function setModal() {
        const nodediv = document.createElement('div');
        nodediv.className = 'modal-content';
        document.getElementById('myModal').appendChild(nodediv);

        const node = document.createElement('div');
        node.className = 'modal-header';
        nodediv.appendChild(node);

        const nodespan = document.createElement('span');
        nodespan.className = 'close';
        node.appendChild(nodespan);

        const nodeh = document.createElement('h2');
        nodeh.className = 'hmodal';
        node.appendChild(nodeh);

        let nodep = document.createElement('p');
        node.appendChild(nodep);

        nodep = document.createElement('p');
        nodep.className = 'modelsubtext';
        node.appendChild(nodep);
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
                event.preventDefault(); //TODO trovare spiegazione
                jQuery.ajax({
                    type: 'POST',
                    url: '../model/home/cartViaDrop.php',
                    data: {
                        user: ui.draggable.find('.user').text(),
                        name: ui.draggable.find('.nameprdct').text(),
                    },
                    dataType: 'JSON',
                    success: function(result){
                        if(result.msg.includes('aggiunto'))
                            jQuery('.hmodal').text('Prodotto aggiunto');
                        else jQuery('.hmodal').text('Prodotto già presente');
                        jQuery('.modeltext').text(result.msg);
                        modf();
                    },
                    error: function(error){
                        console.log(error.msg);
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
                        if(result.msg.includes('aggiunto'))
                            jQuery('.hmodal').text('Prodotto aggiunto');
                        else jQuery('.hmodal').text('Prodotto già presente');
                        jQuery('.modeltext').text(result.msg);
                        modf();
                    },
                    error: function(result){
                        console.log(result.msg);
                    },
                });
            }
        });
    }


    function setTextOfClass() {
        document.getElementsByClassName('close')[0].innerHTML = '&times;';
        document.getElementsByClassName('modelsubtext')[0].innerHTML =
            'Il prodotto selezionato si trover&agrave; nella sezione apposita.';
    }
});
