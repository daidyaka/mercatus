const adService = APP.services[APP.SERVICES.adTypes];

(function () {
    let adTypeText = document.querySelector('[data-ad-type]');
    let types = adService.getTypes();

    adTypeText.textContent = convertTypeToText(adTypeText, types);
})();

function convertTypeToText(adTypeText, types) {
    let value = adTypeText.getAttribute('data-ad-type')
    for (const type in types) {
        if (types[type].name) {
            for (const [key, elVal] of Object.entries(types[type].options)) {
                if (key === value) {
                    return types[type].name + ' > ' + elVal;
                }
            }
        } else {
            if (value === type) {
                return types[type];
            }
        }
    }
    return 'Others';
}