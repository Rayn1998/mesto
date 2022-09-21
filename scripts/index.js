// Есть проблема удаления карточек. При удалении первой - всё ок, при удалении последующих,  информация
// Поправить классы PopupWithForm, Section.
// index.j вроде поправлен)

import '../pages/index.css';

import Api from './components/Api.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import { selectors } from './utils/selectors.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupCardRemove from './components/PopupCardRemove.js';
import {
  profileEditBtn,
  profileAddBtn,
  profileAvatarBtn,
} from './utils/constants.js';
import UserInfo from './components/UserInfo.js';

// OPTIONS FOR API REQUESTS-----------------------------------------------------------
const validSettings = {
  popupSaveBtn: selectors.popupSaveBtn,
  popupBtnDisabled: selectors.popupBtnDisabled,
  popupInputInvalid: selectors.popupInputInvalid
};

const userSelectors = {
  userSelector: selectors.profileName,
  userAboutSelector: selectors.profileProfession,
  userAvatarSelector: selectors.profileAvatar
}

const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  cohort: 'cohort-50',
  headers: {
    authorization: '7cf72c5a-6762-41bc-abd0-7773b56f9a95',
    'Content-Type': 'application/json'
  }
}

const editProfileConfig = {
  textDef: 'Сохранить',
  text: 'Сохранение...'
}

const editAddPlaceConfig = {
  textDef: 'Создать',
  text: 'Создание...'
}

const editAvatarConfig = {
  textDef: 'Сохранить',
  text: 'Сохранение...'
}

const deleteCardConfig = {
  textDef: 'Да',
  text: 'Удаляю...'
}
//---------------------------------------------------------------------------------------------------

let userId = null;

/*!!!!!!!!!!!!!!!! DEFINING THE FUNCTIONS !!!!!!!!!!!!!*/ 

// CREATING A CARD FUNCTION
const createCard = function(cardData, userId) {
  const card = new Card({
    data: {...cardData, currentUser: userId}, 

    handleCardClick: () => {
      imagePopup.open(cardData);
    },

    handleLikeClick: () => {
      if (!card.getLikeStatus()) {
        api.like(card.getCardId())
          .then(res => {
              card.changeLikeStatus(true);
              card.cardLikeStatus(res);
          }).catch(err => console.log(`Ошибка постановки лайка: ${err.status}`));
      } else {
        api.deleteLike(cardData)
          .then(res => {
            card.changeLikeStatus(false);
            card.cardLikeStatus(res);
          }).catch(err => console.log(`Ошибка снятия лайка: ${err.status}`));
      }
    },

    handleCardRemove: () => {
      popupCardRemove.open();
      popupCardRemove.setSubmitAction(() => {
        popupCardRemove.renderLoading(deleteCardConfig.text);        
        api.deleteCard(card.getCardId())
          .then(() => {
            card.removeCard();
            popupCardRemove.close();
          }).catch(err => console.error(`Ошибка удаления карточки ${err.status}`))
            .finally(() => {
              popupCardRemove.renderLoading(deleteCardConfig.textDef);  
            })
      })
    }
  });
  const cardElement = card.renderCard();
  return cardElement;
} 

//---------------------------------------------------------

/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

const section = new Section(selectors.elements, {renderer: card => {
  section.addItem(createCard(card, userId));
}});

const profileUserForm = new UserInfo(userSelectors);

const api = new Api(apiOptions);

// USER DATA PROMISE
const userDataPromise = api.getUserData()

// INITIAL CARDS PROMISE
const cardDataPromise = api.getCardsData()

// MERGING PROMISES
Promise.all([userDataPromise, cardDataPromise])
 .then(res => {
  const userData = res[0];
  const cardData = res[1];
  userId = userData._id;
  // SETTING THE USER DATA
  profileUserForm.setUserInfo(userData);
  // RENDERING THE INITIAL CARDS
  section.renderItems({items: cardData});
 })
.catch(err => console.log(err));

// POPUPS

const imagePopup = new PopupWithImage(selectors.popupImg);
imagePopup.setEventListeners();

const popupNewPlace = new PopupWithForm(selectors.popupAddPlace, {submitForm: newCardData => {
  popupNewPlace.renderLoading(editAddPlaceConfig.text);
  api.newCard(newCardData)
    .then(res => {
      section.addItem(createCard(res, userId));
      popupNewPlace.close();
      popupNewPlace.renderLoading(editAddPlaceConfig.textDef);
    }).catch(err => console.error(`Ошибка добавления новой карточки: ${err.status}`))
      .finally(() => {
        popupCardRemove.renderLoading(deleteCardConfig.textDef)
      })
}});
popupNewPlace.setEventListeners();

const profileEditPopup = new PopupWithForm(selectors.popupEdit, {submitForm: newValues => {
  profileEditPopup.renderLoading(editProfileConfig.text);
  api.sendData(newValues)
    .then(res => {
      profileUserForm.setUserInfo(res);
      profileEditPopup.close();
    }).catch(err => console.error(`Ошибка изменения данных пользователя: ${err.status}`))
      .finally(() => {
        profileEditPopup.renderLoading(editProfileConfig.textDef);
      })
}});
profileEditPopup.setEventListeners();

const popupCardRemove = new PopupCardRemove(selectors.popupCardRemove);
popupCardRemove.setEventListeners();

const popupEditAvatar = new PopupWithForm(selectors.popupEditAvatar, {submitForm: link => {
  popupEditAvatar.renderLoading(editAvatarConfig.text);
  api.editAvatar(link)
    .then(res => {
      profileUserForm.setUserInfo(res);
      popupEditAvatar.close();
    })
      .catch(err => console.error(`Ошибка изменения аватара: ${err.status}`))
      .finally(() => {
        popupEditAvatar.renderLoading(editAvatarConfig.textDef);
      })
}});
popupEditAvatar.setEventListeners();

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