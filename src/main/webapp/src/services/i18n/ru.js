import React from "react";

const ru = {
    'siteName': 'Mercatus | Сервис объявлений услуг',

    'profile': 'Профиль',
    'logout': 'Выйти',
    'language': 'Язык',
    'create': 'Создать',
    'close': 'Закрыть',
    'clear': 'Очистить',
    'save': 'Сохранить',
    'send': 'Отправить',
    'average-mark': 'Средний балл',
    'make-call': 'Связаться по телефону',
    'loading': 'Загрузка',
    'load': 'Загрузить',
    'register': 'Зарегистрироваться',

    'profile.loaded-media': 'Загруженные изображения и видео',
    'profile.edit': 'Редактирование данных',
    'profile.edit.btn': 'Редактировать профиль',
    'profile.edit.personal-info.title': 'Обновление персональных данных',
    'profile.edit.password.title': 'Обновление пароля',
    'profile.edit.password.current': 'Текущий пароль',
    'profile.edit.password.new': 'Новый пароль',
    'profile.edit.password.new-repeated': 'Повторите новый пароль',
    'profile.ads': 'Мои объявления',
    'profile.ads.create': 'Создать новое объявление',
    'profile.ads.no-ads': 'Пока нет ваших объявлений, но вы можете создать новое.',

    'login': 'Войти',
    'login.title': 'Авторизация',
    'login.email.placeholder': 'Введите email',
    'login.password.placeholder': 'Введите пароль',
    'login.no-account.promotion': 'Нет аккаунта? Всегда можно',
    'login.no-account.link': 'создать новый',

    'registration.title': 'Зарегистрироваться',
    'registration.firstName.placeholder': 'Введите имя',
    'registration.firstName.label': 'Имя',
    'registration.lastName.placeholder': 'Введите фамилию',
    'registration.lastName.label': 'Фамилия',
    'registration.email.placeholder': 'Введите Email',
    'registration.password.placeholder': 'Введите пароль',
    'registration.password.label': 'Пароль',
    'registration.repeatPassword.placeholder': 'Повторите пароль',
    'registration.gender.label': 'Пол',
    'registration.gender.men': 'Мужской',
    'registration.gender.women': 'Женский',
    'registration.gender.not-selected': 'Не указан',
    'registration.city.label': 'Город',
    'registration.dateOfBirth.label': 'Дата рождения',
    'registration.isAgreed.label': 'Я согласен с условиями использования',

    '404.title': 'Страница не найдена',
    '404.message.main': 'Ресур не был найден ¯\\_(ツ)_/¯',
    '404.message.secondary': 'Проверьте правильно ли указана ссылка на него.',

    'userMedia.upload': 'Загрузить файл(ы)',
    'userMedia.upload.files-not-found': 'Файлы не найдены',
    'userMedia.upload.modal.title': 'Загрузить файлы в хранилище',
    'userMedia.upload.modal.message': 'Перетащите файл в эту область',
    'userMedia.upload.error': 'Во время удаления файл не был удален, попробуйте позже.',

    'ad.create': 'Создать объявление',
    'ad.header': 'Заголовок',
    'ad.phone-number': 'Номер телефона',
    'ad.created.time.label': 'Объявление создано',
    'ad.created.time.ago': 'назад',
    'ad.created.time.ago.second': ' секунд',
    'ad.created.time.ago.minutes': ' минут',
    'ad.created.time.ago.hours': ' часов (-а)',
    'ad.created.time.ago.days': ' дней (-я)',
    'ad.created.time.ago.months': ' месяцев',
    'ad.created.time.ago.years': ' лет',

    'ad.create.main-photo.add': 'Выбрать главное фото',
    'ad.create.text.add': 'Добавить текст',
    'ad.create.text.placeholder': ' лет',
    'ad.create.image.add': 'Добавить картинку',
    'ad.create.image.placeholder': 'Ссылка на личные медиа',
    'ad.create.image.choice': 'Выбор изображения',
    'ad.create.video.add': 'Добавить видео',
    'ad.create.video.placeholder': 'Ссылка на видео Youtube',

    'ad.types.others': 'Прочие услуги',
    'ad.types.building': 'Строительство',
    'ad.types.construction': 'Строительство',
    'ad.types.dismantling': 'Демонтажные работы',
    'ad.types.interior_renovation': 'Ремонт и отделка помещений',
    'ad.types.exterior_renovation': 'Ремонт и отделка фасадов',
    'ad.types.cleaning': 'Уборка',
    'ad.types.design': 'Дизайн',
    'ad.types.construction>others': 'Прочее',
    'ad.types.advertisements': 'Реклама и полиграфия',
    'ad.types.printing': 'Печать буклетов, объявлений, газет и т.д.',
    'ad.types.sign_making': 'Изготовление вывесок',
    'ad.types.internet_ads': 'Реклама в интернете, СММ',
    'ad.types.internet_jobs': 'Работа в интернете',
    'ad.types.advertisements>others': 'Прочее',
    'ad.types.transportation': 'Перевозки и транспортировка',
    'ad.types.travel': 'Путешествия и туры',
    'ad.types.shipping': 'Перевозка груза',
    'ad.types.loaders': 'Услуги грузчиков',
    'ad.types.transportation>others': 'Прочее',
    'ad.types.financial': 'Финансовые услуги',
    'ad.types.juridical': 'Юридические услуги',
    'ad.types.health': 'Красота и здоровье',
    'ad.types.auto_services': 'Авто-услуги',
    'ad.types.rent': 'Аренда и прокат транспрорта',
    'ad.types.repair': 'Ремонт транспорта',
    'ad.types.auto_services>others': 'Прочее',
    'ad.types.it_services': 'IT-услуги',
    'ad.types.app_development': 'Разработка приложений',
    'ad.types.sites_development': 'Разработка сайтов',
    'ad.types.copyrighting': 'Копирайтинг',
    'ad.types.it_services>others': 'Прочее',

    'search': 'Поиск',
    'search.city.label': 'Город',
    'search.sort.date': 'по дате',
    'search.sort.date.asc': 'дата по убыванию',
    'search.sort.date.desc': 'дата по возрастанию',
    'search.sort.alphabet': 'по алфавиту',
    'search.sort.alphabet.asc': 'в алфавитном порядке',
    'search.sort.alphabet.desc': 'против алфавитного порядка',
    'search.sort.rating': 'по рейтингу (отключено)',
    'search.sort.rating.asc': 'по убыванию',
    'search.sort.rating.desc': 'по возрастанию',
    'search.no-results': 'Результатов не найдено.',

    'reviews.title': 'Отзывы',
    'reviews.no-reviews': 'Отзывов пока нет, станьте первым.',
    'reviews.comment': 'Комментарий',

    'rating': 'Рейтинг',
    'rating.review': 'Отзыв',
    'rating.leave': 'Оставить отзыв',
    'rating.mark': 'Оценка',
    'rating.no-mark': 'Без оценки',
    'rating.no-auth.message': 'Для того, чтобы оставить отзыв, необходимо',
    'rating.no-auth.link': 'авторизоваться',

}

export default ru