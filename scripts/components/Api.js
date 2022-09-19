export default class Api {
    constructor(options) {
        this._address = options.baseUrl;
        this._cohort = options.cohort;
        this._headers = options.headers;
    }
    
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }

    // USE
    getUserData() {
        return fetch(`${this._address}/${this._cohort}/users/me`, {
            method: 'GET',
            headers: this._headers,
        }).then(res => this._getResponseData(res))
    }

    getCardsData() {
        return fetch(`${this._address}/${this._cohort}/cards`, {
            method: 'GET',
            headers: this._headers,
        }).then(res => this._getResponseData(res))
    }

    sendData(newData) {
        return fetch(`${this._address}/${this._cohort}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: newData.name,
                about: newData.about
            })
        }).then(res => this._getResponseData(res))
    }

    editAvatar(link) {
        return fetch(`${this._address}/${this._cohort}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link.avatar,
            })
        }).then(res => this._getResponseData(res))
    }

    newCard(cardData) {
        return fetch(`${this._address}/${this._cohort}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link,
            })
        }).then(res => this._getResponseData(res))
    }

    deleteCard(cardId) {
        return fetch(`${this._address}/${this._cohort}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(res => this._getResponseData(res))
    }

    like(cardId) {
        return fetch(`${this._address}/${this._cohort}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        }).then(res => this._getResponseData(res))
    }

    deleteLike(cardData) {
        return fetch(`${this._address}/${this._cohort}/cards/${cardData._id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(res => this._getResponseData(res))
    }
}