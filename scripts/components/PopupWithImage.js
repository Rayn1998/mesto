import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupText = this._popup.querySelector('.popup__text');
        this._popupPic = this._popup.querySelector('.popup__picture');
    }

    open(title, link) {
        this._popupText.textContent = title;
        this._popupPic.setAttribute('src', link);
        this._popupPic.setAttribute('alt', `Изображение ${title}`);
        super.open();
    }
}
