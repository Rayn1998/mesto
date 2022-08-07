import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const selectors = {
  profileName: '.profile__name',
  profileProfession: '.profile__profession',
  profileEditBtn: '.profile__edit-btn',
  profileAddBtn: '.profile__add-btn',
  popup: '.popup',
  popupEdit: '.popup-edit-profile',
  popupAddPlace: '.popup-add-place',
  popupImg: '.popup-image',
  popupPicture: '.popup__picture',
  popupText: '.popup__text',
  popupInput: '.popup__input',
  popupInputName: '.popup__input_type_name',
  popupInputProf: '.popup__input_type_profession',
  popupInputTitle: '.popup__input_type_title',
  popupInputLink: '.popup__input_type_link',
  popupSaveBtn: '.popup__save-btn',
  popupCloseBtn: '.popup__close-btn',
  popupOpened: '.popup_opened',
  popupContentImg: '.popup__content-image',
  templateNewCard: '.template__new-card',
  elements: '.elements',
  elementImg: '.element__image',
  elementTitle: '.element__title',
  elementTrash: '.element__trash',
};

/*!!! CREATING VARIABLES !!!*/

const profileName = document.querySelector(selectors.profileName);
const profileProfession = document.querySelector(selectors.profileProfession);

const profileEditBtn = document.querySelector(selectors.profileEditBtn);
const profileAddBtn = document.querySelector(selectors.profileAddBtn);

//POPUP
const popups = document.querySelectorAll(selectors.popup);
const popupEdit = document.querySelector(selectors.popupEdit);
const popupAddPlace = document.querySelector(selectors.popupAddPlace);

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

const closePopupEsc = function (e) {
  if (e.key === escape){
      popups.forEach((popup) => {
        popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', closePopupEsc);
      }) 
  }
}

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

const closePopup = function (popup) {
  popupSaveBtns.forEach((btn) => {
    if (popup.classList.contains(selectors.popupEdit)) {
      btn.classList.remove('popup__btn-disabled');
      btn.removeAttribute('disabled');
    }  
  })
  popupInputs.forEach((input) => {
    input.classList.remove('popup__input_invalid');
    const span = input.nextElementSibling;
    span.textContent = '';
  })
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

const submitFormEditProfile = function (e) {
  e.preventDefault();

  profileName.textContent = popupInputName.value;
  profileProfession.textContent = popupInputProf.value;

  closePopup(popupEdit);
};

const submitFormAddPlace = function (e) {
  e.preventDefault();
  const button = e.currentTarget.querySelector(selectors.popupSaveBtn);
  button.classList.add('popup__btn-disabled');
  button.setAttribute('disabled', true);
  const title = popupInputTitle.value;
  const link = popupInputLink.value;
  const card = new Card(title, link, '.template');
  card.renderCard();
  closePopup(popupAddPlace);
  formAddPlace.reset();
};

//-------------------------------------------------------------------

/*!!!!!!!!!!!!!!!!!!!!!!!!!! INITIAL CARDS !!!!!!!!!!!!!!!!!!!!!!!!!!!*/

initialCards.forEach((item) => {
  const title = item.name;
  const link = item.link;
  const card = new Card(title, link, '.template');
  card.renderCard();
});

/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ADDING LISTENERS !!!!!!!!!!!!!!!!!!!!!!!!*/

// FORM LISTENERS-------------------------------------

formEditProfile.addEventListener('submit', (e) => {submitFormEditProfile(e)});

formAddPlace.addEventListener('submit', (e) => {submitFormAddPlace(e)});

//-----------------------------------------------------

profileEditBtn.addEventListener('click', (e) => {
  openPopup(popupEdit);
  [popupInputName.value, popupInputProf.value] = [
    profileName.textContent,
    profileProfession.textContent,
  ];
});

profileAddBtn.addEventListener('click', (e) => {
  e.preventDefault();
  openPopup(popupAddPlace);
});

popupCloseBtns.forEach(button => {
  button.addEventListener('click', (e) => { 
    const currentPopup = e.target.closest(selectors.popup); 
    closePopup(currentPopup);
  }); 
});

// CLOSING POPUP BY CLICKING OUT OF CONTAINER
popups.forEach( popup => {
  popup.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
});

const formEditProfileValid = new FormValidator({
  popupSaveBtn: 'popup__save-btn',
  popupBtnDisabled: 'popup__btn-disabled',
  popupInputInvalid: 'popup__input_invalid'
}, '#edit-profile-form');

const formAddPlaceValid = new FormValidator({
  popupSaveBtn: 'popup__save-btn',
  popupBtnDisabled: 'popup__btn-disabled',
  popupInputInvalid: 'popup__input_invalid'
}, '#add-place-form');

formAddPlaceValid.enableValidation();
formEditProfileValid.enableValidation();
