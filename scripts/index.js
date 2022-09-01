import '../pages/index.css';

import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import { initialCards } from './utils/initialCards.js';
import { selectors } from './utils/selectors.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import {
  profileEditBtn,
  profileAddBtn,
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

/*!!!!!!!!!!!!!!!! DEFINING THE FUNCTIONS !!!!!!!!!!!!!*/ 

const createCard = function(item) {
  const title = Object.values(item)[0];
  const link = Object.values(item)[1];
  const card = new Card(title, link, selectors.templateNewCard, { handleCardClick: () => {
    imagePopup.open(title, link);
  }});
  const cardElement = card.renderCard();
  return cardElement;
} 

//---------------------------------------------------------

/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

const profileUserForm = new UserInfo(userSelectors);

const imagePopup = new PopupWithImage(selectors.popupImg);
imagePopup.setEventListeners();

const defaultCards = new Section({items: initialCards, renderer: item => {
  defaultCards.addItem(createCard(item));
}}, selectors.elements);
defaultCards.renderItems();

const profileEditPopup = new PopupWithForm(selectors.popupEdit, {submitForm: (newValues) => {
  profileUserForm.setUserInfo({data: newValues});
  profileEditPopup.close();
}});
profileEditPopup.setEventListeners();

const popupNewPlace = new PopupWithForm(selectors.popupAddPlace, {submitForm: (newValues) => {
  defaultCards.addItem(createCard(newValues));
  popupNewPlace.close();
}});
popupNewPlace.setEventListeners();

//------------------------------------------------------------

/*!!!!!!!!!!!!! BUTTONS LISTENERS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

profileEditBtn.addEventListener('click', (e) => {
  formEditProfileValid.resetValidationErrors();
  formEditProfileValid.disableSubmitButton();
  const profileData = profileUserForm.getUserInfo();
  profileEditPopup.setInputValues(profileData);
  profileEditPopup.open();
});

profileAddBtn.addEventListener('click', (e) => {
  formAddPlaceValid.resetValidationErrors();
  formAddPlaceValid.disableSubmitButton();
  popupNewPlace.open();
})

// ----------------------------------------------------------

const formEditProfileValid = new FormValidator(validSettings, selectors.editProfileForm);

const formAddPlaceValid = new FormValidator(validSettings, selectors.addPlaceForm);

formAddPlaceValid.enableValidation();
formEditProfileValid.enableValidation();