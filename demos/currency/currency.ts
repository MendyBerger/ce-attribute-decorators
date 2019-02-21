import { attribute, element } from "../../src/cs.js";

@element('mb-currency')
export class MbCurrency extends HTMLElement {

    private _currencySpan: HTMLSpanElement;
    private _amountSpan: HTMLSpanElement;

    constructor() {
        super();
        this._currencySpan = document.createElement('span');
        this._amountSpan = document.createElement('span');
        this._currencySpan.id = "currency";
        this._amountSpan.id = "amount";
        this._currencySpan.textContent = "$";

        this.appendChild(this._currencySpan);
        this.appendChild(this._amountSpan);
    }

    @attribute()
    set amount(v: number) {
        this._amountSpan.textContent = Number(v).toFixed(2);
    }

    @attribute()
    set currency(v: string) {
        this._currencySpan.textContent = v || '$';
    }

}
