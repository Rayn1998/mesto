import { popupImage, popupText, popupPicture,  } from '../utils/constants.js';
import { selectors } from '../utils/selectors.js';
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, title, link) {
        super(popupSelector);
        this._popupText = popupText;
        this._popupPic = popupPicture;
        this._title = title;
        this._link = link;
    }

    open() {
        super.setEventListeners();
        this._popupText.textContent = this._title;
        this._popupPic.setAttribute('src', this._link);
        super.open();
    }
}
