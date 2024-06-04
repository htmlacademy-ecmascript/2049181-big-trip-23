import AbstractView from '../framework/view/abstract-view.js';
import { formatDate, formatTime, humanizeDate, humanizeTime, showDuration } from '../util.js';

const createSelectedOfferTemplate = (offer) => (
  `<li class="event__offer">
  <span class="event__offer-title">${offer.title}</span>
  +€&nbsp;
  <span class="event__offer-price">${offer.price}</span>
  </li>`
);
const createSelectedOffersTemplate = (offers) => offers.map(createSelectedOfferTemplate).join(' ');
const handleFavoriteClass = (favoriteFlag) => favoriteFlag ? 'event__favorite-btn--active' : '';

const createEventsItemTemplate = ({isFavorite, destinationName, offers, type, basePrice, dateFrom, dateTo}) => (
  `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${formatDate(dateFrom)}">${humanizeDate(dateFrom)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destinationName}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${formatTime(dateFrom)}">${humanizeTime(dateFrom)}</time>
        —
        <time class="event__end-time" datetime="${formatTime(dateTo)}">${humanizeTime(dateTo)}</time>
      </p>
      <p class="event__duration">${showDuration(dateFrom, dateTo)}</p>
    </div>
    <p class="event__price">
      €&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${createSelectedOffersTemplate(offers)}
    </ul>
    <button class="event__favorite-btn ${handleFavoriteClass(isFavorite)}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`
);

export default class PointItemView extends AbstractView {
  #eventItem = {};
  #rollupButton = null;
  #onRollupButtonClick = null;

  constructor ({point, onRollupButtonClick}) {
    super();
    this.#eventItem = point;
    this.#rollupButton = this.element.querySelector('.event__rollup-btn');
    this.#onRollupButtonClick = onRollupButtonClick;

    this.#rollupButton.addEventListener('click', this.#rollupButtonClickHandler);

  }

  get template() {
    return createEventsItemTemplate(this.#eventItem);
  }

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();

    this.#onRollupButtonClick();
  };
}
