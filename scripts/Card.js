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
        this._popup = document.querySelector('.popup-image');
        this._popupText = this._popup.querySelector('.popup__text');
        this._popupPicture = this._popup.querySelector('.popup__picture');
        this._imageLink.setAttribute('src', this._link);
        this._imageLink.setAttribute('alt', this._text);
        this._imageTitle.textContent = this._text;
        this._elements = document.querySelector('.elements');
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
        this._elements.prepend(this._element);
    }

    _openPopupImg() {
        this._popupText.textContent = this._text;
        this._popupPicture.src = this._link;
        this._popupPicture.alt = this._text;
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', (e) => {
            this._closePopupEsc(e);
        });
    }

    _closePopupEsc(e) {
        if (e.key === 'Escape'){
            this._popup.classList.remove('popup_opened');
            document.removeEventListener('keydown', this._closePopupEsc); 
        }
    }
}

export {Card}