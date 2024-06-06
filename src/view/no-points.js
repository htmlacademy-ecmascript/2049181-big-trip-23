import { EmptyListMessages } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const createNoPointsTemplate = (currentFilter) => (
  `<p class="trip-events__msg">${EmptyListMessages[currentFilter]}</p>`
);

export default class NoPoints extends AbstractView {
  #currentFilter = '';

  constructor({currentFilter}) {
    super();
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createNoPointsTemplate(this.#currentFilter);
  }
}
