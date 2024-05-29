import { getDestinations } from './destinations.js';
import { getEventItems } from './event-items.js';
import { getOffers } from './offers.js';

const getData = () => {
  const destinations = getDestinations();
  const offers = getOffers();
  const eventItems = getEventItems(destinations, offers);

  return {eventItems, destinations, offers};
};

export { getData };
