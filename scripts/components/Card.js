export default class Card {
    constructor (text, link, templateSelector, {handleCardClick}) {
        this._text = text;
        this._link = link;
        this._templateContent = document.querySelector(templateSelector).content;
        this._element = this._templateContent.querySelector('.element').cloneNode(true);
        this._imageTitle = this._element.querySelector('.element__title');
        this._imageLink = this._element.querySelector('.element__image');
        this._cardTrash = this._element.querySelector('.element__trash');
        this._like = this._element.querySelector('.element__like');
        this._handleCardClick = handleCardClick;
    }

    _setEventListeners() {
        this._imageLink.addEventListener('click', (e) => {
            this._handleCardClick();
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
        return this._element;
    }
};