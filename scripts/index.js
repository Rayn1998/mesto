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

const popupInputName = document.querySelector(selectors.popupInputName);
const popupInputProf = document.querySelector(selectors.popupInputProf);
const popupInputTitle = document.querySelector(selectors.popupInputTitle);
const popupInputLink = document.querySelector(selectors.popupInputLink);
const popupCloseBtns = document.querySelectorAll(selectors.popupCloseBtn);

// FORMS
const formEditProfile = document.querySelector('#edit-profile-form');
const formAddPlace = document.querySelector('#add-place-form');

const elements = document.querySelector(selectors.elements);

// TEMPLATE
const template = document.querySelector('.template');

/*!!! INITIAL POPUP-EDIT STATE !!!*/

[popupInputName.value, popupInputProf.value] = [
  profileName.textContent,
  profileProfession.textContent,
];

/*!!! DEFINING THE FUNCTIONS !!!*/

const openPopup = function (popupType) {
  popupType.classList.add('popup_opened');
};

const openPopupImg = function (image) {
  // debugger;
  const attrSrc = image.getAttribute('src');
  const attrText = image.getAttribute('alt');
  popupText.textContent = attrText;
  popupPicture.src = attrSrc;
  openPopup(popupImg);
};

const closePopup = function (popupType) {
  popupType.classList.remove('popup_opened');
};

const createCard = function (title, link) {
  // debugger;
  const newTemplate = template.content;
  const article = newTemplate.querySelector('.element').cloneNode(true);
  const imageTitle = article.querySelector('.element__title');
  const imageLink = article.querySelector('.element__image');
  const cardTrash = article.querySelector('.element__trash');
  const like = article.querySelector('.element__like');
  imageLink.setAttribute('src', link);
  imageLink.setAttribute('alt', title);
  imageTitle.textContent = title;

  imageLink.addEventListener('click', (e) => {
    // e.preventDefault();
    const image = e.target;
    openPopupImg(image);
  });

  cardTrash.addEventListener('click', (e) => {
    // e.preventDefault();
    removeCard(e);
  });

  like.addEventListener('click', (e) => {
    // e.preventDefault();
    like.classList.toggle('element__like_active');
  });

  return article;
};

const renderCard = function (title, link) {
  // debugger;
  const card = createCard(title, link);
  elements.prepend(card);
};

const removeCard = function (event) {
  const element = event.target.closest('.element');
  // console.log(element);
  element.remove();
};

const submitFormEditProfile = function () {
  [profileName.textContent, profileProfession.textContent] = [
    popupInputName.value,
    popupInputProf.value,
  ];
  closePopup(popupEdit);
  [popupInputName.value, popupInputProf.value] = [
    profileName.textContent,
    profileProfession.textContent,
  ];
};

const submitFormAddPlace = function () {
  title = popupInputTitle.value;
  link = popupInputLink.value;
  renderCard(title, link);
  closePopup(popupAddPlace);
};

/*!!! INITIAL CARDS !!!*/

initialCards.forEach((item) => {
  title = item.name;
  link = item.link;
  renderCard(title, link);
});

/*!!! ADDING LISTENERS !!!*/

// FORM LISTENERS-------------------------------------

formEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  submitFormEditProfile();
});

formAddPlace.addEventListener('submit', (e) => {
  e.preventDefault();
  submitFormAddPlace();
});

//----------------------------------------------------

profileEditBtn.addEventListener('click', (e) => {
  // e.preventDefault();
  openPopup(popupEdit);
});

profileAddBtn.addEventListener('click', (e) => {
  e.preventDefault();
  openPopup(popupAddPlace);
});

for (let i = 0; i < popupCloseBtns.length; i++) {
  popupCloseBtns[i].addEventListener('click', (e) => {
    // debugger;
    // e.preventDefault();
    currentPopup = e.target.closest(selectors.popup);
    closePopup(currentPopup);
  });
}

/*!!! OLD CODE !!!*/

// console.log(popupEdit.classList.value);

/*
const profileEditButton = document.querySelector('.profile__edit-btn');
const profileAddButton = document.querySelector('.profile__add-button');
const popup = document.querySelectorAll('.popup');
const popupCloseButton = document.querySelectorAll('.popup__close-btn');
const popupSaveButton = document.querySelectorAll('.popup__save-btn');
const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupAddPlace = document.querySelector('.popup__add-place');
const popupForm = document.querySelectorAll('.popup__inputs');
const popupName = document.querySelectorAll('.popup__input_type_name');
const popupProfession = document.querySelectorAll(
  '.popup__input_type_profession'
);

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

console.log(popupAddPlace);

function popupOpen(popup_type) {
  popup_type.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;
}

function popupClose(popup_type) {
  const closest = popup_type.closest('.popup');
  console.log(closest);
  closest.classList.remove('popup_opened');
}

//profileEditButton.addEventListener('click', popupOpen(popupEditProfile));

profileAddButton.addEventListener('click', popupOpen(popupAddPlace));

popupCloseButton.addEventListener('click', popupClose(popupEditProfile));

function saveBtn(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileProfession.textContent = popupProfession.value;
  popupClose();
}

popupForm.addEventListener('submit', saveBtn);
*/
