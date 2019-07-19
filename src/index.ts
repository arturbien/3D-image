import { isString, isElement } from "./type_checking";
import vertexShader from "./shaders/vertex";
import fragmentShader from "./shaders/fragment";
import { Selector } from "./types";
class Image3d {
  process(selector: Selector): void {
    let target: HTMLElement;

    if (isString(selector)) {
      target = document.querySelector(selector);
      if (!target) return;
    } else if (isElement(selector)) {
      target = selector;
    }

    if (!target) return;
    console.log(target);

    this.createCanvas(target);
  }
  async createImage(src: string): Promise<HTMLImageElement> {
    const img: HTMLImageElement = new Image();
    img.src = src;
    await new Promise(r => (img.onload = r));
    return img;
  }
  async createCanvas(target: HTMLElement): Promise<HTMLCanvasElement> {
    // getting images source
    const src: string = target.getAttribute(`data-src`);
    const depthSrc: string = target.getAttribute(`data-depth-src`);

    // creating Image elements
    const img: HTMLImageElement = await this.createImage(src);
    const depthImg: HTMLImageElement = await this.createImage(depthSrc);

    // creating Canvas element with size of loaded image
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.height = img.height;
    canvas.width = img.width;

    const gl: WebGLRenderingContext = canvas.getContext("webgl");

    Object.assign(canvas.style, {
      maxWidth: "100vw",
      maxHeight: "100vh",
      objectFit: "contain"
    });

    document.body.appendChild(canvas);

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
    const vs: WebGLShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vertexShader);
    gl.compileShader(vs);

    const fs: WebGLShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fragmentShader);
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

    loop();

    function loop(): void {
      gl.clearColor(0.25, 0.65, 1, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(() => loop());
    }

    const mouseLoc: WebGLUniformLocation = gl.getUniformLocation(
      program,
      "mouse"
    );

    canvas.onmousemove = function(d): void {
      const mpos = [
        -0.5 + d.layerX / canvas.width,
        0.5 - d.layerY / canvas.width
      ];
      gl.uniform2fv(mouseLoc, new Float32Array(mpos));
    };
    document.body.appendChild(canvas);
    return canvas;
  }
}
export interface CustomWindow extends Window {
  image3d: any;
}
declare let window: CustomWindow;
window.image3d = new Image3d();
