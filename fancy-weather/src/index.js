import '../src/style.css';
import './styles/scss/main.scss';

import { init } from './app/map';
import { renderCity, chengeCityMap } from './app/location';
import { getWeather } from './app/arr-weather';
import { getLinkToImage } from './app/getimage';

const body = document.getElementsByTagName('body')[0];
const root = document.createElement('div');
root.id = 'root';
body.appendChild(root);

/* хедер */
const header = document.createElement('header');
header.classList.add('header');

const param = document.createElement('div');
param.classList.add('header--param');

const chengeBackground = document.createElement('button');
chengeBackground.classList.add('header--bth');

const selectLang = document.createElement('select');
selectLang.classList.add('header--select');


const createSelectLang = (...args) => {
    args.forEach((el) => {
        const lang = document.createElement('option');
        lang.classList.add('select--lang');
        lang.value = el;
        lang.innerText = el.toUpperCase();
        return selectLang.append(lang);
    });
};
createSelectLang('en', 'ru', 'be');

const popLocalLang = (langVal) => {
    localStorage.setItem('keyLang', langVal);
};

let lang;

if (localStorage.getItem('keyLang')) {
    lang = localStorage.getItem('keyLang');
    selectLang.value = localStorage.getItem('keyLang');
} else {
    lang = selectLang.value;
}

const celsius = document.createElement('button');
celsius.classList.add('header--celsius');
celsius.classList.add('active');
celsius.innerText = 'C';

const fahrenheit = document.createElement('button');
fahrenheit.classList.add('header--fahrenheit');
fahrenheit.innerText = 'F';

const searchCity = document.createElement('div');
searchCity.classList.add('header--searching');

const inputCity = document.createElement('input');
inputCity.classList.add('searching--city');
inputCity.setAttribute('type', 'text');
inputCity.setAttribute('placeholder', 'Search city or ZIP');

const voice = document.createElement('button');
voice.classList.add('searching--voice');

const search = document.createElement('button');
search.classList.add('searching--bth');
search.innerText = 'SEARCH';
const textLan = () => {
    if (lang === 'ru') {
        search.textContent = 'ПОИСК';
    }
    if (lang === 'en') {
        search.textContent = 'SEARCH';
    }
    if (lang === 'be') {
        search.textContent = 'ПОШУК';
    }
};
textLan();

searchCity.append(inputCity, voice, search);
param.append(chengeBackground, selectLang, celsius, fahrenheit);
header.append(param, searchCity);

/* main */

const main = document.createElement('main');
main.classList.add('main');

/* weather */

const wrapperWeather = document.createElement('div');
wrapperWeather.classList.add('wrapper--weather');

const currentCity = document.createElement('h1');
currentCity.classList.add('weather--city');
currentCity.innerText = 'Gomel, Belarus';

const dataCurWrap = document.createElement('div');
dataCurWrap.classList.add('weather_wrap--date');

const dateCur = document.createElement('span');
dateCur.classList.add('weather--date');
// dateCur.innerText = 'Mond 28 october 17:23';

const timeCur = document.createElement('span');
timeCur.classList.add('weather--time');

dataCurWrap.append(dateCur, timeCur);

const wrapperWeatherToday = document.createElement('div');
wrapperWeatherToday.classList.add('wrapper--today');

const weatherToday = document.createElement('span');
weatherToday.classList.add('weather--today');
// weatherToday.innerText = '10';

const weatherTodayDescrWrap = document.createElement('div');
weatherTodayDescrWrap.classList.add('weather--descr');

const todayDescrWrapImg = document.createElement('img');
todayDescrWrapImg.classList.add('descr--img');

const descrWeather = document.createElement('ul');
descrWeather.classList.add('descr--ul');

const createLiDescrWeather = (...arg) => {
    arg.forEach((el) => {
        const description = document.createElement('li');
        description.classList.add('descr--li');
        description.classList.add(`${el}`);
        return descrWeather.append(description);
    });
};
createLiDescrWeather('summary', 'feels', 'wind', 'humidity');

const weatherThreeDaysWrap = document.createElement('div');
weatherThreeDaysWrap.classList.add('wrapper--three_days');

const createNextDays = (...arg) => {
    arg.forEach((el) => {
        const nextDaysName = document.createElement('span');
        nextDaysName.classList.add('three_days--name');
        nextDaysName.classList.add(el);

        const nextDaysWrapper = document.createElement('div');
        nextDaysWrapper.classList.add('three_days--wrapper');

        const descrNextDays = document.createElement('div');
        descrNextDays.classList.add('three_days--descr');
        descrNextDays.classList.add(el);

        const tempNextDay = document.createElement('span');
        tempNextDay.classList.add('three_days--temp');
        tempNextDay.classList.add(el);
        tempNextDay.innerText = '3';

        const imgDescr = document.createElement('img');
        imgDescr.classList.add('three_days--img');
        imgDescr.classList.add(el);

        descrNextDays.append(tempNextDay, imgDescr);
        nextDaysWrapper.append(nextDaysName, descrNextDays);
        weatherThreeDaysWrap.append(nextDaysWrapper);
    });
};

createNextDays('tomorrow', 'afterTomorrow', 'dayAfterTomorrow');

