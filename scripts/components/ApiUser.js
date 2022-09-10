import Api from './Api.js';

export default class ApiUser extends Api {
    constructor(options) {
        super(options);
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
            this._id = data._id;
            this._handler(data);
        }).catch(err => console.log(err));
    }
}