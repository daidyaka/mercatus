const APP = {};

fetch('/is-authenticated')
    .then(response => response.json())
    .then(auth => APP.isAuthenticated = auth.isAuthenticated)
    .then(() => {
        if (APP.isAuthenticated) {
            document.querySelector('.header-auth').innerHTML = `
                <a href="/profile-redirect">Профиль</a>
                <span class="vertical-delimiter">/</span>
                <a href="/logout">Выйти</a></a>
            `;
        } else {
            document.querySelector('.header-auth').innerHTML = `
                <a href="/authorization.html">Войти</a>
                <span class="vertical-delimiter">/</span>
                <a href="/registration.html">Зарегистрироваться</a>
            `;
        }
    })