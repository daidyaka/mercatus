let adsElement = document.querySelector('.ads')

fetch('/profile/advertisements')
    .then(response => response.json())
    .then(json => {
        if (json.length === 0) {
            adsElement.innerHTML = 'Пока нет объявлений, но вы можете создать новое по ссылке ниже.'
            return;
        }

        json.forEach(el => {
            let adElement = document.createElement('li');
            adElement.innerHTML = `<a href="/ad/${el.url}.html">${el.title}</a>`;
            adsElement.appendChild(adElement);
        });
    })