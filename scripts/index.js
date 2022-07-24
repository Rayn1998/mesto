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
const popupImg = document.querySelector(selectors.popupImg);
const popupPicture = document.querySelector(selectors.popupPicture);
const popupContentImg = document.querySelector(selectors.popupContentImg);
const popupText = document.querySelector(selectors.popupText);

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

const elements = document.querySelector(selectors.elements);

// TEMPLATE
const template = document.querySelector('.template');

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

const openPopupImg = function (title, link) {
  popupText.textContent = title;
  popupPicture.src = link;
  popupPicture.alt = title;
  openPopup(popupImg);
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

const createCard = function (title, link) {
  const newTemplate = template.content;
  const newCard = newTemplate.querySelector('.element').cloneNode(true);
  const imageTitle = newCard.querySelector('.element__title');
  const imageLink = newCard.querySelector('.element__image');
  const cardTrash = newCard.querySelector('.element__trash');
  const like = newCard.querySelector('.element__like');
  imageLink.setAttribute('src', link);
  imageLink.setAttribute('alt', title);
  imageTitle.textContent = title;

  imageLink.addEventListener('click', (e) => {
    openPopupImg(title, link);
  });

  cardTrash.addEventListener('click', (e) => {
    removeCard(newCard);
  });

  like.addEventListener('click', (e) => {
    like.classList.toggle('element__like_active');
  });

  return newCard;
};

const renderCard = function (title, link) {
  const card = createCard(title, link);
  elements.prepend(card);
};

const removeCard = function (card) {
  card.remove();
};

const submitFormEditProfile = function (e) {
  e.preventDefault();

  profileName.textContent = popupInputName.value;
  profileProfession.textContent = popupInputProf.value;

  closePopup(popupEdit);
};

const submitFormAddPlace = function (e) {
  e.preventDefault();
  button = e.currentTarget.querySelector(selectors.popupSaveBtn);
  button.classList.add('popup__btn-disabled');
  button.setAttribute('disabled', true);
  title = popupInputTitle.value;
  link = popupInputLink.value;
  renderCard(title, link);
  closePopup(popupAddPlace);
  formAddPlace.reset();
};


//-------------------------------------------------------------------

/*!!!!!!!!!!!!!!!!!!!!!!!!!! INITIAL CARDS !!!!!!!!!!!!!!!!!!!!!!!!!!!*/

initialCards.forEach((item) => {
  title = item.name;
  link = item.link;
  renderCard(title, link);
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
    currentPopup = e.target.closest(selectors.popup); 
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

enableValidation({
  formEditProfile: '#edit-profile-form',
  formAddPlace: '#add-place-form',
  popupSaveBtn: 'popup__save-btn',
  popupBtnDisabled: 'popup__btn-disabled',
  popupInputInvalid: 'popup__input_invalid'
});
