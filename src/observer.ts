interface Subscriber {
  target: HTMLElement;
  onVisible: Function;
  onInvisible: Function;
}

// ioid = intersection observer id
const ID_ATTR_NAME = "data-ioid";
class VisibilityObserver {
  intersectionObserver: IntersectionObserver;
  subscribers: { [key: string]: Subscriber };
  subscribersCount: number;

  constructor() {
    this.subscribers = {};
    this.subscribersCount = 0;
    const options = {
      root: <any>null,
      rootMargin: <string>"0px 0px 0px 0px",
      threshold: 0
    };
    const callback = (entries: Array<IntersectionObserverEntry>) => {
      entries.forEach(entry => {
        const target = entry.target;
        const id = target.getAttribute(ID_ATTR_NAME);
        if (entry.isIntersecting) {
          this.subscribers[id].onVisible();
          console.log("VISIBLE!", target);
        } else {
          this.subscribers[id].onInvisible();
          console.log("invisible!", target);
        }
      });
    };
    this.intersectionObserver = new IntersectionObserver(callback, options);
  }
  subscribe(subscriber: Subscriber): void {
    const { target, onVisible, onInvisible } = subscriber;
    if (!target) return;
    this.subscribersCount++;
    // generating id (key)
    const id = this.subscribersCount.toString();
    // assigning id to target element
    target.setAttribute(ID_ATTR_NAME, id);
    // keep reference to that object
    this.subscribers[id] = subscriber;
    this.intersectionObserver.observe(target);
  }
  unsubscribe(target: HTMLElement): void {}
}

export default new VisibilityObserver();
