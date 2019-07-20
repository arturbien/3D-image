// gets mouse position relative to target element in %
// returns values in range -0.5 to 0.5, so [0, 0] is center
export function getRelativeMousePosition(e: MouseEvent): [number, number] {
  const target = <HTMLCanvasElement>e.target;

  // how to do destructuring assignment in TS? 😂
  const rect = target.getBoundingClientRect();
  const width: number = rect.width;
  const height: number = rect.height;
  const left: number = rect.left;
  const top: number = rect.top;

  const pX: number = -0.5 + (e.clientX - left) / width;
  const pY: number = 0.5 - (e.clientY - top) / height;
  return [pX, pY];
}

var deviceOrientationData;
const RATIO = 0.2;
let initialBeta: any = null;
let initialGamma: any = null;

function normalize(min: number, max: number, val: number): number {
  if (val < min) {
    return min;
  } else if (val > max) {
    return max;
  }
  return val;
}

class DeviceOrientationManager {
  initialData: any;
  alpha: number;
  beta: number;
  gamma: number;
  subscribers: Array<Function>;

  constructor() {
    this.subscribers = [];

    window.addEventListener(
      "deviceorientation",
      e => {
        this.updateOrientationData(e);
        this.subscribers.forEach(subscriber => {
          subscriber(this.alpha, this.beta, this.gamma);
        });
      },
      false
    );
  }
  subscribe(fn: Function): void {
    this.subscribers.push(fn);
  }
  updateOrientationData(e: DeviceOrientationEvent): void {
    if (!this.initialData) {
      this.initialData = {
        alpha: e.alpha,
        beta: e.beta,
        gamma: e.gamma
      };
    }
    this.alpha = e.alpha - this.initialData.alpha;
    this.gamma = (-e.gamma + this.initialData.gamma) * -1;
    this.beta = (e.beta - this.initialData.beta) * -1;
  }
}
export const DeviceOrientation = new DeviceOrientationManager();
