export function attribute(name) {
    return attributeBuilder({ name });
}
export function booleanAttribute(name) {
    return attributeBuilder({ name, bool: true });
}
function attributeBuilder(config = {}) {
    return function (proto, name, descriptor = {}) {
        name = config.name || name;
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
                return this.removeAttribute(name); // remove 
            if (config.bool) {
                handleSetBoolAttribute(this, name, v);
            }
            else { // string
                this.setAttribute(name, v);
            }
            if (origSet) {
                origSet.call(this, v);
            }
        };
        const origGet = descriptor.get;
        descriptor.get = function () {
            if (origGet) {
                return origGet.apply(this);
            }
            else {
                return config.bool ? this.hasAttribute(name) : this.getAttribute(name);
            }
        };
        return descriptor;
    };
}
function handleSetBoolAttribute(element, attributeName, value) {
    if (value || value === "") { // set
        value = value === true ? "" : value; // if true make empty string
        element.setAttribute(attributeName, value);
    }
    else {
        element.removeAttribute(attributeName);
    }
}
export function element(name) {
    return function (clazz) {
        customElements.define(name, clazz);
        return clazz;
    };
}
//# sourceMappingURL=cs.js.map