weatherTodayDescrWrap.append(todayDescrWrapImg, descrWeather);
wrapperWeatherToday.append(weatherToday, weatherTodayDescrWrap);
wrapperWeather.append(currentCity, dataCurWrap, wrapperWeatherToday, weatherThreeDaysWrap);

/* map */

const geoLocatMapWrapper = document.createElement('div');
geoLocatMapWrapper.classList.add('geoLocat--wrapper');

const map = document.createElement('div');
map.classList.add('geoLocat--map');
map.id = 'map';

const latitudeMap = document.createElement('span');
latitudeMap.classList.add('latitude--map');
latitudeMap.innerText = 'latitude';

const longitudeMap = document.createElement('span');
longitudeMap.classList.add('longitude--map');
longitudeMap.innerText = 'longitude';

// map wrapper
geoLocatMapWrapper.append(map, latitudeMap, longitudeMap);
// weather wrapper
main.append(wrapperWeather, geoLocatMapWrapper);

root.append(header, main);

let celsOrFahr;

const popLocalCelsOrFahr = (flag) => {
    localStorage.setItem('keyFlag', flag);
};

if (localStorage.getItem('keyFlag')) {
    celsOrFahr = JSON.parse(localStorage.getItem('keyFlag'));
} else {
    celsOrFahr = true;
}

celsius.addEventListener('click', () => {
    celsOrFahr = true;
    popLocalCelsOrFahr(celsOrFahr);
    getWeather();
});
// localStorage.clear();
fahrenheit.addEventListener('click', () => {
    celsOrFahr = false;
    popLocalCelsOrFahr(celsOrFahr);
    getWeather();
});

selectLang.onchange = (e) => {
    selectLang.value = e.target.value;
    lang = selectLang.value;
    popLocalLang(e.target.value);
    renderCity(inputCity.value);
    textLan();
};

search.addEventListener('click', () => {
    renderCity(inputCity.value);
    chengeCityMap(inputCity.value);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        renderCity(inputCity.value);
        chengeCityMap(inputCity.value);
    }
});


const SpeechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
SpeechRecognition.lang = 'ru-RU';
SpeechRecognition.onresult = (event) => {
    const a = event.results[0];
    inputCity.value = a[0].transcript;
};

voice.addEventListener('mousedown', () => {
    SpeechRecognition.start();
});
voice.addEventListener('mouseup', () => {
    SpeechRecognition.abort();
    renderCity(inputCity.value);
    chengeCityMap(inputCity.value);
});

voice.addEventListener('touchstart', () => {
    SpeechRecognition.start();
});
voice.addEventListener('touchend', () => {
    SpeechRecognition.abort();
    renderCity(inputCity.value);
    chengeCityMap(inputCity.value);
});

const backgInage = async (ofYear, ofDay) => {
    try {
        const image = await getLinkToImage(ofYear, ofDay);
        root.style.background = `url(${image})`;
        root.style.backgroundRepeat = 'no-repeat';
        root.style.backgroundSize = 'cover';
    } catch (err) {
        root.style.background = './assets/images/bg3.png';
        root.style.backgroundRepeat = 'no-repeat';
        root.style.backgroundSize = 'cover';
    }
};

let currentTime = new Date();
let timeOfYear;
let timeOfDay;
if (currentTime.getHours() === 11) {
    timeOfYear = 'winter';
} else if (currentTime.getMonth() < 11) {
    timeOfYear = 'spring';
} else if (currentTime.getMonth() < 8) {
    timeOfYear = 'summer';
} else if (currentTime.getMonth() < 5) {
    timeOfYear = 'autumn';
} else if (currentTime.getMonth() < 2) {
    timeOfYear = 'winter';
}

if (currentTime.getHours() < 6) {
    timeOfDay = 'night';
} else if (currentTime.getHours() < 12) {
    timeOfDay = 'morning';
} else if (currentTime.getHours() < 18) {
    timeOfDay = 'daytime';
} else if (currentTime.getHours() <= 23) {
    timeOfDay = 'evening';
}

backgInage(timeOfYear, timeOfDay);
chengeBackground.addEventListener('click', async () => {
    backgInage(timeOfYear, timeOfDay);
});

// eslint-disable-next-line
ymaps.ready(init);

let hours;
let minutes;
if (currentTime.getHours() < 10) {
    hours = `0${currentTime.getHours()}`;
} else {
    hours = currentTime.getHours();
}
if (currentTime.getMinutes() < 10) {
    minutes = `0${currentTime.getMinutes()}`;
} else {
    minutes = currentTime.getMinutes();
}
timeCur.innerHTML = ` ${hours}:${minutes}`;
setInterval(() => {
    currentTime = new Date();
    if (currentTime.getHours() < 10) {
        hours = `0${currentTime.getHours()}`;
    } else {
        hours = currentTime.getHours();
    }
    if (currentTime.getMinutes() < 10) {
        minutes = `0${currentTime.getMinutes()}`;
    } else {
        minutes = currentTime.getMinutes();
    }
    timeCur.innerHTML = ` ${hours}:${minutes}`;
}, 60000);

export { dateCur, currentCity, weatherToday, todayDescrWrapImg, descrWeather, latitudeMap, longitudeMap, celsius, fahrenheit, celsOrFahr, weatherThreeDaysWrap, lang };
