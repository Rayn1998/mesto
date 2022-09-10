import '../pages/index.css';

import Api from './components/Api.js';
import ApiUser from './components/ApiUser.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import { selectors } from './utils/selectors.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupAvatarForm from './components/PopupAvatarForm.js';
import PopupCardRemove from './components/PopupCardRemove.js';
import {
  profileEditBtn,
  profileAddBtn,
  profileAvatarBtn,
  profileSaveBtn
} from './utils/constants.js';
import UserInfo from './components/UserInfo.js';

const validSettings = {
  popupSaveBtn: selectors.popupSaveBtn,
  popupBtnDisabled: selectors.popupBtnDisabled,
  popupInputInvalid: selectors.popupInputInvalid
};

const userSelectors = {
  userSelector: selectors.profileName,
  userAboutSelector: selectors.profileProfession,
}

const optionsUser = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50/users/me',
  headers: {
    authorization: '7cf72c5a-6762-41bc-abd0-7773b56f9a95',
    'Content-Type': 'application/json'
  }
}

const optionsCards = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50/cards',
  headers: {
    authorization: '7cf72c5a-6762-41bc-abd0-7773b56f9a95',
    'Content-Type': 'application/json'
  }
}

const editProfileConfig = {
  button: document.querySelector('.popup_type_profile').querySelector(selectors.popupSaveBtn),
  textDef: 'Сохранить',
  text: 'Сохранение...'
}

const editAddPlaceConfig = {
  button: document.querySelector('.popup_type_card-add').querySelector(selectors.popupSaveBtn),
  textDef: 'Создать',
  text: 'Создание...'
}

const editAvatarConfig = {
  button: document.querySelector('.popup_type_profile-image').querySelector(selectors.popupSaveBtn),
  textDef: 'Сохранить',
  text: 'Сохранение...'
}

/*!!!!!!!!!!!!!!!! DEFINING THE FUNCTIONS !!!!!!!!!!!!!*/ 

// item - Объект с name, link
const createCard = function(item) {
  const card = new Card({data: item}, selectors.templateNewCard, { handleCardClick: () => {
    imagePopup.open(item);
  }},
  {handleLikeClick: (like, likes, cardObj) => {
    if (like.classList.contains('element__like_active')) {
      apiCards.likeDelete(like, likes, cardObj);
    } else {
      apiCards.like(like, likes, cardObj);
    }
  }},
  {handleCardRemove: (cardObj, element) => {
    popupCardRemove.open(cardObj, element);
  }});
  const cardElement = card.renderCard(apiUser);
  return cardElement;
} 

const renderLoading = function(isLoading, config) {
  if (isLoading) {
    config.button.textContent = config.text;
  } else {
    config.button.textContent = config.textDef;
  }
}

//---------------------------------------------------------

/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

const profileUserForm = new UserInfo(userSelectors);

const newCard = new Section(selectors.elements);

const apiUser = new ApiUser(optionsUser);
apiUser.getData({handler: data => {
  profileUserForm.setUserInfo({data});
}});

const apiCards = new Api(optionsCards);
apiCards.getData({handler: data => {
  newCard.renderItems({items: data, renderer: item => {
    newCard.addItem(createCard(item));
  }});
}})

const imagePopup = new PopupWithImage(selectors.popupImg);
imagePopup.setEventListeners();

const profileEditPopup = new PopupWithForm(selectors.popupEdit, {submitForm: (newValues) => {
  renderLoading(true, editProfileConfig);
  apiUser.sendData({newData: newValues, handler: data => {
    profileUserForm.setUserInfo({data});
    renderLoading(false, editProfileConfig);
    profileEditPopup.close();
  }});
  
}});
profileEditPopup.setEventListeners();

// newValues - объект с name, link. В res передается newValues
const popupNewPlace = new PopupWithForm(selectors.popupAddPlace, {submitForm: (newValues) => {
  renderLoading(true, editAddPlaceConfig);
  apiCards.newCard({cardData: newValues, handler: res => {
    newCard.addItem(createCard(res));
    renderLoading(false, editAddPlaceConfig);
  }});
  popupNewPlace.close();
}});
popupNewPlace.setEventListeners();

const popupCardRemove = new PopupCardRemove(selectors.popupCardRemove, {handleSubmit: (cardObj, element) => {
  apiCards.deleteCard({cardData: cardObj}, element);
  popupCardRemove.close();
}});
popupCardRemove.setEventListeners();

const popupEditAvatar = new PopupAvatarForm(selectors.popupEditAvatar, {submitForm: link => {
  renderLoading(true, editAvatarConfig);
  apiUser.editAvatar(link, {handler: data => {
    profileUserForm.setUserInfo({data});
    renderLoading(false, editAvatarConfig);
    popupEditAvatar.close();
  }});
}});
popupEditAvatar.setEventListeners();

//------------------------------------------------------------

/*!!!!!!!!!!!!! BUTTONS LISTENERS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

profileEditBtn.addEventListener('click', (e) => {
  formEditProfileValid.resetValidationErrors();
  formEditProfileValid.disableSubmitButton();
  const profileData = profileUserForm.getUserInfo();
  profileEditPopup.setInputValuesForm(profileData);
  profileEditPopup.open();
});

profileAddBtn.addEventListener('click', (e) => {
  formAddPlaceValid.resetValidationErrors();
  formAddPlaceValid.disableSubmitButton();
  popupNewPlace.open();
})

profileAvatarBtn.addEventListener('click', (e) => {
  formAvatarValid.resetValidationErrors();
  formAvatarValid.disableSubmitButton();
  popupEditAvatar.open();
})

// ----------------------------------------------------------

const formEditProfileValid = new FormValidator(validSettings, selectors.editProfileForm);

const formAddPlaceValid = new FormValidator(validSettings, selectors.addPlaceForm);

const formAvatarValid = new FormValidator(validSettings, selectors.avatarForm);

formAddPlaceValid.enableValidation();
formEditProfileValid.enableValidation();
formAvatarValid.enableValidation();