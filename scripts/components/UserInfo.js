export default class UserInfo {
    constructor(userData) {
        this._userName = document.querySelector(userData.userSelector);
        this._userAbout = document.querySelector(userData.userAboutSelector);
        this._userAvatar = document.querySelector(userData.userAvatarSelector);
    }

    getUserInfo() {
        this._user = {
            name: this._userName.textContent,
            avatar: this._userAvatar.getAttribute('src'),
            about: this._userAbout.textContent,
        };
        return this._user;
    }

    setUserInfo(data) {
        const { name, about, avatar } = data;
        this._userAvatar.src = avatar;
        this._userAvatar.alt = `Avatar of ${name}`;
        this._userName.textContent = name;
        this._userAbout.textContent = about;   
    }
}