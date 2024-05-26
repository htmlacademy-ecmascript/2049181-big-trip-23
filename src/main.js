import { RenderPosition, render } from './render.js';
import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import { init } from './presenter/board-presenter.js';

const tripInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');

render(new TripInfoView, tripInfoContainer, RenderPosition.AFTERBEGIN);
render(new FilterView, filtersContainer);
init();
