let params = new URLSearchParams(window.location.search);
let q = params.get('q');

if (q) {
    document.querySelector('.header-search__input').value = q;

    fetch('/search?' + new URLSearchParams({
        query: q
    })).then(response => response.json())
        .then(result => {
            let searchResult = document.querySelector('.search-results');

            if (result.length) {
                searchResult.innerHTML = `Results for <b>${q}</b>`;
                result.forEach(el => {
                    let p = document.createElement('p')
                    p.innerText = JSON.stringify(el);
                    searchResult.appendChild(p)
                });
            } else {
                searchResult.innerHTML = `No results for <b>${q}</b>`;
            }
        });
}

let types = APP.services[APP.SERVICES.adTypes].getTypes();
let adTypesList = document.querySelector('.ad-type-list');
for (const type in types) {
    if (types[type].name) {
        let innerLi = document.createElement('li');
        innerLi.innerText = types[type].name;

        let innerUl = document.createElement('ul');
        innerLi.appendChild(innerUl);
        for (const [key, val] of Object.entries(types[type].options)) {
            let li = document.createElement('li');
            li.innerText = val;
            li.setAttribute('data-type', key);
            innerUl.appendChild(li);
        }
        adTypesList.appendChild(innerLi);
    } else {
        let li = document.createElement('li');
        li.innerText = types[type];
        adTypesList.appendChild(li);
    }
}