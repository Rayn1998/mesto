export default class Section {
    constructor(targetSelector) {
        this._container = document.querySelector(targetSelector);
    }

    _clear() {
        this._container.innerHTML = '';
    }

    renderItems({items, renderer}) {
        this._renderer = renderer;
        this._clear();

        items.forEach( item => {
            this._renderer(item);
        })
    }

    addItem(element) {
        this._container.prepend(element);
    }
}