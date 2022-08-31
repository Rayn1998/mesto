import { selectors } from '../utils/selectors.js';
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submitForm}) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector(selectors.popupInputs);
        this._formInputs = this._popup.querySelectorAll(selectors.popupInput);
    }

    getInputValues() {
        this._formValues = {};
        this._formInputs.forEach( input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._submitForm.bind(this);
            this._submitForm();
        })
    }
    
    open() {
        super.open();
    }

    close() {
        super.close();
        this._form.reset();
    }
}