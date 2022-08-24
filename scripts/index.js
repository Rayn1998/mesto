import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './initialCards.js';
import {selectors} from './selectors.js';

/*!!! CREATING VARIABLES !!!*/

const profileName = document.querySelector(selectors.profileName);
const profileProfession = document.querySelector(selectors.profileProfession);

const profileEditBtn = document.querySelector(selectors.profileEditBtn);
const profileAddBtn = document.querySelector(selectors.profileAddBtn);

const validSettings = {
  popupSaveBtn: selectors.popupSaveBtn,
  popupBtnDisabled: selectors.popupBtnDisabled,
  popupInputInvalid: selectors.popupInputInvalid
};

//POPUP
const popups = document.querySelectorAll(selectors.popup);
const popupEdit = document.querySelector(selectors.popupEdit);
const popupAddPlace = document.querySelector(selectors.popupAddPlace);

const popupImage = document.querySelector(selectors.popupImg);
const popupText = popupImage.querySelector(selectors.popupText);
const popupPicture = popupImage.querySelector(selectors.popupPicture);
const elements = document.querySelector(selectors.elements);

const popupInputs = document.querySelectorAll(selectors.popupInput);
const popupInputName = document.querySelector(selectors.popupInputName);
const popupInputProf = document.querySelector(selectors.popupInputProf);
const popupInputTitle = document.querySelector(selectors.popupInputTitle);
const popupInputLink = document.querySelector(selectors.popupInputLink);
const popupSaveBtns = document.querySelectorAll(selectors.popupSaveBtn);
const popupCloseBtns = document.querySelectorAll(selectors.popupCloseBtn);

const escape = 'Escape';

// FORMS
const formEditProfile = document.querySelector('#edit-profile-form');
const formAddPlace = document.querySelector('#add-place-form');

/*!!!!!!!!!!!!!!!! DEFINING THE FUNCTIONS !!!!!!!!!!!!!*/

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
  formAddPlaceValid.resetValidationErrors();
  formEditProfileValid.resetValidationErrors();
};

const closePopupEsc = function (e) {
  if (e.key === escape) {
      const popup = document.querySelector('.popup_opened');
      closePopup(popup);
  }
}

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

const submitFormEditProfile = function (e) {
  e.preventDefault();

  profileName.textContent = popupInputName.value;
  profileProfession.textContent = popupInputProf.value;

  closePopup(popupEdit);
  formEditProfileValid.disableSubmitButton();
};

const createCard = function (title, link) {
  const card = new Card(title, link, '.template');
  elements.prepend(card.renderCard());
}

const submitFormAddPlace = function (e) {
  e.preventDefault();
  const title = popupInputTitle.value;
  const link = popupInputLink.value;
  createCard(title, link);
  closePopup(popupAddPlace);
  formAddPlaceValid.disableSubmitButton();
  formAddPlace.reset();

};

//-------------------------------------------------------------------

/*!!!!!!!!!!!!!!!!!!!!!!!!!! INITIAL CARDS !!!!!!!!!!!!!!!!!!!!!!!!!!!*/

initialCards.forEach((item) => {
  const title = item.name;
  const link = item.link;
  createCard(title, link);
});

/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ADDING LISTENERS !!!!!!!!!!!!!!!!!!!!!!!!*/

// FORM LISTENERS-------------------------------------

formEditProfile.addEventListener('submit', (e) => {submitFormEditProfile(e)});

formAddPlace.addEventListener('submit', (e) => {submitFormAddPlace(e)});

//-----------------------------------------------------

profileEditBtn.addEventListener('click', (e) => {
  openPopup(popupEdit);
  formEditProfileValid.disableSubmitButton();
  [popupInputName.value, popupInputProf.value] = [
    profileName.textContent,
    profileProfession.textContent,
  ];
});

profileAddBtn.addEventListener('click', (e) => {
  e.preventDefault();
  openPopup(popupAddPlace);
  formAddPlaceValid.disableSubmitButton();
});

// CLOSING POPUP BY CLICKING OUT OF CONTAINER
popups.forEach( popup => {
  popup.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('popup__body') || e.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }
  });
});

const formEditProfileValid = new FormValidator(validSettings, '#edit-profile-form');

const formAddPlaceValid = new FormValidator(validSettings, '#add-place-form');

formAddPlaceValid.enableValidation();
formEditProfileValid.enableValidation();

export {popupImage, popupText, popupPicture, openPopup, closePopup, closePopupEsc};