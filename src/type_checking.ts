function isWindow(x: any): x is Window {
  return !!x && x === x.window;
}

function isDocument(x: any): x is Document {
  return !!x && x.nodeType === 9;
}

function isElement(x: any): x is HTMLElement {
  return !!x && x.nodeType === 1;
}

function isFunction(x: any): x is Function {
  return typeof x === "function";
}

function isString(x: any): x is string {
  return typeof x === "string";
}

function isNumeric(x: any): boolean {
  return !isNaN(parseFloat(x)) && isFinite(x);
}

const { isArray } = Array;
