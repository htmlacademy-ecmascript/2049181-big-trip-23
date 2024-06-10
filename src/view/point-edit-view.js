import { EVENT_TYPES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeEditFormDate } from '../util.js';

const createEventTypeItemTemplate = (type, eventItemType) => {
  const lowerCaseType = type.toLowerCase();
  const handleCheckedFlag = () => eventItemType === lowerCaseType ? 'checked' : '';

  return (
    `<div class="event__type-item">
       <input id="event-type-${lowerCaseType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowerCaseType}" ${handleCheckedFlag()}>
       <label class="event__type-label  event__type-label--${lowerCaseType}" for="event-type-${lowerCaseType}-1">${type}</label>
     </div>`
  );
};

const createDestinationList = (destinations) => {
  const createDestinationOption = (destination) => (`<option value="${destination.name}"></option>`);

  return (
    `<datalist id="destination-list-1">
      ${destinations.map(createDestinationOption)}
    </datalist>`
  );
};

const handleOfferCheckedFlag = (offer, selectedOffers) => selectedOffers.includes(offer) ? 'checked' : '';

const createOfferTemplate = (offer, selectedOffers) => {
  const offerShortName = offer.title.split(' ').pop();

  return (
    `<div class="event__available-offers">
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerShortName}-1" type="checkbox" name="event-offer-${offerShortName}" ${handleOfferCheckedFlag(offer, selectedOffers)}>
    <label class="event__offer-label" for="event-offer-${offerShortName}-1">
      <span class="event__offer-title">${offer.title}</span>
      +€&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`
  );
};

const createOffersListTemplate = (allOffers, selectedOffers) => (
  allOffers.length > 0 ? `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    ${allOffers.map((offer) => createOfferTemplate(offer, selectedOffers)).join(' ')}
  </section>`
    : ''
);

const createDestinationPhotosTemplate = (destinationPhotos) =>
  destinationPhotos.length > 0 ? (
    `<div class="event__photos-container">
       <div class="event__photos-tape">
         ${destinationPhotos.map((photo) => (`<img class="event__photo" src="${photo.src}" alt="${photo.description}"></img>`)).join(' ')}
       </div>
     </div>`
  ) : '';

const createDestinationInfoTemplate = (destinationsList, thisDestinationId) => {
  const destination = destinationsList.find((element) => element.id === thisDestinationId);

  return destination.description && destination.description.length > 0 ? (
    `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>
    ${createDestinationPhotosTemplate(destination.pictures)}
  </section>`
  ) : '';
};

const createEventsItemEditTemplate = ({
  type,
  destinationName,
  destinations,
  dateFrom,
  dateTo,
  basePrice,
  destination,
  allOffersByType,
  offers
}) => (
  `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${EVENT_TYPES.map((element) => createEventTypeItemTemplate(element, type)).join(' ')}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
        ${createDestinationList(destinations)}
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeEditFormDate(dateFrom)}">
        —
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeEditFormDate(dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          €
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${createOffersListTemplate(allOffersByType, offers)}
      ${createDestinationInfoTemplate(destinations, destination)}
    </section>
  </form>
</li>`
);

export default class PointEditView extends AbstractStatefulView {
  #onSaveButtonClick = null;
  #offers = null;
  #destinations = null;
  #getOffersByType = null;
  #getDestinationName = null;
  #onDataChange = null;

  constructor({point, onSaveButtonClick, destinations, getOffersByType, getDestinationName, onDataChange}) {
    super();
    this._state = point;
    this.#onSaveButtonClick = onSaveButtonClick;
    this.#destinations = destinations;
    this.#getOffersByType = getOffersByType;
    this.#getDestinationName = getDestinationName;
    this.#onDataChange = onDataChange;

    this._restoreHandlers();
  }

  get template() {
    return createEventsItemEditTemplate({
      ...this._state,
      destinations: this.#destinations,
      allOffers: this.#offers,
      allOffersByType: this.#getOffersByType(this._state.type),
      destinationName: this.#getDestinationName(this._state.destination, this.#destinations)
    });
  }

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this.#onSaveButtonClick();
  };

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      allOffers: this.#getOffersByType(evt.target.value),
      type: evt.target.value
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    if (this.#destinations.find((item) => item.name === evt.target.value)) {
      this.updateElement({
        destination: this.#destinations.find((item) => item.name === evt.target.value).id
      });
    }
  };

  _restoreHandlers() {
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__save-btn')
      .addEventListener('click', this.#saveButtonClickHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#buttonClickHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
  }

  #saveButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#onSaveButtonClick();
    this.#onDataChange(this._state);
  };
}
