import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupText = this._popup.querySelector('.popup__text');
        this._popupPic = this._popup.querySelector('.popup__picture');
    }

    open(data) {
        this._popupText.textContent = data.name;
        this._popupPic.setAttribute('src', data.link);
        this._popupPic.setAttribute('alt', `Изображение ${ data.name}`);
        super.open();
    }
}
