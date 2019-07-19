import { isString, isElement } from "./type_checking";
import { Selector } from "./types";

class Image3d {}
export interface CustomWindow extends Window {
  image3d: any;
}
declare let window: CustomWindow;
window.image3d = new Image3d();
