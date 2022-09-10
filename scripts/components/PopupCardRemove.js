import Popup from './Popup.js';

export default class PopupCardRemove extends Popup {
    constructor(popupSelector, {handleSubmit}) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__inputs');
        this._handleSubmit = handleSubmit;
    }

    open(cardData, element) {
        this._cardData = cardData;
        this._element = element;
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleSubmit(this._cardData, this._element);
        })
    }
}