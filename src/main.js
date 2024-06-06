import HeaderPresenter from './presenter/header-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import DataModel from './model/data-model.js';
import FilterModel from './model/filter-model.js';

const tripInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const boardContainer = document.querySelector('.trip-events');
const dataModel = new DataModel();
const filterModel = new FilterModel();
const headerPresenter = new HeaderPresenter({tripInfoContainer, filtersContainer, filterModel});
const boardPresenter = new BoardPresenter({boardContainer, dataModel, filterModel});

headerPresenter.init();
boardPresenter.init();
