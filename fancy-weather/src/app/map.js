import { latitude, longitude } from './location';

let myMap;
const init = async () => {
    try {
        /* eslint-disable-next-line */
        myMap = await new ymaps.Map('map', {
            center: [latitude, longitude],
            zoom: 10,
        }, { searchControlProvider: 'yandex#search' });
        /* eslint-disable-next-line */
        const myPlacemark = new ymaps.Placemark([latitude, longitude], null, { preset: 'islands#blueDotIcon' });
        myMap.geoObjects.add(myPlacemark);
    } catch (err) {
        alert('Sorry, unable to get city');
    }
};

export { init, myMap };
