import ImageManager from "./ImageManager";
export interface CustomWindow extends Window {
  ImageManager: any;
}
declare let window: CustomWindow;
window.ImageManager = new ImageManager();

// export { ImageManager as default };
