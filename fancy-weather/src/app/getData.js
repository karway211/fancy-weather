import { lang } from '../index';

const getWeekDay = (n) => {
    const dateSearch = new Date(n * 1000);
    // console.log(dateSearch);
    const daysEn = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const manthEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysRu = ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'];
    const manthRu = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    const daysBe = ['Няд', 'Пнд', 'Аўт', 'Сер', 'Чцв', 'Пят', 'Суб'];
    const manthBe = ['Студзеня', 'Лютага', 'Сакавіка', 'Красавіка', 'Мая', 'Чэрвеня', 'Ліпеня', 'Жніўня', 'Верасня', 'Кастрычніка', 'Лістапада', 'Снежня'];
    if (lang === 'en') {
        return `${daysEn[dateSearch.getDay()]} ${dateSearch.getDate()} ${manthEn[dateSearch.getMonth()]}`;
    }
    if (lang === 'ru') {
        return `${daysRu[dateSearch.getDay()]} ${dateSearch.getDate()} ${manthRu[dateSearch.getMonth()]}`;
    }
    if (lang === 'be') {
        return `${daysBe[dateSearch.getDay()]} ${dateSearch.getDate()} ${manthBe[dateSearch.getMonth()]}`;
    }
    return dateSearch;
};

const getWeekDayNext = (n) => {
    const dateSearch = new Date(n * 1000);
    // console.log(dateSearch);
    const nextDaysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const nextDaysRu = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const nextDaysBe = ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацьвер', 'Пятніца', 'Субота'];

    if (lang === 'en') {
        return `${nextDaysEn[dateSearch.getDay()]}`;
    }
    if (lang === 'ru') {
        return `${nextDaysRu[dateSearch.getDay()]}`;
    }
    if (lang === 'be') {
        return `${nextDaysBe[dateSearch.getDay()]}`;
    }
    return dateSearch;
};

export { getWeekDay, getWeekDayNext };
