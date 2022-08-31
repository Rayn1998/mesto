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
  elements,
  popupInputName,
  popupInputProf,
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

const imagePopup = function(title, link) {
  const imgPopup = new PopupWithImage(selectors.popupImg, title, link);
  imgPopup.open();
}

//-------------------------------------------------------------------

/*!!!!!!!!!!!!!!!!!!!!!!!!!! INITIAL CARDS !!!!!!!!!!!!!!!!!!!!!!!!!!!*/

const defaultCards = new Section({items: initialCards, renderer: item => {
  const { name: title, link } = item;
  const card = new Card(title, link, selectors.templateNewCard, { handleCardClick: () => {
    imagePopup(title, link);
  }});
  elements.prepend(card.renderCard());
}}, selectors.elements);
defaultCards.renderItems();

/*!!!!!!!!!!!!!!!!!!!! OBJECTS !!!!!!!!!!!!!!!!!!*/

const profileUserForm = new UserInfo(userSelectors);

const profileEditPopup = new PopupWithForm(selectors.popupEdit, {submitForm: () => {
  const newValues = profileEditPopup.getInputValues();
  profileUserForm.setUserInfo({data: newValues});
  profileEditPopup.close();
}});
profileEditPopup.setEventListeners();

const popupNewPlace = new PopupWithForm(selectors.popupAddPlace, {submitForm: () => {
  const values = popupNewPlace.getInputValues();
  const valuesArr = Object.values(values);
  const newCard = new Card (valuesArr[0], valuesArr[1], selectors.templateNewCard, { handleCardClick: () => {
    imagePopup(valuesArr[0], valuesArr[1]);
  }});
  elements.prepend(newCard.renderCard());
  popupNewPlace.close();
}});
popupNewPlace.setEventListeners();

/*!!!!!!!!!!!!! BUTTONS LISTENERS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

profileEditBtn.addEventListener('click', (e) => {
  formEditProfileValid.resetValidationErrors();
  formEditProfileValid.disableSubmitButton();
  const profileData = profileUserForm.getUserInfo();
  popupInputName.value = Object.values(profileData)[0];
  popupInputProf.value = Object.values(profileData)[1];
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