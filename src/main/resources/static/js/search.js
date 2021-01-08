let params = new URLSearchParams(window.location.search);
let q = params.get('q');

if (q) {
    fetch('/search?' + new URLSearchParams({
        query: q
    })).then(response => response.json())
        .then(result => {
            let mainEl = document.querySelector('main');

            if (result.length) {
                mainEl.innerHTML = `Results for <b>${q}</b>`;
                result.forEach(el => {
                    let p = document.createElement('p')
                    p.innerText = JSON.stringify(el);
                    mainEl.appendChild(p)
                });
            } else {
                mainEl.innerHTML = `No results for <b>${q}</b>`;
            }
        });
}