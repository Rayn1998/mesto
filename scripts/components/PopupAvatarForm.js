import Popup from './Popup.js';

export default class PopupAvatarForm extends Popup {
    constructor(popupSelector, {submitForm}) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__inputs');
        this._formInputs = this._popup.querySelectorAll('.popup__input');
        this._submitForm = submitForm;
    }

    _getInputValues() {
        this._avatar = this._formInputs[0].value
        return this._avatar;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._submitForm.bind(this)(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}