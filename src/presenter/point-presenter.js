import { remove, render, replace } from '../framework/render.js';
import { isESCbutton } from '../util.js';
import PointEditView from '../view/point-edit-view.js';
import PointItemView from '../view/point-view.js';

export default class PointPresenter {
  #point = null;
  #container = null;
  #handleDataChange = null;
  #pointItemView = null;
  #pointEditView = null;

  constructor({container, onDataChange}) {
    this.#container = container;
    this.#handleDataChange = onDataChange;
  }

  init(point) {
    this.#point = point;

    const previousPointItemView = this.#pointItemView;
    const previousPointEditView = this.#pointEditView;

    const escKeydownHandler = (evt) => {
      if (isESCbutton(evt)) {
        evt.preventDefault();
        this.#replaceFormToPoint();

        document.removeEventListener('keydown', escKeydownHandler);
      }
    };

    this.#pointItemView = new PointItemView({
      point: this.#point,
      onRollupButtonClick: () => {
        this.#replacePointToForm();

        document.addEventListener('keydown', escKeydownHandler);
      },
      onFavoriteButtonClick: this.#handleFavoriteButtonClick
    });


    this.#pointEditView = new PointEditView({
      point: this.#point,
      onSaveButtonClick: () => {
        this.#replaceFormToPoint();

        document.removeEventListener('keydown', escKeydownHandler);
      }
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
  }

  #replaceFormToPoint() {
    replace(this.#pointItemView, this.#pointEditView);
  }

  destroy() {
    remove(this.#pointItemView);
    remove(this.#pointEditView);
  }

  #handleFavoriteButtonClick = () => {
    this.#handleDataChange({ ...this.#point,
      isFavorite: !this.#point.isFavorite
    });
  };

}
