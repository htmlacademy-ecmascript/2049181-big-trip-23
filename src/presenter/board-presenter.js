import { render } from '../render.js';
import SortView from '../view/sort-view.js';
import EventsItemEditView from '../view/events-item-edit-view.js';
import EventsItemView from '../view/events-item-view.js';
import EventsListView from '../view/events-list-view.js';


const TRIP_ELEMENTS_COUNT = 3;

const contentContainer = document.querySelector('.trip-events');
const eventsList = new EventsListView;

const init = () => {

  render(new SortView, contentContainer);
  render(eventsList, contentContainer);
  render(new EventsItemEditView, eventsList.getElement());

  Array.from({length: TRIP_ELEMENTS_COUNT}).forEach(() => {
    render(new EventsItemView, eventsList.getElement());
  });
};

export { init };
