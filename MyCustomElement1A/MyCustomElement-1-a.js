const html = String.raw;
export class MyCustomElement1A extends HTMLElement {
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
    #someStringProp = '';
    get someStringProp() {
        return this.#someStringProp;
    }
    set someStringProp(nv) {
        this.#someStringProp = nv;
        const div = this.shadowRoot?.querySelector('#someStringProp');
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
        <div id=someStringProp></div>
        <slot name=test be-prop-slotting></slot>
        <be-hive></be-hive>
        `;
    }
}
customElements.define('my-custom-element-1-a', MyCustomElement1A);
