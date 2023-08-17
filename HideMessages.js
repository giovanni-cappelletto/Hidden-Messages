const DEFAULT_OPTIONS = {
  minSize: 20,
  maxSize: 60,
};

class HideMessages {
  constructor(rootElement, layer1Array, options) {
    this.rootElement = rootElement;
    this.layer1Array = layer1Array;

    this.options = options;
    this.minSize = `${this.options.minSize || DEFAULT_OPTIONS.minSize}px`;
    this.maxSize = `${this.options.maxSize || DEFAULT_OPTIONS.maxSize}px`;
    this.reduceImmediately = this.options.reduceImmediately;
    this.zoomCursorOnHover = this.options.zoomCursorOnHover;
    this.timeSpan = this.options.timeSpan;

    this.pageX, this.pageY;
    this.timer = null;

    this.scale(this.minSize);
    this.render();
  }

  mouseStopped() {
    this.rootElement.classList.remove("moving");
  }

  scale(size) {
    if (!this.zoomCursorOnHover && size === this.maxSize) return;

    this.rootElement.style.setProperty("--scale", size);
  }

  checkIntersection({ left, right, top, bottom }, pageX, pageY) {
    // Maybe use here this.pageX and this.pageY (try after committing)
    return pageX > left && pageX < right && pageY > top && pageY < bottom;
  }

  reduceInstantly(targetRect) {
    if (!this.checkIntersection(targetRect, this.pageX, this.pageY)) {
    }
  }

  reduceAfterTimeSpan(targetRect) {
    this.timeoutID = setTimeout(() => {
      clearTimeout(this.timeoutID);

      if (this.checkIntersection(targetRect, this.pageX, this.pageY)) {
        this.reduceAfterTimeSpan(targetRect);
        return;
      }

      this.scale(this.minSize);
    }, this.timeSpan);
  }

  render() {
    window.addEventListener("mousemove", ({ pageX, pageY }) => {
      this.pageX = pageX;
      this.pageY = pageY;
      this.rootElement.classList.add("moving");

      this.layer1Array.forEach((layer1) => {
        this.targetRect = layer1.getBoundingClientRect();

        if (!this.zoomCursorOnHover) return;

        if (this.checkIntersection(this.targetRect, this.pageX, this.pageY)) {
          this.scale(this.maxSize);

          if (!this.reduceImmediately) {
            this.reduceAfterTimeSpan(this.targetRect);
          }

          return;
        }

        if (this.reduceImmediately) this.scale(this.minSize);
      });

      this.rootElement.style.setProperty("--x", `${pageX}px`);
      this.rootElement.style.setProperty("--y", `${pageY}px`);

      clearTimeout(this.timer);
      this.timer = setTimeout(this.mouseStopped, 1000);
    });
  }
}

export default HideMessages;
