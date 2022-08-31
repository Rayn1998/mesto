import { selectors } from './selectors.js';

export const profileName = document.querySelector(selectors.profileName);
export const profileProfession = document.querySelector(selectors.profileProfession);

export const profileEditBtn = document.querySelector(selectors.profileEditBtn);
export const profileAddBtn = document.querySelector(selectors.profileAddBtn);

export const popups = document.querySelectorAll(selectors.popup);
export const popupEdit = document.querySelector(selectors.popupEdit);
export const popupAddPlace = document.querySelector(selectors.popupAddPlace);

export const popupImage = document.querySelector(selectors.popupImg);
export const popupText = popupImage.querySelector(selectors.popupText);
export const popupPicture = popupImage.querySelector(selectors.popupPicture);
export const elements = document.querySelector(selectors.elements);

export const popupInputName = document.querySelector(selectors.popupInputName);
export const popupInputProf = document.querySelector(selectors.popupInputProf);
export const popupInputTitle = document.querySelector(selectors.popupInputTitle);
export const popupInputLink = document.querySelector(selectors.popupInputLink);

export const formEditProfile = document.querySelector('#edit-profile-form');
export const formAddPlace = document.querySelector('#add-place-form');

export const escape = 'Escape';
