window.onload = () => {
  "use strict";
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./serviceWoker.js");
  }
};
