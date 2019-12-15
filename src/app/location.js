import { currentCity, latitudeMap, longitudeMap, lang } from '../index';
import { getWeather, getCurrentTime } from './arr-weather';
import { myMap } from './map';

let latitude;
let longitude;
const getNameCity = async () => {
  const resp = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=71561645-4edf-4651-bd23-4fd153d55e69&format=json&geocode=${longitude},${latitude}&lang=${lang}`);
    const data = await resp.json();
    return data;
}

const renderNameCity = async () => {
  const data = await getNameCity();
    const curCuty = data.response.GeoObjectCollection.featureMember[0].GeoObject.description;
    currentCity.textContent = curCuty;
}

const getLoc = async () => {
  const response = await fetch('https://ipinfo.io/json?token=7b360efe528d2d');
      const data = await response.json();
      return {data};
};

const getLocation = async () => {
  const data = await getLoc();
  // console.log(data);
  const inputPushCity = document.querySelector('.searching--city');
  inputPushCity.value = data.data.city;
  if (data.data.city === "Homyel'") {
    inputPushCity.value = 'Gomel';
  }
  latitude = data.data.loc.split(',')[0];
  longitude = data.data.loc.split(',')[1];
  if(lang === 'en') {
    latitudeMap.textContent = `latitude: ${latitude}`;
    longitudeMap.textContent = `longitude: ${longitude}`;
  }
  if(lang === 'ru') {
    latitudeMap.textContent = `широта: ${latitude}`;
    longitudeMap.textContent = `долгота: ${longitude}`;
  }
  if(lang === 'be') {
    latitudeMap.textContent = `шырата: ${latitude}`;
    longitudeMap.textContent = `даўгата: ${longitude}`;
  }
  renderNameCity();
  getWeather();
};

getLocation();

const getCity = async (city) => {
  const baseUrl = 'https://geocode-maps.yandex.ru/1.x/';
  const clientAssKey = '?apikey=71561645-4edf-4651-bd23-4fd153d55e69&format=json';
  const cityString = `&geocode=${city}`;
  const langString = `&lang=${lang}`;
  const url = baseUrl + clientAssKey + cityString + langString;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const renderCity = async (city) => {
      const data = await getCity(city);
      console.log(data);
      const dataObj = data.response.GeoObjectCollection.featureMember[0].GeoObject;
      latitude = dataObj.Point.pos.split(' ')[1];
      longitude = dataObj.Point.pos.split(' ')[0];
      if(lang === 'en') {
        latitudeMap.textContent = `latitude: ${latitude}`;
        longitudeMap.textContent = `longitude: ${longitude}`;
      }
      if(lang === 'ru') {
        latitudeMap.textContent = `широта: ${latitude}`;
        longitudeMap.textContent = `долгота: ${longitude}`;
      }
      if(lang === 'be') {
        latitudeMap.textContent = `шырата: ${latitude}`;
        longitudeMap.textContent = `даўгата: ${longitude}`;
      }
      renderNameCity();
      getWeather();
}

// const renderCurrentTime = async (city) => {
//   const data = await getCity(city);
//   const dataObj = data.response.GeoObjectCollection.featureMember[0].GeoObject;
//   latitude = dataObj.Point.pos.split(' ')[1];
//   longitude = dataObj.Point.pos.split(' ')[0];
//   getCurrentTime();
// }

const chengeCityMap = async (city) => {
  const data = await getCity(city);
  const dataObj = data.response.GeoObjectCollection.featureMember[0].GeoObject;
  latitude = dataObj.Point.pos.split(' ')[1];
  longitude = dataObj.Point.pos.split(' ')[0];
  myMap.setCenter([`${latitude}`, `${longitude}`], 10);
  const myPlacemark = new ymaps.Placemark([latitude,longitude], null, {
    preset: 'islands#blueDotIcon'
  });
myMap.geoObjects.add(myPlacemark)
}

export { getLocation, latitude, longitude, renderCity, chengeCityMap } 