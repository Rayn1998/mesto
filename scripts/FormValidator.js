import { selectors } from "./selectors.js";

class FormValidator {
    constructor (form) {
        this._form = document.querySelector(`${form}`);
        this._popupSaveBtn = this._form.querySelector(`${selectors.popupSaveBtn}`);
        this._popupBtnDisabled = selectors.popupBtnDisabled;
        this._popupInputInvalid = selectors.popupInputInvalid;
        this._popupInput = this._form.querySelector(selectors.popupInput);
        this._spanError = this._form.querySelector(selectors.popupError);
    }

    _handleFormInput(event) {
        const input = event.target;
        const span = this._form.querySelector(`.${input.id}-error`);
    
        const isInputValid = input.validity.valid;
      
        if (isInputValid) {
            input.classList.remove(`${this._popupInputInvalid}`);
        } else {
            input.classList.add(`${this._popupInputInvalid}`);
        }
      
        span.textContent = input.validationMessage;
    }   
    
    _handleFormValid() {
        const isValid = this._form.checkValidity();
    
        if (isValid) {
            this._popupSaveBtn.removeAttribute('disabled');
            this._popupSaveBtn.classList.remove(`${this._popupBtnDisabled}`);
          } else {
            this._popupSaveBtn.setAttribute('disabled', true);
            this._popupSaveBtn.classList.add(`${this._popupBtnDisabled}`);
          }
    }

    _formListeners() {
        this._form.addEventListener('input', (e) => {
            this._handleFormInput(e);
            this._handleFormValid();
        })
    }

    // disableSubmitButton() {
    //     if (popup.classList.contains(selectors.popupEdit)) {
    //         this._popupSaveBtn.classList.remove('popup__btn-disabled');
    //         this._popupSaveBtn.removeAttribute('disabled');
    //       }  
    // }

    resetValidationErrors() {
        this._popupInput.classList.remove('popup__input_invalid');
        this._spanError.textContent = '';
    }

    enableValidation() {
        this._formListeners();
    }
}

export {FormValidator}