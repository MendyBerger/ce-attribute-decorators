export function attribute(): any {
    return function (proto: any, name: string, descriptor: PropertyDescriptor = {}): PropertyDescriptor {

        if (!proto.constructor.observedAttributes) proto.constructor.observedAttributes = [];
        proto.constructor.observedAttributes.push(name);

        const origAttrChange: Function = proto.attributeChangedCallback;
        proto.attributeChangedCallback = function (attrName: string, oldValue: string, newValue: string) {
            if (attrName === name) {
                if (oldValue === newValue) return;
                this[name] = newValue;
            }
            if (origAttrChange) origAttrChange.apply(this, arguments);
        }

        const origSet = descriptor.set;
        descriptor.set = function (v: any) {
            if(v === null) (this as HTMLElement).removeAttribute(name);
            else (this as HTMLElement).setAttribute(name, v); 
            if (origSet) {
                origSet.call(this, v);
            }
        }

        const origGet = descriptor.get;
        descriptor.get = function (): any {
            if (origGet) return origGet.apply(this);
            else return (this as HTMLElement).getAttribute(name);
        }
        return descriptor;

    }
};

export function element(name: string): any {
    return function (clazz: any) {
        customElements.define(name, clazz);
        return clazz;
    }
}