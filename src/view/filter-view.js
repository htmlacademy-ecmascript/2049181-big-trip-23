import { FILTER_TYPES } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const createFilterElementTemplate = (type) => {
  const lowerCaseType = type.toLowerCase();

  const handleCheckedFlag = (filterType) => filterType === 'Everything' ? 'checked' : '';

  return (
    `<div class="trip-filters__filter">
     <input id="filter-${lowerCaseType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${lowerCaseType}" ${handleCheckedFlag(type)}>
     <label class="trip-filters__filter-label" for="filter-${lowerCaseType}">${type}</label>
    </div>`
  );
};

const createFilterTemplate = () =>
  (
    `<form class="trip-filters" action="#" method="get">
      ${FILTER_TYPES.map(createFilterElementTemplate).join(' ')}
      <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
  );

export default class FilterView extends AbstractView {
  get template() {
    return createFilterTemplate();
  }

}
