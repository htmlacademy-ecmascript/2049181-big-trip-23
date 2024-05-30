import { render } from '../render.js';
import SortView from '../view/sort-view.js';
import EventsItemEditView from '../view/events-item-edit-view.js';
import EventsItemView from '../view/events-item-view.js';
import EventsListView from '../view/events-list-view.js';

export default class BoardPresenter {

  eventsList = new EventsListView;

  constructor({boardContainer, dataModel}) {
    this.boardContainer = boardContainer;
    this.dataModel = dataModel;
  }

  init() {
    const { eventItems, destinations, offers } = this.dataModel.getData();
    const getDestinationName = (id) => destinations.find((element) => element.id === id).name;
    const getOffersByType = (type) => offers.find((element) => element.type === type).offers;
    const getOffersById = (selectedOffers, type) => {
      const allOffers = getOffersByType(type);
      return allOffers.filter(
        (offer) => selectedOffers.includes(offer.id)
      );
    };

    render(new SortView, this.boardContainer);
    render(this.eventsList, this.boardContainer);
    render(new EventsItemEditView, this.eventsList.getElement());

    eventItems.forEach((eventItem) => {
      render(new EventsItemView(
        {...eventItem,
          destinationName: getDestinationName(eventItem.destination),
          selectedOffers: getOffersById(eventItem.offers, eventItem.type)

        }
      ), this.eventsList.getElement());
    });
  }
}
