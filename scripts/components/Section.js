export default class Section {
    constructor({items, renderer}, targetSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(targetSelector);
    }

    _clear() {
        this._container.innerHTML = '';
    }

    renderItems() {
        this._clear();

        this._items.forEach( item => {
            this._renderer(item);
        })
    }

    addItem(element) {
        this._container.prepend(element);
    }
}