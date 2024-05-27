import { render } from '../render.js';
import SortView from '../view/sort-view.js';
import EventsItemEditView from '../view/events-item-edit-view.js';
import EventsItemView from '../view/events-item-view.js';
import EventsListView from '../view/events-list-view.js';


const TRIP_ELEMENTS_COUNT = 3;


export default class BoardPresenter {

  eventsList = new EventsListView;

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new SortView, this.boardContainer);
    render(this.eventsList, this.boardContainer);
    render(new EventsItemEditView, this.eventsList.getElement());

    Array.from({length: TRIP_ELEMENTS_COUNT}).forEach(() => {
      render(new EventsItemView, this.eventsList.getElement());
    });
  }
}
