var cacheName = "hello-pwa";
var filesToCache = [
  "/",
  "/index.html",
  "../src/views/ServiceScreen/Service.js",
  "../src/assets/icons/NarvinLogo.png",
  "../src/assets/icons/NarvinLogo.gif",
  "../src/assets/icons/bill-mobile.png",
  "../src/assets/icons/sim.png",
  "../src/assets/icons/Net.png",
  "../src/assets/icons/Shop.png",
  "../src/assets/icons/Merchant.png",
  "../src/assets/icons/Bus2.png",
  "../src/assets/icons/Train2.png",
  "../src/assets/icons/Insurance2.png",
  "../src/assets/icons/Charity.png",
  "../src/assets/icons/hotel.png",
  "../src/assets/icons/PayToll.png",
  "../src/assets/icons/AirPlane2.png",
]; /* Start the service worker and cache all of the app's content */

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
}); /* Serve cached content when offline */
self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
