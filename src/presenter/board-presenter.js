import { render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import NoPoints from '../view/no-points.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {

  #eventsList = new PointsListView;
  #boardContainer = null;
  #dataModel = null;
  #filterModel = null;
  #eventItems = [];
  #destinations = [];
  #offers = [];


  constructor({boardContainer, dataModel, filterModel}) {
    this.#boardContainer = boardContainer;
    this.#dataModel = dataModel;
    this.#filterModel = filterModel;
  }

  init() {
    ({
      eventItems: this.#eventItems,
      destinations: this.#destinations,
      offers: this.#offers
    } = this.#dataModel.data);

    if (this.#eventItems.length === 0) {
      render(new NoPoints({currentFilter: this.#getCurrentFilter()}), this.#boardContainer);
      return;
    }

    this.#renderBoard();
  }

  #renderSort() {
    render(new SortView, this.#boardContainer);
  }

  #renderPointsList() {
    render(this.#eventsList, this.#boardContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({point, container: this.#eventsList.element});
    pointPresenter.init();
  }

  #renderPoints() {
    this.#eventItems.forEach((point) => {
      point = this.#createAdvancedPoint(point);
      this.#renderPoint(point);
    });
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

  #getCurrentFilter() {
    return this.#filterModel.filter;
  }
}
