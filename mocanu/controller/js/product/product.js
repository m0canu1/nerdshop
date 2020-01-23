/**
 * Realizzazione della pagina product.php
 * Vengono effettuate varie chiamate Ajax per ottenere le informazioni necessarie alla creazione
 * del DOM.
 */

jQuery(document).ready(function (){
    let user;

    jQuery.ajax({
        type: 'GET',
        url: '../model/getuser.php',
        data: '',
        dataType: 'JSON',
        success: function(result){
            user = result.user;
        },
        error: function(error) {
            console.log('Errore');
        }
    });

    jQuery.ajax({
        type: 'GET',
        url: '../model/product/infoProduct.php',
        data: '',
        dataType: 'JSON',
        success: function(result){
            const obj = JSON.parse(JSON.stringify(result));
            const prod = [];
            let i = 0;
            while(obj[0][i]){
                prod[i] = obj[0][i];
                i++;
            }
            setProduct(prod);
        },
        error: function(error) {
            console.log('Errore');
        }
    });

    jQuery.ajax({
        type: 'GET',
        url: '../model/product/productReviews.php',
        data: '',
        dataType: 'JSON',
        success: function(result){
            const obj = JSON.parse(JSON.stringify(result));
            setReviews(obj);
        },
        error: function(error) {
            console.log('Errore');
        }
    });

    Object.size = function(obj) {
        let size = 0, key;
        for (key in obj)
            if (obj.hasOwnProperty(key)) size++;
        return size;
    };

    function setProduct(prod) {
        const img = document.createElement('img');
        img.setAttribute('src', '../img/product/'+prod[1].replace(/ /g, '') +'.png');
        img.title = prod[1];
        img.alt = prod[1];
        img.id = 'imgprd';
        document.getElementsByClassName('product_img')[0].appendChild(img);

        let nodeh = document.createElement('h1');
        nodeh.className = 'product-title'; //container
        nodeh.innerHTML = prod[1];
        document.getElementsByClassName('product_cont')[0].appendChild(nodeh);

        setDetails('Prezzo', 'price', prod[4] + '€');
        setDetails('Brand', 'brand', prod[3]);
        setDetails('Memoria', 'memory', prod[8]);
        setDetails('RAM', 'ram', prod[9]);
        setDetails('Colore', 'color', prod[5]);
        setDetails('Batteria', 'battery', prod[12]);

        let nodep = document.createElement('p');
        nodep.className = 'availability';
        document.getElementsByClassName('product_cont')[0].appendChild(nodep);

        let nodespan = document.createElement('span');
        nodespan.className = 'av';
        if(prod[2]>0) {
            nodespan.innerHTML = 'Disponibilità immediata';
            nodespan.style.color = 'green';
        } else {
            nodespan.innerHTML = 'Prodotto esaurito';
            nodespan.style.color = 'red';
        }
        nodep.appendChild(nodespan);

        const nodeform = document.createElement('div');
        nodeform.className = 'formproduct';
        document.getElementsByClassName('product_cont')[0].appendChild(nodeform);

        setFirstForm(nodeform, prod);
        setSecondForm(nodeform, prod);

        nodep = document.createElement('p');
        nodep.id = 'productadded';
        document.getElementsByClassName('product_cont')[0].appendChild(nodep);

        const nodecontact = setInfo();
        let nodediv = document.createElement('div');
        nodediv.className = 'specs'
        nodecontact.appendChild(nodediv);
        nodeh = document.createElement('h2');
        nodeh.innerHTML = 'Altre caratteristiche'
        nodediv.appendChild(nodeh);

        setSecDetails('Sistema Operativo', 'os', prod[6]);
        setSecDetails('Chipset', 'chip', prod[7]);
        setSecDetails('Display', 'display', prod[10]);
        setSecDetails('Fotocamera principale', 'fotpri', prod[13]);
        setSecDetails('Fotocamera secondaria', 'fotsec', prod[14]);
        setSecDetails('Dimensioni', 'dim', prod[15]);
        setSecDetails('Peso', 'weight', prod[16]);
    }

    function setDetails(str, str2, det) {
        const nodep = document.createElement('p');
        document.getElementsByClassName('product_cont')[0].appendChild(nodep);

        let nodespan = document.createElement('span');
        nodespan.className = 'details';
        nodespan.innerHTML = str + ': ';
        nodep.appendChild(nodespan);

        nodespan = document.createElement('span');
        nodespan.className = str2;
        nodespan.innerHTML = det + '';
        nodep.appendChild(nodespan);
    }

    function setSecDetails(str, str2, det) {
        const nodepd = document.createElement('p');
        let nodediv;
        nodediv.appendChild(nodepd);

        let nodespan = document.createElement('span');
        nodespan.className = 'details';
        nodespan.innerHTML = str + ': ';
        nodepd.appendChild(nodespan);

        nodespan = document.createElement('span');
        nodespan.className = str2;
        nodespan.innerHTML = det;
        nodepd.appendChild(nodespan);
    }

    function setInfo() {
        const nodecontact = document.createElement('div');
        nodecontact.className = 'contact';
        document.getElementsByClassName('contact_cont')[0].appendChild(nodecontact);

        let nodep = document.createElement('p');
        nodep.innerHTML = 'QUALCHE DUBBIO? CONTATTACI!';
        nodecontact.appendChild(nodep);

        nodep = document.createElement('p');
        let nodespan = document.createElement('span');
        nodespan.innerHTML = 'Telefono: 380.0124356';
        nodep.appendChild(nodespan);
        nodecontact.appendChild(nodep);

        nodep = document.createElement('p');
        nodespan = document.createElement('span');
        nodespan.innerHTML = 'E-Mail: ';
        nodep.appendChild(nodespan);
        let nodea = document.createElement('a');
        nodea.setAttribute('href', 'mailto:TWebShop@gmail.com');
        nodea.className = 'email';
        nodea.innerHTML = 'TWebShop@gmail.com';
        nodep.appendChild(nodespan);
        nodep.appendChild(nodea);
        nodecontact.appendChild(nodep);

        const nodehr = document.createElement('hr');
        nodehr.className = 'hrproduct';
        nodecontact.appendChild(nodehr);
        return nodecontact;
    }

    function setFirstForm(nodeform, prod) {
        var firstform = document.createElement('div');
        firstform.id = 'firstform';
        nodeform.appendChild(firstform);
        var nodeff = document.createElement('form'); // creazione del form
        nodeff.id = 'addtocart';
        nodeff.setAttribute('method', 'POST');
        firstform.appendChild(nodeff);
        var nodeinput = document.createElement('input'); // input del form
        nodeinput.name = 'idp';
        nodeinput.type = 'hidden';
        nodeinput.value = prod[0];
        nodeinput.id = 'idcart';
        nodeff.appendChild(nodeinput);
        nodeinput = document.createElement('input'); // input del form
        nodeinput.type = 'hidden';
        nodeinput.id = 'usercart';
        nodeff.appendChild(nodeinput);
        var nodebtn = document.createElement('button'); // button del form
        nodebtn.name = 'submitcart';
        nodebtn.id = 'submitproduct';
        nodebtn.innerHTML = 'Aggiungi al Carrello';
        nodeff.appendChild(nodebtn);
        nodeff.appendChild(document.createElement('br'));
    }

    function setSecondForm(nodeform, prod) {
        var secondform = document.createElement('div');
        secondform.id = 'secondform';
        nodeform.appendChild(secondform);
        var nodesf = document.createElement('form'); // creazione del form
        nodesf.id = 'addtowish';
        nodesf.setAttribute('method', 'POST');
        secondform.appendChild(nodesf);
        nodeinput = document.createElement('input'); // input del form
        nodeinput.name = 'idpw';
        nodeinput.type = 'hidden';
        nodeinput.value = prod[0];
        nodeinput.id = 'idwish';
        nodesf.appendChild(nodeinput);
        nodeinput = document.createElement('input'); // input del form
        nodeinput.type = 'hidden';
        nodeinput.id = 'userwish';
        nodesf.appendChild(nodeinput);
        nodebtn = document.createElement('button'); // button del form
        nodebtn.name = 'submitwish';
        nodebtn.id = 'submitproductwish';
        nodesf.appendChild(nodebtn);
        var img2 = document.createElement('img'); // icona del form
        img2.setAttribute('src', '../img/icons/heart.png');
        img2.title = 'Wishlist';
        img2.alt = 'Aggiungi alla Wishlist';
        nodebtn.appendChild(img2);
    }

    function setReviews(review) {
        var size = Object.size(review);
        var node = document.createElement('h2');
        node.innerHTML = 'Recensioni';
        document.getElementsByClassName('review_cont')[0].appendChild(node);
        if(size == 0){
            node = document.createElement('h4');
            node.className = 'norev';
            node.innerHTML = 'Non sono presenti recensioni per questo prodotto.';
            document.getElementsByClassName('review_cont')[0].appendChild(node)
        }
        var noderevdiv = document.createElement('div');
        noderevdiv.className = 'singlereview';
        document.getElementsByClassName('review_cont')[0].appendChild(noderevdiv);
        for(var i = 0; i < size; i++) {
            var node = document.createElement('p');
            node.innerHTML = review[i][3]; // titolo della recensione
            node.className = 'titrev';
            noderevdiv.appendChild(node);
            node = document.createElement("p");
            node.innerHTML = 'Da ' + review[i][1] + ' il ' + review[i][5]; // utente e data della recens.
            node.className = 'userrev';
            noderevdiv.appendChild(node);
            node = document.createElement("p");
            node.innerHTML = review[i][4]; // corpo della recensione
            node.className = 'bodrev';
            noderevdiv.appendChild(node);
            if(i < size-1) {
                var node = document.createElement("hr");
                noderevdiv.appendChild(node);
            }
        }
    }

    jQuery(document).on('submit', '#addtocart', function(){
        event.preventDefault();
        jQuery.ajax({
            type: 'POST',
            url: '../model/product/addToCart.php',
            data:{
                id: jQuery(this).find("input[name='idp']").val(),
                user: user,
            },
            dataType: 'JSON',
            success: function(result){
                document.getElementById('productadded').innerHTML = result.msg;
            }
        });
    });

    jQuery(document).on('submit', '#addtowish', function(){
        event.preventDefault();
        jQuery.ajax({
            type: 'POST',
            url: '../model/product/addToWish.php',
            data:{
                id: jQuery(this).find("input[name='idpw']").val(),
                user: user,
            },
            dataType: 'JSON',
            success: function(result){
                document.getElementById('productadded').innerHTML = result.msg;
            }
        });
    });
});
