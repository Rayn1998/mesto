import Popup from './Popup.js';

export default class PopupCardRemove extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__inputs');
        this._button = this._popup.querySelector('.popup__save-btn');
    }

    setSubmitAction(func) {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            func();
        })
    }
}