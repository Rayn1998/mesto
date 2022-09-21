import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submitForm}) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__inputs');
        this._formInputs = this._popup.querySelectorAll('.popup__input');
    }

    // Должен быть универсальным
    _getInputValues() {
        this._formValues = {};
        this._formInputs.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }
    
    // Должен быть универсальным
    setInputValues(data) { 
        this._formInputs.forEach(input => {
            input.value = data[input.name];
        });
    } 

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._submitForm(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}