import { EVENT_TYPES } from '../const.js';
import { EVENT_ITEMS_COUNT} from './const.js';
import { getRandomArrayElement, getRandomInteger, makeGetRandomIntegerNoRepeat } from './util.js';

const getRandomIntegerNoRepeat = makeGetRandomIntegerNoRepeat();

const createEventItem = (destinations, offers) => {
  const type = getRandomArrayElement(EVENT_TYPES).toLowerCase();
  const thisTypeOffers = offers.find((offer) => offer.type === type).offers;
  const thisTypeOffersIds = thisTypeOffers.map((offer) => offer.id);
  const createSelectedOffers = () => {
    let selectedOffers = [];
    if (thisTypeOffersIds.length > 0) {
      selectedOffers = Array.from({length: getRandomInteger(0, 3)}).map(() => getRandomArrayElement(thisTypeOffersIds));
    }
    return selectedOffers;
  };
  const hours = getRandomInteger(10, 15);
  const minutes = getRandomInteger(10, 30);
  const month = getRandomInteger(5, 7);

  return (
    {
      'id': getRandomIntegerNoRepeat(1000, 9999),
      'basePrice': getRandomInteger(100, 999),
      'dateFrom': `2024-0${month}-${getRandomInteger(10, 13)}T${hours}:${minutes}:00.881Z`,
      'dateTo': `2024-0${month + getRandomInteger(0, 1)}-${getRandomInteger(13, 15)}T${hours + getRandomInteger(0, 3)}:${minutes + getRandomInteger(1, 29)}:00.881Z`,
      'destination': getRandomArrayElement(destinations).id,
      'isFavorite': Boolean(getRandomInteger(0, 1)),
      'offers': createSelectedOffers(),
      'type': type
    }
  );
};

const getEventItems = (destinations, offers) => Array.from({length: EVENT_ITEMS_COUNT}).map(() => createEventItem(destinations, offers));

export { getEventItems };
