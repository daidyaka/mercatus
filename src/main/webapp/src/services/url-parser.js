export function toUrlParams(obj) {
    return new URLSearchParams(obj).toString();
}

export function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

export function getAllParams() {
    let params = {};

    for (const [key, value] of new URLSearchParams(window.location.search).entries()) {
        params[key] = value;
    }

    return params;
}