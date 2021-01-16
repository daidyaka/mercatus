const APP = {};

fetch('/profile/get')
    .then(response => response.json())
    .then(auth => APP.isAuthenticated = auth.isAuthenticated)
    .then(() => {
        if (APP.isAuthenticated) {
            document.querySelector('.header-auth').innerHTML = `
                <a href="/profile.html">Профиль</a>
                <span class="vertical-delimiter">/</span>
                <a href="/logout">Выйти</a></a>
            `;
        } else {
            document.querySelector('.header-auth').innerHTML = `
                <a href="/login.html">Войти</a>
                <span class="vertical-delimiter">/</span>
                <a href="/registration.html">Зарегистрироваться</a>
            `;
        }
    })