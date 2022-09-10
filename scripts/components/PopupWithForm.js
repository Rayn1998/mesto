import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submitForm}) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__inputs');
        this._formInputs = this._popup.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._formValues = {
            name: this._formInputs[0].value,
            link: this._formInputs[1].value,
        };
        return this._formValues;
    }

    setInputValuesForm(data) {
        this._formInputs[0].value = data.name;
        this._formInputs[1].value = data.about;
    }

    setInputValues(data) {
        this._formInputs[0].value = data.name;
        this._formInputs[1].value = data.link;
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