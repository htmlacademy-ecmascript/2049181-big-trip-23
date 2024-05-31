import { RenderPosition, render } from './render.js';
import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import DataModel from './model/data-model.js';


const tripInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const boardContainer = document.querySelector('.trip-events');
const dataModel = new DataModel();
const boardPresenter = new BoardPresenter({boardContainer: boardContainer, dataModel});

render(new TripInfoView, tripInfoContainer, RenderPosition.AFTERBEGIN);
render(new FilterView, filtersContainer);
boardPresenter.init();


