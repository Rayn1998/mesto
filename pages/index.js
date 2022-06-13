let button = document.querySelector('.profile__edit-btn');
let buttonClose = document.querySelector('.popup__close-btn');
let saveButton = document.querySelector('.popup__save-btn');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__inputs');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let popupName = document.querySelector('.popup__input_type_name');
let popupProfession = document.querySelector('.popup__input_type_profession');

function popupOpen() {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;
}

function popupClose() {
  popup.classList.remove('popup_opened');
  // console.log('checked');
}

button.addEventListener('click', popupOpen);

buttonClose.addEventListener('click', popupClose);

function saveBtn(evt) {
  evt.preventDefault();
  // debugger;
  profileName.innerText = popupName.value;
  profileProfession.innerText = popupProfession.value;
  // console.log('SUBMIT!');
  popupClose();
}

popupForm.addEventListener('submit', saveBtn);
