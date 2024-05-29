import { EVENT_TYPES } from '../const.js';
import { getRandomArrayElement, getRandomInteger, makeGetRandomIntegerNoRepeat } from './util.js';

const EVENT_ITEMS_COUNT = 10;

const getRandomIntegerNoRepeat = makeGetRandomIntegerNoRepeat();

const createEventItem = (destinations, offers) => {
  const type = getRandomArrayElement(EVENT_TYPES).toLowerCase();
  const thisTypeOffers = offers.find((offer) => offer.type === type).offers;
  const thisTypeOffersIds = thisTypeOffers.map((offer) => offer.id);
  const selectedOffers = Array.from({length: getRandomInteger(0, 3)}).map(() => getRandomArrayElement(thisTypeOffersIds));

  return (
    {
      'id': getRandomIntegerNoRepeat(1000, 9999),
      'base_price': getRandomInteger(100, 999),
      'date_from': `2024-05-${getRandomInteger(1, 15)}T${getRandomInteger(10, 23)}:00:00.881Z`,
      'date_to': `2024-05-${getRandomInteger(16, 31)}T${getRandomInteger(10, 23)}:00:00.881Z`,
      'destination': getRandomArrayElement(destinations).id,
      'is_favorite': Boolean(getRandomInteger(0, 1)),
      'offers': selectedOffers || [],
      'type': type
    }
  );
};

const getEventItems = (destinations, offers) => Array.from({length: EVENT_ITEMS_COUNT}).map(() => createEventItem(destinations, offers));

export { getEventItems };
