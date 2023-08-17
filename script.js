// HideMessages Code
import HideMessages from "./HideMessages.js";

const wrapper = document.querySelector(".wrapper");
const layer1Array = document.querySelectorAll(".layer-1");

const options = {
  minSize: 20,
  maxSize: 60,
  zoomCursorOnHover: true,
  reduceImmediately: false,
  timeSpan: 5000,
};

new HideMessages(wrapper, layer1Array, options);
