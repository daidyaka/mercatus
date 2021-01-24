class AdTypeService {
    constructor() {
        this.types = {
            "building": {
                "name": "Стоительство",
                "options": {
                    "construction": "Строительство",
                    "dismantling": "Демонтажные работы",
                    "interior_renovation": "Ремонт и отделка помещений",
                    "exterior_renovation": "Ремонт и отделка фасадов",
                    "cleaning": "Уборка",
                    "design": "Дизайн",
                    "others": "Прочее"
                }
            },
            "advertisements": {
                "name": "Реклама и полиграфия",
                "options": {
                    "printing": "Печать буклетов, объявлений, газет и т.д.",
                    "sign_making": "Изготовление вывесок",
                    "internet_ads": "Реклама в интернете, СММ",
                    "internet_jobs": "Работа в интернете",
                    "others": "Прочее"
                }
            },
            "transportation": {
                "name": "Перевозки и транспортировка",
                "options": {
                    "shipping": "Перевозка груза",
                    "loaders": "Услуги грузчиков",
                    "others": "Прочее"
                }
            },
            "financial": "Финансовые услуги",
            "juridical": "Юридические услуги",
            "health": "Красота и здоровье",
            "auto_services": {
                "name": "Авто-услуги",
                "options": {
                    "rent": "Аренда и прокат транспрорта",
                    "repair": "Ремонт транспорта",
                    "others": "Прочее"
                }
            },
            "it_services": {
                "name": "IT-услуги",
                "options": {
                    "app_development": "Разработка приложений",
                    "sites_development": "Разработка сайтов",
                    "copyrighting": "Копирайтинг",
                    "design": "Дизайн",
                    "others": "Прочее"
                }
            },
            "others": "Прочие услуги"
        };
    }

    getType(typeName) {
        return this.types[typeName];
    }

    getTypes() {
        return this.types;
    }
}

class UrlParser {
    constructor() {
        this.params = new URLSearchParams(window.location.search);
    }

    getParam(paramName) {
        return this.params.get(paramName);
    }

    toUrlParams(obj) {
        return new URLSearchParams(obj).toString();
    }
}

APP.services.adTypes = new AdTypeService();
APP.services.urlParser = new UrlParser();