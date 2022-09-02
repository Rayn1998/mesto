export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose() {
        if (event.key === "Escape") {
                this.close();
            }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('popup__body') || e.target.classList.contains('popup__close-btn')) {
                this.close();
            }
        });
    }
}