export default class Card {
    constructor ({data}, templateSelector, {handleCardClick}, {handleLikeClick}, {handleCardRemove}) {
        this._cardObject = data;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._templateContent = document.querySelector(templateSelector).content;
        this._element = this._templateContent.querySelector('.element').cloneNode(true);
        this._imageTitle = this._element.querySelector('.element__title');
        this._imageLink = this._element.querySelector('.element__image');
        this._cardTrash = this._element.querySelector('.element__trash');
        this._like = this._element.querySelector('.element__like');
        this._likeAmount = this._element.querySelector('.element__like-amount');
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleCardRemove = handleCardRemove;
    }

    _setEventListeners() {
        this._imageLink.addEventListener('click', (e) => {
            this._handleCardClick();
        });

        this._cardTrash.addEventListener('click', (e) => {
            this._handleCardRemove(this._cardObject, this._element);
        });
        
        this._like.addEventListener('click', (e) => {
            this._handleLikeClick(this._like, this._likeAmount, this._cardObject);
        });
    }

    renderCard(user) {
        this._setEventListeners();
        this._imageLink.setAttribute('src', this._link);
        this._imageLink.setAttribute('alt', this._name);
        this._likeAmount.textContent = this._cardObject.likes.length;
        this._imageTitle.textContent = this._name;
        const isLiked = this._likes.some(item => {
            if (item._id === user._id) return true;
        });
        if (isLiked) this._like.classList.add('element__like_active');
        const isOwner = this._cardObject.owner._id === user._id;
        isOwner ? '' : this._cardTrash.remove();
        return this._element;
    }
};
