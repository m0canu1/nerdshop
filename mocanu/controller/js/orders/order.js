/**
 * Realizzazione della pagina orders.php
 * Vengono effettuate varie chiamate Ajax per ottenere le informazioni necessarie alla creazione
 * del DOM.
 */

jQuery(document).ready(function () {
    var user, product, prod, review, rev;

    /**
     * recupera username
     */
    jQuery.ajax({
        type: 'GET',
        url: '../model/getuser.php',
        data: '',
        dataType: 'json',
        success: function (result) {
            user = result.user;
        },
        error: function (error) {
            console.log('Errore: impossibile ottenere il nome utente.');
            console.log(error)
        }
    });

    /**
     * recupera le recensioni dell'utente
     * TODO creare file php
     */
    function checkReviews() {
        jQuery.ajax({
            type: 'GET',
            url: '../model/orders/checkReviews.php',
            data: '',
            dataType: 'json',
            success: function (result) {
                review = result;
                orders();
            },
            error: function (error) {
                console.log('Errore: impossibile verificare le recensioni.');
            }
        });
    }


    /**
     * recupero
     * todo cosa fa esattamente?
     */
    jQuery.ajax({
        type: 'GET',
        url: '../model/orders/getProductOrder.php',
        data: '',
        dataType: 'json',
        success: function(result){
            product = result;
            checkReviews();
        },
        error: function(error) {
            console.log('Errore: impossibile ottenere il prodotto in questione.');
        }
    });


    /**
     * ottiene tutti gli ordini di un utente
     */
    function orders() {
        jQuery.ajax({
            type: 'GET',
            url: '../model/orders/infoOrders.php',
            data: '',
            dataType: 'json',
            success: function (result) {
                setOrders(result);
            },
            error: function (error) {
                console.log("Errore: impossibile ottenere le informazioni dell'ordine.");
            }
        });
    }

    /**
     *
     * @param obj
     * @returns {number}
     */
    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj)
            if (obj.hasOwnProperty(key)) size++;
        return size;
    };


    /**
     * imposta la visualizzazione di tutti gli ordini effettuati
     * @param order
     */
    function setOrders(order) {
        var size = Object.size(order);
        if(size === 0) jQuery('.nooder').html('Non sono presenti ordini');

        for(var i = 0; i < size; i++) {
            setTable(order, i); // creazione della tabella di un dato ordine

            var nodeorderinfo = document.createElement('div');
            nodeorderinfo.className = 'order_info'; //tableorder
            document.getElementsByClassName('listorder')[0].appendChild(nodeorderinfo);
            var a = document.createElement('a');
            for(var j = 0; j < Object.size(product); j++) { //TODO se l'ordine i corrisponde a qualche prodotto ordinato?
                if(order[i][2] === product[j][0]) {
                    prod = product[j][1];
                    //TODO a che serve replace?
                    prodnob = prod.replace(/ /g, '');
                }
            }
            a.setAttribute('href', 'product.php?prod='+prod);
            var img = document.createElement('img');
            img.setAttribute('src', '../img/smartphone/'+ prod.split(' ').join('')+'.png');
            img.setAttribute('title', prod);
            img.className = 'imgcart';
            a.prepend(img);
            nodeorderinfo.appendChild(a);

            var nodeh3 = document.createElement('h3');
            nodeh3.innerHTML = prod;
            nodeorderinfo.appendChild(nodeh3);

            var nodeorderinfo2 = document.createElement('div');
            nodeorderinfo2.className = 'order_info2'; //tableorder
            document.getElementsByClassName('listorder')[0].appendChild(nodeorderinfo2);

            var nodediv = document.createElement('div');
            nodeorderinfo2.appendChild(nodediv);
            var nodep2 = document.createElement('p');
            nodep2.innerHTML = 'Grazie per la recensione lasciata!'
            var nodep = document.createElement('p');
            nodep.className = 'showReview';
            nodep.innerHTML = 'Hai ricevuto il prodotto?' +
                '<br><button="click">Lascia una recensione cliccando qui</button>!'
            rev = false;

            for(var j = 0; j < Object.size(review); j++) {
                if(order[i][2] === review[j][0]) {
                    nodediv.appendChild(nodep2);
                    rev = true;
                    break;
                }
            }
            if(rev === false) {
                setFormReview(nodediv, nodep);
            }
            var nodehr = document.createElement('hr');
            nodehr.className = 'hrorder'
            document.getElementsByClassName('listorder')[0].appendChild(nodehr);
        }
    }

    /**
     * TODO controllare descrizione funzione
     * Creazione della tabella di uno specifico ordine e viene messo nella posizione i
     * @param order
     * @param i
     */
    function setTable(order, i) {
        var nodeto = document.createElement('div');
        nodeto.className = 'tableorder'; //tableorder
        document.getElementsByClassName('listorder')[0].appendChild(nodeto);

        var nodetable = document.createElement('table');
        nodetable.className = 'infoorder'; //infoorder
        nodetable.setAttribute('align', 'center');
        nodeto.appendChild(nodetable);

        var nodetrone = document.createElement('tr');
        nodetrone.className = 'trone';
        nodetable.appendChild(nodetrone);

        var nodethone = document.createElement('th');
        nodethone.className = 'thsentone';
        nodethone.innerHTML = 'Ordine effettuato il: ';
        nodetrone.appendChild(nodethone);

        var nodethtwo = document.createElement('th');
        nodethtwo.innerHTML = 'Totale';
        nodetrone.appendChild(nodethtwo);

        var nodeththree = document.createElement('th');
        nodeththree.className = 'thsent';
        nodeththree.innerHTML = 'Inviato a ';
        nodetrone.appendChild(nodeththree);

        var nodetrtwo = document.createElement('tr');
        nodetrtwo.className = 'trtwo';
        nodetable.appendChild(nodetrtwo);

        var nodetdone = document.createElement('td');
        nodetdone.innerHTML = order[i][9];
        nodetrtwo.appendChild(nodetdone);

        var nodetdtwo = document.createElement('td');
        nodetdtwo.innerHTML = order[i][3] + '€';
        nodetrtwo.appendChild(nodetdtwo);

        var nodetdthree = document.createElement('td');
        nodetdthree.innerHTML = order[i][4];
        nodetrtwo.appendChild(nodetdthree);
    }


    /**
     * todo leggere
     * creazione del form per scrivere una recensione
     * @param nodediv
     * @param nodep
     */
    function setFormReview(nodediv, nodep) {
        nodediv.appendChild(nodep);
        var nodereview = document.createElement('div');
        nodereview.className = 'review'; //tableorder
        nodediv.appendChild(nodereview);

        // creazione del form
        var nodeform = document.createElement('form');
        nodeform.className = 'reviewform';
        nodeform.setAttribute('method', 'POST');
        nodereview.appendChild(nodeform);

        // input del form
        var nodeinput = document.createElement('input');
        nodeinput.type = 'text';
        nodeinput.name = 'titlereview';
        nodeinput.placeholder = 'Titolo della tua recensione';
        nodeinput.required = true;
        nodeinput.id = 'titlereview';
        nodeform.appendChild(nodeinput);

        // input del form
        nodeinput = document.createElement('input');
        nodeinput.type = 'hidden';
        nodeinput.value = user;
        nodeinput.id = 'user';
        nodeform.appendChild(nodeinput);

        // input del form
        nodeinput = document.createElement('input');
        nodeinput.type = 'hidden';
        nodeinput.name = 'prodreview';
        nodeinput.value = prod;
        nodeinput.id = 'prodreview';
        nodeform.appendChild(nodeinput);

        // textarea del form
        var nodetarea = document.createElement('input');
        nodetarea.name = 'bodyreview';
        nodetarea.id = 'bodyreview';
        nodetarea.placeholder = 'Scrivi qui la tua recensione';
        nodetarea.required = true;
        nodeform.appendChild(nodetarea);

        // button del form
        var nodebutton = document.createElement('input');
        nodebutton.name = 'sendreview';
        nodebutton.type = 'submit';
        nodebutton.id = 'sendreview';
        nodebutton.required = true;
        nodeform.appendChild(nodebutton);
        var nodep3 = document.createElement('p');
        nodep3.className = 'reviewadded';
        nodereview.appendChild(nodep3);
    }


    /**
     *
     */
    jQuery(document).on('click', '.showReview', function(){
        jQuery(this).siblings('.review').toggle();
    });


    /**
     * aggiunta della recensione al database
     */
    jQuery(document).on('submit', '.reviewform', function(){
        jQuery.ajax({
            type: 'POST',
            url: '../model/orders/addReview.php',
            data: {
                user: user,
                titlereview: jQuery(this).find('input[name="titlereview"]').val(),
                prodreview: jQuery(this).find('input[name="prodreview"]').val(),
                bodyreview: jQuery('input[name="bodyreview"]').val(),
            },
            dataType: 'json',
            success: function(result){
                jQuery('.reviewform').hide();
                var json = result;
                jQuery('.reviewadded').text(json.msg);
            }
        });
    });
});