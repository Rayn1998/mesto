const formSelectors = {
    formEditProfile: '#edit-profile-form',
    formAddPlace: '#add-place-form',
    popupSaveBtn: 'popup__save-btn',
    popupBtnDisabled: 'popup__btn-disabled',
    popupInputInvalid: 'popup__input_invalid'
}

const handleFormInput = function (event) {
    const input = event.target;
    const form = event.currentTarget;
    const span = form.querySelector(`.${input.id}-error`);

    const isInputValid = input.validity.valid;
  
    if (isInputValid) {
        input.classList.remove(formSelectors.popupInputInvalid);
    } else {
        input.classList.add(formSelectors.popupInputInvalid);
    }
  
    span.textContent = input.validationMessage;
}

const handleFormValid = function (event) {
    const form = event.currentTarget;
    const button = form.querySelector(`.${formSelectors.popupSaveBtn}`);
    
    const isValid = form.checkValidity();

    if (isValid) {
        button.removeAttribute('disabled');
        button.classList.remove(formSelectors.popupBtnDisabled);
      } else {
        button.setAttribute('disabled', true);
        button.classList.add(formSelectors.popupBtnDisabled);
      }
}

const enableValidation = function (selectors) {
    const formAddPlace = document.querySelector(selectors.formAddPlace);
    const formEditProfile = document.querySelector(selectors.formEditProfile);

    formEditProfile.addEventListener('input', (e) => {
        handleFormInput(e);
        handleFormValid(e);
    })
    
    formAddPlace.addEventListener('input', (e) => {
        handleFormInput(e);
        handleFormValid(e);
    })
}

enableValidation(formSelectors);