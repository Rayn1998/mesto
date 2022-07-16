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
  popupEdit: '.popup__edit-profile',
  popupAddPlace: '.popup__add-place',
  popupImg: '.popup__image',
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
  template: '.template',
  templateNewCard: '.template__new-card',
  element: '.element',
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

const popupSaveBtns = document.querySelectorAll(selectors.popupSaveBtn);
const popupCloseBtns = document.querySelectorAll(selectors.popupCloseBtn);

const template = document.querySelector(selectors.template);
const elements = document.querySelector(selectors.elements);

/*!!! DEFINING THE FUNCTIONS !!!*/

const imgPopupOpen = function (image) {
  // debugger;
  const attrSrc = image.getAttribute('src');
  const attrText = image.getAttribute('alt');
  popupText.textContent = attrText;
  popupPicture.src = attrSrc;
  popupImg.classList.add(selectors.popupOpened.replace('.', ''));
};

const popupOpen = function (popupType) {
  // debugger;
  const classes = popupType.classList;
  if (!classes.contains(selectors.popupOpened)) {
    classes.add(selectors.popupOpened.replace('.', ''));
  }
};

const popupClose = function (popupType) {
  // debugger;
  const classes = popupType.classList;
  if (classes.contains(selectors.popupOpened.replace('.', ''))) {
    classes.remove(selectors.popupOpened.replace('.', ''));
  }
};

const saveChanges = function (popupType) {
  // debugger;
  const classes = Array.from(popupType.classList);
  // console.log(classes);

  if (
    classes.some((element) => element === selectors.popupEdit.replace('.', ''))
  ) {
    profileName.textContent = popupInputName.value;
    profileProfession.textContent = popupInputProf.value;
    popupClose(popupEdit);
    popupInputName.setAttribute('placeholder', popupInputName.value);
    popupInputProf.setAttribute('placeholder', popupInputProf.value);
    popupInputName.value = '';
    popupInputProf.value = '';
  }

  if (
    classes.some(
      (element) => element === selectors.popupAddPlace.replace('.', '')
    )
  ) {
    title = popupInputTitle.value;
    link = popupInputLink.value;
    popupClose(popupAddPlace);
    createCard(title, link);
    popupInputTitle.setAttribute('placeholder', 'Москва');
    popupInputLink.setAttribute('placeholder', 'Ссылка на картинку');
    popupInputTitle.value = '';
    popupInputLink.value = '';
  }
};

const removeCard = function (event) {
  const element = event.target.closest('.element');
  console.log(element);
  element.remove();
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
    e.preventDefault();
    const image = e.target;
    imgPopupOpen(image);
  });

  cardTrash.addEventListener('click', (e) => {
    e.preventDefault();
    removeCard(e);
  });

  like.addEventListener('click', (e) => {
    // debugger;
    e.preventDefault();
    if (!like.classList.contains('element__like_active')) {
      like.classList.add('element__like_active');
    } else {
      like.classList.remove('element__like_active');
    }
  });

  elements.prepend(article);
};

/*!!! INITIAL CARDS !!!*/

createCard(initialCards[0].name, initialCards[0].link);
createCard(initialCards[1].name, initialCards[1].link);
createCard(initialCards[2].name, initialCards[2].link);
createCard(initialCards[3].name, initialCards[3].link);
createCard(initialCards[4].name, initialCards[4].link);
createCard(initialCards[5].name, initialCards[5].link);

/*!!! ADDING LISTENERS !!!*/

// IMAGE LISTENERS-------------------------------------
const elementImg = document.querySelectorAll(selectors.elementImg);

for (let i = 0; i < elementImg.length; i++) {
  elementImg[i].addEventListener('click', (e) => {
    e.preventDefault();
    const image = e.target;
    imgPopupOpen(image);
  });
}
//----------------------------------------------------

profileEditBtn.addEventListener('click', (e) => {
  e.preventDefault();
  popupOpen(popupEdit);
});

profileAddBtn.addEventListener('click', (e) => {
  e.preventDefault();
  popupOpen(popupAddPlace);
});

for (let i = 0; i < popupCloseBtns.length; i++) {
  popupCloseBtns[i].addEventListener('click', (e) => {
    // debugger;
    e.preventDefault();
    currentPopup = e.target.closest(selectors.popup);
    popupClose(currentPopup);
  });
}

for (let i = 0; i < popupSaveBtns.length; i++) {
  popupSaveBtns[i].addEventListener('click', (e) => {
    // debugger;
    e.preventDefault();
    currentPopup = e.target.closest(selectors.popup);
    saveChanges(currentPopup);
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
