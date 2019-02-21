export function attribute() {
    return function (proto, name, descriptor = {}) {
        if (!proto.constructor.observedAttributes)
            proto.constructor.observedAttributes = [];
        proto.constructor.observedAttributes.push(name);
        const origAttrChange = proto.attributeChangedCallback;
        proto.attributeChangedCallback = function (attrName, oldValue, newValue) {
            if (attrName === name) {
                if (oldValue === newValue)
                    return;
                this[name] = newValue;
            }
            if (origAttrChange)
                origAttrChange.apply(this, arguments);
        };
        const origSet = descriptor.set;
        descriptor.set = function (v) {
            if (v === null)
                this.removeAttribute(name);
            else
                this.setAttribute(name, v);
            if (origSet) {
                origSet.call(this, v);
            }
        };
        const origGet = descriptor.get;
        descriptor.get = function () {
            if (origGet)
                return origGet.apply(this);
            else
                return this.getAttribute(name);
        };
        return descriptor;
    };
}
;
export function element(name) {
    return function (clazz) {
        customElements.define(name, clazz);
        return clazz;
    };
}
//# sourceMappingURL=cs.js.map