let button = document.querySelector(".profile__edit-btn");
let buttonClose = document.querySelector(".popup__close-btn");
let saveButton = document.querySelector(".popup__save-btn");
let popup = document.querySelector(".popup");
let profileName = document.querySelector(".profile__name");
let profileProfession = document.querySelector(".profile__profession");
let popupName = document.querySelector(".popup__name");
let popupProfession = document.querySelector(".popup__profession");
let like = document.querySelectorAll(".element__like");

popupName.value = profileName.textContent;
popupProfession.value = profileProfession.textContent;

button.addEventListener("click", function () {
  popup.classList.remove("popup_hidden");
});

buttonClose.addEventListener("click", function () {
  popup.classList.add("popup_hidden");
});

popup.addEventListener("click", function (e) {
  if (e.target === e.currentTarget) {
    popup.classList.add("popup_hidden");
  }
});

let saveBtn = function () {
  profileName.innerText = popupName.value;
  profileProfession.innerText = popupProfession.value;
};

let saveEnter = function (e) {
  if (e.code === "Enter") {
    saveBtn();
  }
};

saveButton.addEventListener("click", saveBtn);
saveButton.addEventListener("keypress", saveEnter);

for (let i = 0; i < like.length; i++) {
  like[i].addEventListener("click", function () {
    like[i].style.backgroundImage = "url('../images/like_pressed.svg')";
  });
}
