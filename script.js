let timer = null;

const rootElement = document.querySelector(".wrapper");
const layer1Array = document.querySelectorAll(".layer-1");

const mouseStopped = () => {
  rootElement.classList.remove("moving");
  rootElement.style.setProperty("--scale", "20px");
};

const scale = () => {
  rootElement.style.setProperty("--scale", "60px");

  const timeoutID = setTimeout(() => {
    rootElement.style.setProperty("--scale", "20px");
    clearTimeout(timeoutID);
  }, 1500);
};

window.addEventListener("mousemove", ({ pageX, pageY }) => {
  rootElement.classList.add("moving");

  layer1Array.forEach((layer1) => {
    const targetRect = layer1.getBoundingClientRect();

    if (
      pageX > targetRect.left &&
      pageX < targetRect.right &&
      pageY > targetRect.top &&
      pageY < targetRect.bottom
    ) {
      scale();
    }
  });

  rootElement.style.setProperty("--x", `${pageX}px`);
  rootElement.style.setProperty("--y", `${pageY}px`);

  clearTimeout(timer);
  timer = setTimeout(mouseStopped, 1000);
});
