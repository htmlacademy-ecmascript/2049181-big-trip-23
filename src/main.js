import { RenderPosition, render } from './render.js';
import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';

const tripInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const boardContainer = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: boardContainer});

render(new TripInfoView, tripInfoContainer, RenderPosition.AFTERBEGIN);
render(new FilterView, filtersContainer);
boardPresenter.init();
