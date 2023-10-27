const html = String.raw;
export class MyCustomElement extends HTMLElement {
    #isVegetarian;
    get isVegetarian() {
        return this.#isVegetarian;
    }
    set isVegetarian(nv) {
        this.#isVegetarian = nv;
        const div = this.shadowRoot?.querySelector('#isVegetarian');
        if (div !== null && div !== undefined)
            div.textContent = '' + nv;
    }
    #age = 64;
    get age() {
        return this.#age;
    }
    set age(nv) {
        this.#age = nv;
        const div = this.shadowRoot?.querySelector('#age');
        if (div !== null && div !== undefined)
            div.textContent = '' + nv;
    }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = html `
        <div id=age></div>
        <div id=isVegetarian></div>
        <slot name=test></slot>
        <be-hive></be-hive>
        `;
    }
}
customElements.define('my-custom-element', MyCustomElement);
