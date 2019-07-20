export const MOUSE_VECTOR_NAME = "mouse";
// shader stolen from https://codepen.io/keilyn3d/pen/KLVxZM
export default `
    precision highp float;
    uniform sampler2D img;
    uniform sampler2D depth;
    uniform vec2 ${MOUSE_VECTOR_NAME};
    varying vec2 vpos;
    void main(){
        float dp = -0.5 + texture2D(depth, vpos).x;
        gl_FragColor = texture2D(img, vpos + ${MOUSE_VECTOR_NAME} * 0.2 * dp);
    }
    `;
