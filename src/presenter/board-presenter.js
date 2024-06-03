import { render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventsItemEditView from '../view/events-item-edit-view.js';
import EventsItemView from '../view/events-item-view.js';
import EventsListView from '../view/events-list-view.js';

export default class BoardPresenter {

  #eventsList = new EventsListView;
  #boardContainer = null;
  #dataModel = null;

  constructor({boardContainer, dataModel}) {
    this.#boardContainer = boardContainer;
    this.#dataModel = dataModel;
  }

  init() {
    const { eventItems, destinations, offers } = this.#dataModel.getData();
    const getDestinationName = (id) => destinations.find((element) => element.id === id).name;
    const getOffersByType = (type) => offers.find((element) => element.type === type).offers;
    const getOffersById = (selectedOffers, type) => {
      const allOffers = getOffersByType(type);
      return allOffers.filter(
        (offer) => selectedOffers.includes(offer.id)
      );
    };
    const createAdvancedEventItem = (eventItem, destinationsList) => {
      if (destinationsList) {
        eventItem = {
          ... eventItem,
          allOffers: getOffersByType(eventItem.type),
          destinationsList
        };
      }

      return (
        {
          ...eventItem,
          destinationName: getDestinationName(eventItem.destination),
          offers: getOffersById(eventItem.offers, eventItem.type)
        }
      );
    };
    render(new SortView, this.#boardContainer);
    render(this.#eventsList, this.#boardContainer);
    render(new EventsItemEditView(createAdvancedEventItem(eventItems[0], destinations)), this.#eventsList.element);

    for (let i = 1; i < eventItems.length; i++) {
      const eventItem = createAdvancedEventItem(eventItems[i]);

      render(new EventsItemView(eventItem),
        this.#eventsList.element
      );
    }
  }
}
