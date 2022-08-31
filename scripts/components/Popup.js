import { selectors } from '../utils/selectors.js';

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add(selectors.popupOpened);
    }

    close() {
        this._popup.classList.remove(selectors.popupOpened);
        document.removeEventListener('keydown', (e) => {
            if (e.key === "Escape") {
                this.close();
            }
        });
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains(selectors.popupBody) || e.target.classList.contains(selectors.popupCloseBtn)) {
                this.close();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
                this.close();
            }
        })
    }
}