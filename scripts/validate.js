const handleFormInput = function (event, selectors) {
    const input = event.target;
    const form = event.currentTarget;
    const span = form.querySelector(`.${input.id}-error`);

    const isInputValid = input.validity.valid;
  
    if (isInputValid) {
        input.classList.remove(selectors.popupInputInvalid);
    } else {
        input.classList.add(selectors.popupInputInvalid);
    }
  
    span.textContent = input.validationMessage;
}

const handleFormValid = function (event, selectors) {
    const form = event.currentTarget;
    const button = form.querySelector(`.${selectors.popupSaveBtn}`);
    
    const isValid = form.checkValidity();

    if (isValid) {
        button.removeAttribute('disabled');
        button.classList.remove(selectors.popupBtnDisabled);
      } else {
        button.setAttribute('disabled', true);
        button.classList.add(selectors.popupBtnDisabled);
      }
}

const formListeners = function (form, selectors) {
    form.addEventListener('input', (e) => {
        handleFormInput(e, selectors);
        handleFormValid(e, selectors);
    })
}

const enableValidation = function (selectors) {
    const formAddPlace = document.querySelector(selectors.formAddPlace);
    const formEditProfile = document.querySelector(selectors.formEditProfile);

    formListeners(formEditProfile, selectors);
    formListeners(formAddPlace, selectors);
}
