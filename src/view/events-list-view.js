import { createElement } from '../render.js';

const createEventsListTemplate = () => (
  '<ul class="trip-events__list"></ul>'
);

export default class EventsListView {
  getTemplate() {
    return createEventsListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(createEventsListTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
