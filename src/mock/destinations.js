import { DESCRIPTION, DESTINATIONS } from './const.js';
import { getRandomArrayElement, getRandomInteger, makeGetRandomIntegerNoRepeat } from './util.js';

const descriptions = DESCRIPTION.split('. ');
const destinations = DESTINATIONS.slice();

const createId = makeGetRandomIntegerNoRepeat();

const createRandomDescription = () => {
  if (descriptions) {
    return descriptions[getRandomInteger(0, descriptions.length - 1)];
  }
};

const createPicture = () => (
  {
    'src': `https://loremflickr.com/248/152?random=${getRandomInteger(101, 999)}`,
    'description': createRandomDescription()
  }
);

const createPictures = () => Array.from({length: getRandomInteger(1, 4)}).map(createPicture);

const createCityName = (cities) => {
  const city = getRandomArrayElement(cities);
  const cityIndex = cities.findIndex((el) => el === city);
  cities.splice(cityIndex, 1);
  return city;
};

const createDestination = () => (
  {
    'id': createId(1000, 9999),
    'description': `${Array.from({length: getRandomInteger(1, 5)}).map(createRandomDescription).join('. ')}.`,
    'name': createCityName(destinations),
    'pictures': createPictures()
  }
);

const getDestinations = () => Array.from({length: destinations.length}).map(createDestination);

export { getDestinations };
