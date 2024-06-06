//TODO реализовать блокировку фильтра, если по нему нет данных.
import { FilterType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const createFilterElementTemplate = (type) => {
  const handleCheckedFlag = (filterType) => filterType === FilterType.EVETYTHING ? 'checked' : '';

  return (
    `<div class="trip-filters__filter">
     <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${handleCheckedFlag(type)}>
     <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  );
};

const createFilterTemplate = () =>
  (
    `<form class="trip-filters" action="#" method="get">
      ${Object.values(FilterType).map(createFilterElementTemplate).join(' ')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );

export default class FilterView extends AbstractView {
  #currentFilter = null;
  #onFilterChange = null;

  constructor({currentFilter, onFilterChange}) {
    super();
    this.#currentFilter = currentFilter;
    this.#onFilterChange = onFilterChange;

    this.element.addEventListener('click', this.#filterChangeHandler);
  }

  get template() {
    return createFilterTemplate();
  }

  #filterChangeHandler = (evt) => {
    const filterName = evt.target.value;
    if (evt.target.name === 'trip-filter' && this.#currentFilter !== filterName) {
      this.#currentFilter = filterName;
      this.#onFilterChange(filterName);
    }
  };
}
