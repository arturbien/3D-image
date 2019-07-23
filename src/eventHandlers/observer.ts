type ObserverSubscriber = {
  target: HTMLElement;
  onVisible: Function;
  onInvisible: Function;
};
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
      root: null,
      rootMargin: "0px 0px 0px 0px",
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
  getSubscriberId(target: HTMLElement): string | undefined {
    return Object.keys(this.subscribers).find(
      id => this.subscribers[id].target === target
    );
  }
  subscribe(subscriber: ObserverSubscriber): void {
    const { target, onVisible, onInvisible } = subscriber;
    if (!target) return;

    this.subscribersCount++;
    // generating id (key)
    const id = this.subscribersCount.toString();
    // assigning id to target element
    target.setAttribute(ID_ATTR_NAME, id);
    // keep reference to subscriber
    this.subscribers[id] = subscriber;
    this.intersectionObserver.observe(target);
  }
  unsubscribe(target: HTMLElement): void {
    const id = this.getSubscriberId(target);
    if (id) {
      this.intersectionObserver.unobserve(target);
      delete this.subscribers[id];
    }
  }
}

export default new Observer();
