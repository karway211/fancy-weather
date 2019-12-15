import { weatherToday, descrWeather, celsOrFahr, fahrenheit, celsius, lang } from '../index';
import { weaterNextF, weaterNextC } from './weather-next';
import { getWeekDay, getWeekDayNext } from './getData';
import { latitude, longitude } from './location';

const getWeatherApi = async () => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const response = await fetch(`${proxyUrl}https://api.darksky.net/forecast/3ff58e19cb3a6ea2e8c4ab139884c8c7/${latitude},${longitude}?lang=${lang}`);
    if (response.status === 200) {
        const data = await response.json();
        return data;
    } else {
      throw new Error('Unable to get the current Weather');
    }
};


const getWeather = async () => {
    const data = await getWeatherApi();
    // console.log(data);
    const dataTomorrow = data.daily.data[1];
    const dataAfterTomorrow = data.daily.data[2];
    const dataDayAfterTomorrow = data.daily.data[3];
    const weatherNodeNext = document.querySelectorAll('.three_days--temp');
    const weatherImgNext = document.querySelectorAll('.three_days--img');
    const dataCur = document.querySelector('.weather--date');
    const { time, icon, windGust, temperature, summary, humidity} = data.currently;
    dataCur.innerHTML = getWeekDay(time);
    const tomorrow = data.daily.data[1];
    const afterTomorrow = data.daily.data[2];
    const dayAfterTomorrow = data.daily.data[3];
    const img = document.querySelector('.descr--img');
    img.src = `../assets/images/51/${icon}.svg`;

    weatherImgNext.forEach((el) => {
        if(el.className === 'three_days--img tomorrow'){
            el.src = `../assets/images/5m/${tomorrow.icon}.svg`;
        }
        if(el.className === 'three_days--img afterTomorrow'){
            el.src = `../assets/images/5m/${afterTomorrow.icon}.svg`;
        }
        if(el.className === 'three_days--img dayAfterTomorrow'){
            el.src = `../assets/images/5m/${dayAfterTomorrow.icon}.svg`;
        }
    })
    
    let feelsLike;
    if (celsOrFahr) {
        weatherToday.innerHTML = `${Math.round((temperature - 32) * 5 / 9 )}&#176;`;
        feelsLike = Math.round((data.currently.apparentTemperature - 32) * 5 / 9 );

        weatherNodeNext.forEach((el) => {
            if(el.className === 'three_days--temp tomorrow'){
                el.innerHTML = `${weaterNextC(dataTomorrow.temperatureMax, dataTomorrow.temperatureMin)}&#176;`;
            }
            if(el.className === 'three_days--temp afterTomorrow'){
                el.innerHTML = `${weaterNextC(dataAfterTomorrow.temperatureMax, dataAfterTomorrow.temperatureMin)}&#176;`;
            }
            if(el.className === 'three_days--temp dayAfterTomorrow'){
                el.innerHTML = `${weaterNextC(dataDayAfterTomorrow.temperatureMax, dataDayAfterTomorrow.temperatureMin)}&#176;`;
            }
        })

        fahrenheit.classList.remove('active');
        celsius.classList.add('active');
    } else {
        weatherToday.innerHTML = `${Math.round(temperature)}&#176;`;
        feelsLike = Math.round(data.currently.apparentTemperature);

        weatherNodeNext.forEach((el) => {
            if(el.className === 'three_days--temp tomorrow'){
                el.innerHTML = `${weaterNextF(dataTomorrow.temperatureMax, dataTomorrow.temperatureMin)}&#176;`;
            }
            if(el.className === 'three_days--temp afterTomorrow'){
                el.innerHTML = `${weaterNextF(dataAfterTomorrow.temperatureMax, dataAfterTomorrow.temperatureMin)}&#176;`;
            }
            if(el.className === 'three_days--temp dayAfterTomorrow'){
                el.innerHTML = `${weaterNextF(dataDayAfterTomorrow.temperatureMax, dataDayAfterTomorrow.temperatureMin)}&#176;`;
            }
        })

        fahrenheit.classList.add('active');
        celsius.classList.remove('active');
    }
    const wind = Math.round(windGust);
    const humidity100 = +humidity * 100;
    let li = descrWeather.querySelectorAll('.descr--li');
    const mS = (n) => {return n * 1000 / 3600};
    li.forEach(elem => {
        if(elem.className === 'descr--li summary') elem.textContent = (`${summary}`).toUpperCase();
        if(elem.className === 'descr--li feels') {
            if (lang === 'en') {
                elem.innerHTML = (`Feels like: ${feelsLike}&#176;`).toUpperCase();
            }
            if (lang === 'ru') {
                elem.innerHTML = (`ощущается как: ${feelsLike}&#176;`).toUpperCase();
            }
            if (lang === 'be') {
                elem.innerHTML = (`адчуваецца як: ${feelsLike}&#176;`).toUpperCase();
            }
        }
        if(elem.className === 'descr--li wind') {
            if (lang === 'en') {
                elem.textContent = `${('Wind:').toUpperCase()} ${Math.round(mS(wind))} ${('m/s').toLowerCase()}`;
            }
            if (lang === 'ru') {
                elem.textContent = `${('ветер:').toUpperCase()} ${Math.round(mS(wind))} ${('м/с').toLowerCase()}`;
            }
            if (lang === 'be') {
                elem.textContent = `${('вецер:').toUpperCase()} ${Math.round(mS(wind))} ${('м/с').toLowerCase()}`;
            }
        }
        if(elem.className === 'descr--li humidity') {
            if (lang === 'en') {
                elem.innerHTML = (`Humidity: ${humidity100}&#37;`).toUpperCase();
            }
            if (lang === 'ru') {
                elem.innerHTML = (`Влажность: ${humidity100}&#37;`).toUpperCase();
            }
            if (lang === 'be') {
                elem.innerHTML = (`Вільготнасць: ${humidity100}&#37;`).toUpperCase();
            }
        }
    });

    const iconNextDays = document.querySelectorAll('.three_days--name');
    iconNextDays.forEach((el) => {
        if (el.className === 'three_days--name tomorrow') {
            el.innerHTML = getWeekDayNext(tomorrow.time);
        }
        if (el.className === 'three_days--name afterTomorrow') {
            el.innerHTML = getWeekDayNext(afterTomorrow.time);
        }
        if (el.className === 'three_days--name dayAfterTomorrow') {
            el.innerHTML = getWeekDayNext(dayAfterTomorrow.time);
        }
    });
};

const getCurrentTime = async () => {
    const data = await getWeatherApi();
    console.log(new Date().toLocaleTimeString("en-GB", {timeZone: `${data.timezone}`}).slice(0, 5))
    // return new Date().toLocaleTimeString("en-GB", {timeZone: `${data.timezone}`}).slice(0, 5);
}

export { getWeather, getCurrentTime }