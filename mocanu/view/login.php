<div class="login-page">
    <div class="form">
        <form id="loginform" method="POST">
            <h2>Login</h2>
            <dl>
                <dt></dt>
                <dd><input type="text" name="username" placeholder="Username" required></dd>
                <dd><input type="password" name="password" placeholder="Password" required></dd>
                <dd><input type="button" id="submitlogin" value="Accedi"></dd>
            </dl>
            <p class="messagelogin">Sei nuovo su TWebShop? <a href="#">Crea un account!</a></p>
        </form>
        <form id="registerform" method="POST">
            <h2>Registrazione</h2>
            <dl>
                <dt></dt>
                <dd><input type="text" name="username" placeholder="Il tuo username" required></dd>
                <dd><input type="text" name="firstname" placeholder="Il tuo nome" required></dd>
                <dd><input type="text" name="lastname" placeholder="Il tuo cognome" required></dd>
                <dd><input type="email" name="mail" placeholder="E-mail" required></dd>
                <dd><input type="password" name="password" placeholder="Password" required></dd>
                <dd><input type="button" id="submitreg" value="Registrati" name="reg"></dd>
            </dl>
            <p class="messageregister">Già registrato? <a href="#">Accedi</a></p>
        </form>
    </div>
</div>