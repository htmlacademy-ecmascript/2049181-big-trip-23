import { render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventsItemEditView from '../view/events-item-edit-view.js';
import EventsItemView from '../view/events-item-view.js';
import EventsListView from '../view/events-list-view.js';

export default class BoardPresenter {

  #eventsList = new EventsListView;
  #boardContainer = null;
  #dataModel = null;
  #eventItems = [];
  #destinations = [];
  #offers = [];


  constructor({boardContainer, dataModel}) {
    this.#boardContainer = boardContainer;
    this.#dataModel = dataModel;
  }

  init() {
    ({
      eventItems: this.#eventItems,
      destinations: this.#destinations,
      offers: this.#offers
    } = this.#dataModel.data);

    this.#renderBoard();
  }

  #renderSort() {
    render(new SortView, this.#boardContainer);
  }

  #renderPointsList() {
    render(this.#eventsList, this.#boardContainer);
  }

  #renderPoint(point) {
    point = this.#createAdvancedPoint(point);
    const eventItemView = new EventsItemView(point);
    const eventItemEditView = new EventsItemEditView(point);

    render(eventItemView, this.#eventsList.element);
  }

  #renderPoints() {
    this.#eventItems.forEach((point) => this.#renderPoint(point));
  }

  #renderBoard() {
    this.#renderSort();
    this.#renderPointsList();
    this.#renderPoints();
  }

  #createAdvancedPoint(point) {
    const getDestinationName = (id) => this.#destinations.find((element) => element.id === id).name;
    const getOffersByType = (type) => this.#offers.find((element) => element.type === type).offers;
    const getOffersById = (selectedOffers, type) => getOffersByType(type).filter((offer) => selectedOffers.includes(offer.id));

    return (
      {
        ...point,
        destinationName: getDestinationName(point.destination),
        offers: getOffersById(point.offers, point.type),
        allOffers: getOffersByType(point.type),
        destinationsList: this.#destinations
      }
    );
  }
}
