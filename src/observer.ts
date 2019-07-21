type ObserverSubscriber = {
  target: HTMLElement;
  onVisible: Function;
  onInvisible: Function;
};
// ioid = intersection observer id
const ID_ATTR_NAME = "data-ioid";

/**
 * - observes subscribed HTMLElements and triggers callbacks when element appears/disappears from the viewport
 */
class Observer {
  intersectionObserver: IntersectionObserver;
  subscribers: { [key: string]: ObserverSubscriber };
  subscribersCount: number;

  constructor() {
    this.subscribers = {};
    this.subscribersCount = 0;
    const options = {
      root: <any>null,
      rootMargin: <string>"0px 0px 0px 0px",
      threshold: 0
    };
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const target = entry.target;
        const id = target.getAttribute(ID_ATTR_NAME);
        const subscriber = this.subscribers[id];

        if (!subscriber) return;

        if (entry.isIntersecting) {
          subscriber.onVisible();
          console.log("VISIBLE!", target);
        } else {
          subscriber.onInvisible();
          console.log("invisible!", target);
        }
      });
    };
    this.intersectionObserver = new IntersectionObserver(callback, options);
  }
  subscribe(subscriber: ObserverSubscriber): void {
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

export default new Observer();
