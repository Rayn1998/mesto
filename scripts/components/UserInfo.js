import { popupEdit } from '../utils/constants.js';
import { selectors } from '../utils/selectors.js';

export default class UserInfo {
    constructor({userSelector, userAboutSelector}) {
        this._userName = document.querySelector(userSelector);
        this._userAbout = document.querySelector(userAboutSelector);
        this._popupEdit = popupEdit;
        this._inputName = this._popupEdit.querySelector(selectors.popupInputName);
        this._inputProf = this._popupEdit.querySelector(selectors.popupInputProf);
    }

    getUserInfo() {
        this._user = {};
        this._user.userName = this._userName.textContent;
        this._user.userAbout = this._userAbout.textContent;
        return this._user;
    }

    setUserInfo({data}) {
        const [ userName, userAbout ] = Object.values(data);
        this._userName.textContent = userName;
        this._userAbout.textContent = userAbout;   
    }
}