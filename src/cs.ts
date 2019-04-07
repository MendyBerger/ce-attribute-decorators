export function attribute(name?: string) {
	return attributeBuilder({ name });
}

export function booleanAttribute(name?: string) {
	return attributeBuilder({ name, bool: true });
}

function attributeBuilder(config: {name?: string, bool?: boolean} = {}): any {
	return function (proto: any, name: string, descriptor: PropertyDescriptor = {}): PropertyDescriptor {

		name = config.name || name;

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
		descriptor.set = function (this: HTMLElement, v: any) {

			if (v === null) return this.removeAttribute(name); // remove 

			if(config.bool){
				handleSetBoolAttribute(this, name, v);
			} else { // string
				this.setAttribute(name, v);
			}

			if (origSet) {
				origSet.call(this, v);
			}

		}

		const origGet = descriptor.get;
		descriptor.get = function (this: HTMLElement): string | boolean | null {
			if (origGet) { 
				return origGet.apply(this);
			} else {
				return config.bool ? this.hasAttribute(name) : this.getAttribute(name);
			}
		}
		return descriptor;

	}
}

function handleSetBoolAttribute(element: HTMLElement, attributeName: string, value: any) {
	if (value || value === "") { // set
		value = value === true ? "" : value; // if true make empty string
		element.setAttribute(attributeName, value);
	} else {
		element.removeAttribute(attributeName);
	}
}

export function element(name: string): any {
	return function (clazz: any) {
		customElements.define(name, clazz);
		return clazz;
	}
}
