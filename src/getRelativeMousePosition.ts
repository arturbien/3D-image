// gets mouse position relative to target element in %
// returns values in range -0.5 to 0.5, so [0, 0] is center

type MousePosition = [number, number];
export function getRelativeMousePosition(e: MouseEvent): MousePosition {
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

type DeviceOrientation = {
  alpha: number;
  beta: number;
  gamma: number;
};

class DeviceOrientationManager {
  initialData: DeviceOrientation | null;
  data: DeviceOrientation;
  subscribers: Function[];

  constructor() {
    this.subscribers = [];
    this.initialData = null;
    this.data = {
      alpha: 0,
      beta: 0,
      gamma: 0
    };
    window.addEventListener(
      "deviceorientation",
      e => {
        this.updateOrientationData(e);
        this.subscribers.forEach(subscriber => {
          subscriber(this.data.alpha, this.data.beta, this.data.gamma);
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
    this.data.alpha = e.alpha - this.initialData.alpha;
    this.data.gamma = (-e.gamma + this.initialData.gamma) * -1;
    this.data.beta = (e.beta - this.initialData.beta) * -1;
  }
}
export const DeviceOrientation = new DeviceOrientationManager();
