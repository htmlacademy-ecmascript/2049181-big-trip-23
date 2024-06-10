import { render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import NoPoints from '../view/no-points.js';
import PointPresenter from './point-presenter.js';
import { SortType } from '../const.js';
import { sortByDate, sortByDuration, sortByPrice } from '../util.js';

export default class BoardPresenter {

  #eventsList = new PointsListView;
  #boardContainer = null;
  #dataModel = null;
  #filterModel = null;
  #eventItems = [];
  #unsortedEventItems = [];
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
    this.#sortData();

    ({eventItems: this.#unsortedEventItems} = this.#dataModel.data);

    if (this.#eventItems.length === 0) {
      render(new NoPoints({currentFilter: this.#getCurrentFilter()}), this.#boardContainer);
      return;
    }

    this.#renderBoard();
  }

  #renderSort() {
    render(new SortView({onSortChange: this.#handleSortChange}), this.#boardContainer);
  }

  #renderPointsList() {
    render(this.#eventsList, this.#boardContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#eventsList.element,
      onDataChange: this.#handlePointChange,
      onFormOpen: this.#handleFormOpen,
      allOffers: this.#offers,
      destinations: this.#destinations
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {

    this.#eventItems.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderBoard() {
    this.#renderSort();
    this.#renderPointsList();
    this.#renderPoints();
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
    this.#eventItems = this.#updatePoint(update, this.#eventItems);
    this.#unsortedEventItems = this.#updatePoint(update, this.#unsortedEventItems);
    this.#pointPresenters.get(update.id).init(update);
  };

  #handleFormOpen = () => {
    this.#pointPresenters.forEach((presenter) => presenter.reset());
  };

  #handleSortChange = (sortType) => {
    this.#sortData(sortType);
    this.#clearAllPoints();
    this.#renderPoints();
  };

  #sortData = (sortType) => {
    const data = this.#eventItems.slice();

    switch (sortType) {
      case SortType.PRICE:
        this.#eventItems = data.sort(sortByPrice);
        break;

      case SortType.TIME:
        this.#eventItems = data.sort(sortByDuration);
        break;

      default:
        this.#eventItems = data.sort(sortByDate);

    }
  };
}
