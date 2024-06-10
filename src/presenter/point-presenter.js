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
  #offers = null;
  #destinations = null;
  #mode = Mode.DEFAULT;

  constructor({container, onDataChange, onFormOpen, allOffers, destinations}) {
    this.#container = container;
    this.#handleDataChange = onDataChange;
    this.#handleFormOpen = onFormOpen;
    this.#offers = allOffers;
    this.#destinations = destinations;
  }

  init(point) {
    this.#point = point;

    const previousPointItemView = this.#pointItemView;
    const previousPointEditView = this.#pointEditView;

    this.#pointItemView = new PointItemView({
      point: {
        ...this.#point,
        destinationName: this.#getDestinationName(this.#point.destination, this.#destinations),
        offers: this.#getOffersById(this.#point.offers, this.#point.type)
      },
      onRollupButtonClick: () => {
        this.#handleFormOpen();
        this.#replacePointToForm();
      },
      onFavoriteButtonClick: this.#handleFavoriteButtonClick
    });


    this.#pointEditView = new PointEditView({
      point: {
        ...this.#point,
        offers: this.#getOffersById(this.#point.offers, this.#point.type)
      },
      onSaveButtonClick: () => {
        this.#replaceFormToPoint();
      },
      offers: this.#offers,
      destinations: this.#destinations,
      getOffersByType: this.#getOffersByType,
      getDestinationName: this.#getDestinationName
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

  #getDestinationName(id, destinations) {
    return destinations.find((element) => element.id === id).name;
  }

  #getOffersByType = (type) => this.#offers.find((element) => element.type === type).offers;

  #getOffersById(selectedOffers, type) {
    return this.#getOffersByType(type).filter((offer) => selectedOffers.includes(offer.id));
  }

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
