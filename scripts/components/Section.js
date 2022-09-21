export default class Section {
    constructor(targetSelector, {renderer}) {
        this._container = document.querySelector(targetSelector);
        this._renderer = renderer;
    }

    _clear() {
        this._container.innerHTML = '';
    }

    renderItems({items}) {
        this._clear();
        items.forEach( item => {
            this._renderer(item);
        })
    }

    addItem(element) {
        this._container.prepend(element);
    }
}