import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupText = this._popup.querySelector('.popup__text');
        this._popupPic = this._popup.querySelector('.popup__picture');
    }

    open(data) {
        this._name = data.avatar;
        this._link = data.link;
        this._popupText.textContent = this._name;
        this._popupPic.setAttribute('src', this._link);
        this._popupPic.setAttribute('alt', `Изображение ${ this._name}`);
        super.open();
    }
}
