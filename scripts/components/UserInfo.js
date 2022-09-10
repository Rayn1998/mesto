export default class UserInfo {
    constructor({userSelector, userAboutSelector}) {
        this._userName = document.querySelector(userSelector);
        this._userAbout = document.querySelector(userAboutSelector);
        this._userAvatar = document.querySelector('.profile__avatar');
        this._popupEdit = document.querySelector('.popup_type_profile');
        this._inputName = this._popupEdit.querySelector('.popup__input_type_name');
        this._inputProf = this._popupEdit.querySelector('.popup__input_type_profession');
    }

    getUserInfo() {
        this._user = {};
        this._user.name = this._userName.textContent;
        this._user.about = this._userAbout.textContent;
        this._user.avatar = this._userAvatar.getAttribute('src');
        return this._user;
    }

    setUserInfo({data}) {
        const { name, about, avatar } = data;
        this._userAvatar.src = avatar;
        this._userAvatar.alt = `Avatar of ${name}`;
        this._userName.textContent = name;
        this._userAbout.textContent = about;   
    }
}