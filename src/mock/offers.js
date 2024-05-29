import { EVENT_TYPES } from '../const.js';
import { DESCRIPTION } from './const.js';
import { getRandomArrayElement, getRandomInteger, makeGetRandomIntegerNoRepeat } from './util.js';

const descriptions = DESCRIPTION.split('. ');
const createId = makeGetRandomIntegerNoRepeat();

const createOffer = () => (
  {
    'id': createId(1000, 9999),
    'title': getRandomArrayElement(descriptions),
    'price': getRandomInteger(20, 120)
  }
);

const createOfferType = (type) => (
  {
    'type': type.toLowerCase(),
    'offers': Array.from({length: getRandomInteger(0, 5)}).map(createOffer)
  }
);

const getOffers = () => EVENT_TYPES.slice().map((type) => createOfferType(type));

export { getOffers };
