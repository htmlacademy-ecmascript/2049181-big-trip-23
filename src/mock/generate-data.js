import { getDestinations } from './destinations.js';
import { getEventItems } from './event-items.js';
import { getOffers } from './offers.js';

const generateData = () => {
  const destinations = getDestinations();
  const offers = getOffers();
  const eventItems = getEventItems(destinations, offers);

  return {eventItems, destinations, offers};
};

export { generateData };
