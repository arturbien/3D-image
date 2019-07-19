// shader stolen from https://codepen.io/keilyn3d/pen/KLVxZM

export default `
    attribute vec2 pos;
    varying vec2 vpos;
    void main(){
        vpos = pos*-0.5 + vec2(0.5);
        gl_Position = vec4(pos, 0.0, 1.0);
    }
    `;
