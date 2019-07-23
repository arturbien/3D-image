import observer from "./eventHandlers/observer";
import vertexShader from "./shaders/vertex";
import fragmentShader, { MOUSE_VECTOR_NAME } from "./shaders/fragment";

import DeviceOrientation from "./eventHandlers/DeviceOrientation";
import getRelativeMousePosition from "./eventHandlers/MousePosition";

class Image3D {
  target: HTMLElement;
  src: string;
  depthSrc: string;
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;
  blockRepaint: boolean;
  pixelRatio: number;

  constructor(target: HTMLElement, src: string, depthSrc: string) {
    this.target = target;
    this.src = src;
    this.depthSrc = depthSrc;
    this.blockRepaint = false;
    //TODO high pixel ratio causes drastic performance issues WTF
    // this.pixelRatio = window.devicePixelRatio;
    this.pixelRatio = 1;
    this.setup();
  }
  async setup() {
    this.canvas = await this.createCanvas(this.target);
    this.target.appendChild(this.canvas);

    observer.subscribe({
      target: this.target,
      onVisible: () => (this.blockRepaint = false),
      onInvisible: () => (this.blockRepaint = true)
    });
  }

  async loadImage(src: string): Promise<HTMLImageElement> {
    const img: HTMLImageElement = new Image();
    img.src = src;
    await new Promise(r => (img.onload = r));
    return img;
  }
  async createCanvas(target: HTMLElement): Promise<HTMLCanvasElement> {
    // loading imagesImage elements
    const img: HTMLImageElement = await this.loadImage(this.src);
    const depthImg: HTMLImageElement = await this.loadImage(this.depthSrc);
    // creating Canvas element with size of loaded image
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.height = img.height * this.pixelRatio;
    canvas.width = img.width * this.pixelRatio;

    const gl: WebGLRenderingContext = canvas.getContext("webgl");

    Object.assign(canvas.style, {
      maxWidth: "100vw",
      maxHeight: "100vh",
      objectFit: "contain",
      width: "100%",
      height: "100%"
    });

    const buffer: WebGLBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    // creating shaders
    const vShader: string = vertexShader;
    const vs: WebGLShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vShader);
    gl.compileShader(vs);

    const fShader: string = fragmentShader;
    const fs: WebGLShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fShader);
    gl.compileShader(fs);

    const program: WebGLProgram = gl.createProgram();
    gl.attachShader(program, fs);
    gl.attachShader(program, vs);
    gl.linkProgram(program);
    gl.useProgram(program);

    function setTexture(
      image: HTMLImageElement,
      name: string,
      num: number
    ): void {
      var texture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + num);
      gl.bindTexture(gl.TEXTURE_2D, texture);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );
      gl.uniform1i(gl.getUniformLocation(program, name), num);
    }
    setTexture(img, "img", 0);
    setTexture(depthImg, "depth", 1);

    const loop = (): void => {
      if (this.blockRepaint) return;
      gl.clearColor(0.25, 0.65, 1, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      // requestAnimationFrame(() => loop());
    };
    loop();

    const location: WebGLUniformLocation = gl.getUniformLocation(
      program,
      MOUSE_VECTOR_NAME
    );
    canvas.onmousemove = function(e): void {
      const mousePosition = getRelativeMousePosition(e);
      gl.uniform2fv(location, new Float32Array(mousePosition));
      // render next frame on mouse move
      requestAnimationFrame(() => loop());
    };
    // TODO interface for alpa,beta,gamma
    const onDeviceMotion = (alpha: number, beta: number, gamma: number) => {
      const RATIO = 0.015;
      const devicePosition = [-RATIO * gamma, -RATIO * beta];
      gl.uniform2fv(location, new Float32Array(devicePosition));
      // render next frame on mouse move
      requestAnimationFrame(() => loop());
    };
    DeviceOrientation.subscribe(onDeviceMotion);

    this.gl = gl;
    return canvas;
  }
}

export default Image3D;
