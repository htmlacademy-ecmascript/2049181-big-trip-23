import { remove, render, replace } from '../framework/render.js';
import { isESCbutton } from '../util.js';
import PointEditView from '../view/point-edit-view.js';
import PointItemView from '../view/point-view.js';

const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing'
};

export default class PointPresenter {
  #point = null;
  #container = null;
  #handleDataChange = null;
  #handleFormOpen = null;
  #pointItemView = null;
  #pointEditView = null;
  #allOffers = null;
  #mode = Mode.DEFAULT;

  constructor({container, onDataChange, onFormOpen, allOffers}) {
    this.#container = container;
    this.#handleDataChange = onDataChange;
    this.#handleFormOpen = onFormOpen;
    this.#allOffers = allOffers;
  }

  init(point) {
    this.#point = point;

    const previousPointItemView = this.#pointItemView;
    const previousPointEditView = this.#pointEditView;

    this.#pointItemView = new PointItemView({
      point: this.#point,
      onRollupButtonClick: () => {
        this.#handleFormOpen();
        this.#replacePointToForm();
      },
      onFavoriteButtonClick: this.#handleFavoriteButtonClick
    });


    this.#pointEditView = new PointEditView({
      point: this.#point,
      onSaveButtonClick: () => {
        this.#replaceFormToPoint();
      },
      offers: this.#allOffers
    });

    if (previousPointItemView === null || previousPointEditView === null) {
      render(this.#pointItemView, this.#container);
      return;
    }

    if (this.#container.contains(previousPointItemView.element)) {
      replace(this.#pointItemView, previousPointItemView);
    }

    if (this.#container.contains(previousPointItemView.element)) {
      replace(this.#pointEditView, previousPointEditView);
    }

    remove(previousPointItemView);
    remove(previousPointEditView);
  }

  #replacePointToForm() {
    replace(this.#pointEditView, this.#pointItemView);
    this.#mode = Mode.EDITING;
    document.addEventListener('keydown', this.#escKeydownHandler);
  }

  #replaceFormToPoint() {
    replace(this.#pointItemView, this.#pointEditView);
    this.#mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this.#escKeydownHandler);
  }

  #handleFavoriteButtonClick = () => {
    this.#handleDataChange({ ...this.#point,
      isFavorite: !this.#point.isFavorite
    });
  };

  #escKeydownHandler = (evt) => {
    if (isESCbutton(evt)) {
      evt.preventDefault();
      this.#replaceFormToPoint();


    }
  };

  destroy() {
    remove(this.#pointItemView);
    remove(this.#pointEditView);
  }

  reset() {
    if (this.#mode === Mode.EDITING) {
      this.#replaceFormToPoint();
    }
  }

}
