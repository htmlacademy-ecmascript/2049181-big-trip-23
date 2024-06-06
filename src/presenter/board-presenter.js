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
  #pointPresenters = new Map();


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
    const pointPresenter = new PointPresenter({
      container: this.#eventsList.element,
      onDataChange: this.#handlePointChange,
      onFormOpen: this.#handleFormOpen,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.#eventItems.forEach((point) => {
      if (!point.destinationsList) {
        point = this.#createAdvancedPoint(point);
      }

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

  #updatePoint(update, points) {
    return points.map((point) => point.id === update.id ? update : point);
  }

  #clearAllPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
  }

  #handlePointChange = (update) => {
    this.#eventItems = this.#updatePoint(
      update, this.#eventItems);
    this.#pointPresenters.get(update.id).init(update);
  };

  #handleFormOpen = () => {
    this.#pointPresenters.forEach((presenter) => presenter.reset());
  };
}
