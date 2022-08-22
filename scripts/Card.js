import { popupText, popupImage, popupPicture, openPopup, elements } from './index.js';

class Card {
    constructor (text, link, templateSelector) {
        this._text = text;
        this._link = link;
        this._templateSelector = document.querySelector(templateSelector).content;
        this._element = this._templateSelector.querySelector('.element').cloneNode(true);
        this._imageTitle = this._element.querySelector('.element__title');
        this._imageLink = this._element.querySelector('.element__image');
        this._cardTrash = this._element.querySelector('.element__trash');
        this._like = this._element.querySelector('.element__like');
    }

    _setEventListeners() {
        this._imageLink.addEventListener('click', (e) => {
            this._openPopupImg();
        });

        this._cardTrash.addEventListener('click', (e) => {
            this._element.remove();
        });
        
        this._like.addEventListener('click', (e) => {
            this._like.classList.toggle('element__like_active');
        });
    }

    renderCard() {
        this._setEventListeners();
        this._imageLink.setAttribute('src', this._link);
        this._imageLink.setAttribute('alt', this._text);
        this._imageTitle.textContent = this._text;
        elements.prepend(this._element);
    }

    _openPopupImg() {
        popupText.textContent = this._text;
        popupPicture.src = this._link;
        popupPicture.alt = this._text;
        openPopup(popupImage);
    }
}

export {Card}