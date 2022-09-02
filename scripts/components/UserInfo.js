export default class UserInfo {
    constructor({userSelector, userAboutSelector}) {
        this._userName = document.querySelector(userSelector);
        this._userAbout = document.querySelector(userAboutSelector);
        this._popupEdit = document.querySelector('.popup_type_profile');
        this._inputName = this._popupEdit.querySelector('.popup__input_type_name');
        this._inputProf = this._popupEdit.querySelector('.popup__input_type_profession');
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