import { render, replace } from '../framework/render.js';
import { isESCbutton } from '../util.js';
import PointEditView from '../view/point-edit-view.js';
import PointItemView from '../view/point-view.js';

export default class PointPresenter {
  #point = null;
  #container = null;
  constructor({point, container}) {
    this.#point = point;
    this.#container = container;
  }

  init() {
    const point = this.#point;

    const escKeydownHandler = (evt) => {
      if (isESCbutton(evt)) {
        evt.preventDefault();
        replaceFormToPoint();

        document.removeEventListener('keydown', escKeydownHandler);
      }
    };

    const eventItemView = new PointItemView({
      point,
      onRollupButtonClick: () => {
        replacePointToForm();

        document.addEventListener('keydown', escKeydownHandler);
      }
    });

    const eventItemEditView = new PointEditView({
      point,
      onSaveButtonClick: () => {
        replaceFormToPoint();

        document.removeEventListener('keydown', escKeydownHandler);
      }
    });

    function replacePointToForm() {
      replace(eventItemEditView, eventItemView);
    }

    function replaceFormToPoint() {
      replace(eventItemView, eventItemEditView);
    }

    render(eventItemView, this.#container);
  }

}
