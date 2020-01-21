
jQuery(document).ready(function () {
    if (!window.location.href.startsWith('http://mocanu.localhost/index.php') && (window.location.href !== 'http://mocanu.localhost/mocanu/')) {
        jQuery('#logoutlogo').show();

        jQuery('#logoutlogo').click(function () {
            jQuery.ajax({
                type: 'GET',
                url: '../../../model/users/logoutuser.php',
                success: function (result) {
                    window.location.href = JSON.parse(result).url;
                },
                error: function (error) {
                    console.log('Errore: impossibile effettuare la richiesta per la disconnessione.')
                }
            })

        });
    }
});