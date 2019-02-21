var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { attribute, element } from "../../src/cs.js";
let MbCurrency = class MbCurrency extends HTMLElement {
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
    set amount(v) {
        this._amountSpan.textContent = Number(v).toFixed(2);
    }
    set currency(v) {
        this._currencySpan.textContent = v || '$';
    }
};
__decorate([
    attribute()
], MbCurrency.prototype, "amount", null);
__decorate([
    attribute()
], MbCurrency.prototype, "currency", null);
MbCurrency = __decorate([
    element('mb-currency')
], MbCurrency);
export { MbCurrency };
//# sourceMappingURL=currency.js.map