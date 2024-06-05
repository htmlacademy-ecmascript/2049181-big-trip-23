import { RenderPosition, render } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import TripInfoView from '../view/trip-info-view.js';

export default class HeaderPresenter {

  #tripInfoContainer = null;
  #filtersContainer = null;
  #filterModel = null;
  #filterView = null;


  constructor({tripInfoContainer, filtersContainer, filterModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#filtersContainer = filtersContainer;
    this.#filterModel = filterModel;

  }

  init() {
    render(new TripInfoView, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
    this.#updateFilterView();
    this.#renderFilters(this.#filterView);
  }

  #updateFilterView() {
    this.#filterView = new FilterView({
      currentFilter: this.#getCurrentFilter(),
      onFilterChange: this.#onFilterChange
    });
  }

  #renderFilters() {
    render(this.#filterView, this.#filtersContainer);
  }

  #onFilterChange = (filterName) => {
    this.#setCurrentFilter(filterName);
  };

  #getCurrentFilter() {
    return this.#filterModel.filter;
  }

  #setCurrentFilter(filter) {
    this.#filterModel.filter = filter;
  }
}
