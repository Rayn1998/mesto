export default class Api {
    constructor(options) {
        this._address = options.baseUrl;
        this._headers = options.headers;
    }

    getData({handler}) {
        this._handler = handler;
        fetch(this._address, {
            method: 'GET',
            headers: this._headers,
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        }).then(data => {
            this._handler(data);
        }).catch(err => console.log(err));
    }

    sendData({newData, handler}) {
        this._handler = handler;
        fetch(this._address, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: newData.name,
                about: newData.link
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(data => {
            this._handler(data);
        }).catch(err => console.log(err))
    }

    editAvatar(link, {handler}) {
        this._link = link;
        this._handler = handler;
        fetch(`${this._address}/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: this._link,
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        }).then(data => {
            this._handler(data);
        }).catch(err => console.log(err))
    }

    newCard({cardData, handler}) {
        this._handler = handler;
        fetch(this._address, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link,
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        }).then(res => {
            this._handler(res);
        }).catch(console.log.bind(console));
    }

    deleteCard({cardData}, element) {
        fetch(`${this._address}/${cardData._id}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(res => {
            if (res.ok) {
                element.remove();
            }
        }).catch(err => console.log(err));
    }

    like(like, likes, cardObj) {
        fetch(`${this._address}/${cardObj._id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(res => {
            like.classList.toggle('element__like_active');
            likes.textContent = res.likes.length;
        }).catch(err => console.log(err));
    }

    likeDelete(like, likes, cardObj) {
        fetch(`${this._address}/${cardObj._id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(res => {
            like.classList.toggle('element__like_active');
            likes.textContent = res.likes.length;
        }).catch(err => console.log(err));
    }
}