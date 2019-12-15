import { latitude, longitude } from './location';
let myMap;
const init = () => {
    myMap = new ymaps.Map('map', {
         center: [latitude, longitude],
         zoom: 10
     }, {
         searchControlProvider: 'yandex#search'
     });

     const myPlacemark = new ymaps.Placemark([latitude,longitude], null, {
        preset: 'islands#blueDotIcon'
    });
    myMap.geoObjects.add(myPlacemark);
}

export { init, myMap }