import { FilterType } from '../const.js';

export default class FilterModel {
  #currentFilter = FilterType.EVETYTHING;
  #allFilters = Object.values(FilterType);

  get filter() {
    return this.#currentFilter;
  }

  set filter(newFilter) {
    if (this.#allFilters.includes(newFilter)) {
      this.#currentFilter = newFilter;
    }
  }
}
