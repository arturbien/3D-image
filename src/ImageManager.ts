import { isString, isElement } from "./type_checking";
import { Selector } from "./types";
import Image3D from "./Image3D";

class ImageManager {
  images: Image3D[];
  constructor() {
    this.images = [];
  }

  process(selector: Selector): void {
    let target: HTMLElement;

    if (isString(selector)) {
      target = document.querySelector(selector);
    } else if (isElement(selector)) {
      target = selector;
    }
    if (!target) return;

    // getting images source
    const src: string = target.getAttribute(`data-src`);
    const depthSrc: string = target.getAttribute(`data-depth-src`);
    const image3D = new Image3D(target, src, depthSrc);
    this.images.push(image3D);
  }
}

export default ImageManager;
