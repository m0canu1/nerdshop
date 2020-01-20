$(document).ready(function () {
    if (!window.location.href.startsWith('http://localhost/mocanu/index.php') && (window.location.href !== 'http://localhost/mocanu/')) {
        $('#logoutlogo').show();
    }
    $('#logoutlogo').click(function () {
        jQuery.ajax({
            type: 'GET',
            url: '../../model/users/logoutuser.php',
            success: function (result) {
                window.location.href = result.url;
            },
            error: function (error) {
                console.log('Errore: impossibile effettuare la richiesta per la disconnessione.')
            }
        })

    });
});