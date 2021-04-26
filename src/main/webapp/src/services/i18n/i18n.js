import en from "./en";
import ru from "./ru";
import uk from "./uk";

class I18n {

    constructor() {
        this.localesDictionary = {
            'en': en,
            'ru': ru,
            'uk': uk,
        }
        this.locale = this.getLocale();
    }

    getLocale = () => {
        let cachedLocale = localStorage.getItem('locale');

        if (cachedLocale) return cachedLocale;

        let userLocale = navigator.language.substring(0, 2);
        localStorage.setItem('locale', userLocale)
        return userLocale;
    }

    setLocale = (locale) => {
        localStorage.setItem('locale', locale)
        location.reload()
    }

    get = (key) => this.localesDictionary[this.locale][key];
}

const i18n = new I18n();

export default i18n