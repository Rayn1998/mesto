export default class Card {
    constructor ({data, handleCardClick, handleLikeClick, handleCardRemove}) {
        this._userId = data.currentUser;
        this._cardId = data._id;
        this._name = data.name;
        this._link = data.link;
        this._owner = data.owner;
        this._likes = data.likes;
        this._templateContent = document.querySelector('.template__new-card').content;
        this._element = this._templateContent.querySelector('.element').cloneNode(true);
        this._imageTitle = this._element.querySelector('.element__title');
        this._imageLink = this._element.querySelector('.element__image');
        this._cardTrash = this._element.querySelector('.element__trash');
        this._like = this._element.querySelector('.element__like');
        this._likeAmount = this._element.querySelector('.element__like-amount');
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleCardRemove = handleCardRemove;
        this._isLiked = this._likes.some(item => {
            return item._id === this._userId;
        });
    }

    _setEventListeners() {
        this._imageLink.addEventListener('click', (e) => {
            this._handleCardClick();
        });

        this._cardTrash.addEventListener('click', (e) => {
            this._handleCardRemove();
        });
        
        this._like.addEventListener('click', (e) => {
            this._handleLikeClick();
        });
    }

    cardLikeStatus(res) {
        this._like.classList.toggle('element__like_active');
        this._likeAmount.textContent = res.likes.length;
    }

    getCardId() {
        return this._cardId;
    }

    getLikeStatus() {
        return this._isLiked;
    }

    changeLikeStatus(status) {
        this._isLiked = status;
    }
 
    renderCard() {
        this._setEventListeners();
        this._imageLink.setAttribute('src', this._link);
        this._imageLink.setAttribute('alt', this._name);
        this._likeAmount.textContent = this._likes.length;
        this._imageTitle.textContent = this._name;
        if (this.getLikeStatus()) this._like.classList.add('element__like_active');
        const isOwner = this._owner._id === this._userId;
        isOwner ? '' : this._cardTrash.remove();
        return this._element;
    }

    removeCard() {
        this._element.remove();
    }
};
