/**
 * Gestione della registrazione e del login
 */

jQuery(document).ready(function () {

    /* al click su messagelogin in userlogin.php */
    jQuery('.messagelogin').click(function () {
        jQuery('#loginform').hide(500);
        jQuery('#registerform').show(500);
    });

    /* al click su messageregister in userlogin.php */
    jQuery('.messageregister').click(function () { //al click su messagelogin in userlogin.php
        jQuery('#registerform').hide(500);
        jQuery('#loginform').show(500);
    });

    /* Registrazione */
    jQuery('#submitreg').click(function () {
        jQuery('#flash').remove();
        jQuery.ajax({
            type: 'POST',
            url: 'model/users/signup.php',
            data: jQuery('#registerform').serializeArray(),
            dataType: 'json',
            success: function (result) {
                console.log(result);
                if (result.status) {
                    window.location.href = 'index.php';
                } else {
                    jQuery('#registerform').append("<div id = 'flash'>" + result.msg + "</div>");
                }
            },
            error: function () {
                console.log('Errore: impossibile effettuare la richiesta per la registrazione.');
            }
        });
    });

    /* Login */
    jQuery('#submitlogin').click(function () {
        jQuery.ajax({
            type: 'POST',
            url: 'model/users/userlogin.php',
            data: jQuery('#loginform').serializeArray(),
            dataType: 'json',
            success: function (result) {
                // console.log(result);
                //TODO problema qui per i file non trovate da top.php
                window.location.href = '/view/home.php';
                window.location.href = result.url;
            },
            error: function (error) {
                // console.log(error);
                console.log('Errore: impossibile effettuare il login.')
            }
        });

    });
});