import { selectors } from "./selectors.js";

class FormValidator {
    constructor (data, form) {
        this._form = document.querySelector(`${form}`);
        this._popupSaveBtn = this._form.querySelector(data.popupSaveBtn);
        this._popupBtnDisabled = data.popupBtnDisabled;
        this._popupInputInvalid = data.popupInputInvalid;
        this._popupInput = this._form.querySelectorAll(selectors.popupInput);
        this._spanError = this._form.querySelectorAll(selectors.popupError);
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
            this.disableSubmitButton();
          }
    }

    _formListeners() {
        this._form.addEventListener('input', (e) => {
            this._handleFormInput(e);
            this._handleFormValid();
        })
    }

    disableSubmitButton() {
        this._popupSaveBtn.classList.add(`${this._popupBtnDisabled}`);
        this._popupSaveBtn.setAttribute('disabled', true);
    }

    resetValidationErrors() {
        this._popupInput.forEach( input => {
            input.classList.remove(this._popupInputInvalid);
        }); 
        this._spanError.forEach( span => {
            span.textContent = '';
        })        
    }

    enableValidation() {
        this._formListeners();
    }
}

export {FormValidator}