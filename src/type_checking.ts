// stolen from Ken Wheelers "Cash"
export function isWindow(x: any): x is Window {
  return !!x && x === x.window;
}

export function isDocument(x: any): x is Document {
  return !!x && x.nodeType === 9;
}

export function isElement(x: any): x is HTMLElement {
  return !!x && x.nodeType === 1;
}

export function isFunction(x: any): x is Function {
  return typeof x === "function";
}

export function isString(x: any): x is string {
  return typeof x === "string";
}

export function isNumeric(x: any): boolean {
  return !isNaN(parseFloat(x)) && isFinite(x);
}

// const { isArray } = Array;
