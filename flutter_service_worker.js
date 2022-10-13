'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "74133ed7e75f1946f828c28c4a7bbe11",
"assets/assets/fonts/OpenSans/OpenSans-Bold.ttf": "5bc6b8360236a197d59e55f72b02d4bf",
"assets/assets/fonts/OpenSans/OpenSans-ExtraBold.ttf": "907d99fe588e4649680159671dfe74f4",
"assets/assets/fonts/OpenSans/OpenSans-Light.ttf": "3dd221ea976bc4c617c40d366580bfe8",
"assets/assets/fonts/OpenSans/OpenSans-Medium.ttf": "0cbcac22e73cab1d6dbf2cfcc269b942",
"assets/assets/fonts/OpenSans/OpenSans-Regular.ttf": "3eb5459d91a5743e0deaf2c7d7896b08",
"assets/assets/fonts/OpenSans/OpenSans-SemiBold.ttf": "af0b2118d34dcaf6e671ee67cf4d5be2",
"assets/assets/images/angular-js.png": "cc683b4b94c58a74664a09d46ab8b66b",
"assets/assets/images/banner2.png": "e0eec4199a6a9b9af7b2f3fc61472f9d",
"assets/assets/images/banner3.png": "a169b63d43dc2c914cacebd919f5f752",
"assets/assets/images/dedicated-developers.png": "c932fcf543d24d5001286416518e1ed5",
"assets/assets/images/devops-development.png": "a9e1507f201a6958578e92b57dd0a4b1",
"assets/assets/images/flutter-development.png": "30743483ba488faf40b2d5204d43f5e4",
"assets/assets/images/iwatch.png": "5f0b01a56de922d3902b89920d1dc36b",
"assets/assets/images/laravel-development.png": "1c0759ab7bea809e1c90de839907a924",
"assets/assets/images/mobile-app.png": "43e864543bef13050546ea9f83bd8478",
"assets/assets/images/ocs_logo.png": "ab48f0ef562d47c702fcd810ec93de30",
"assets/assets/images/react-js.png": "aa646bfd4c7f4fd449bb5b0d4c2a9e7d",
"assets/assets/images/sales-force.png": "34808508714bd37b9491db8c768f74c1",
"assets/assets/images/slide1-t1.png": "90e56a8f7b9802657ade35d335e5676a",
"assets/assets/images/slide1-t2.png": "fb12ad4efef2ad6f895a5b94fffacf49",
"assets/assets/images/slide1-t3.png": "145ee2a736d64c0414351f5545899f37",
"assets/assets/images/slide1-t4.png": "1460dc9c89b6043d89639685bf59c3c6",
"assets/assets/images/slide1a.png": "2a8779e9e992fc935317db1a0943aeb0",
"assets/assets/images/slide1b.png": "e2d97f90cbe3c2dfd3ba86b0494a7dea",
"assets/assets/images/slide1c.png": "dd21d46784579dd5440fbdd0b3ca38bc",
"assets/assets/images/slide1d.png": "4163eb3c36149a04c8034ed144921c3c",
"assets/assets/images/vue-js.png": "65f22e2bd93d8014e2d4cca5f32cb545",
"assets/assets/images/website-development.png": "b08d4bcf7782fdb3198606e7d3664a98",
"assets/FontManifest.json": "b597db1128abc9708f9249cd4d85f7ac",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "b55aa7ce7dae43957051747a24d55430",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "22504acdc707c6ca6007b9d0688065ad",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "ced9bb8e96c220ce3ae310202420cf2c",
"/": "ced9bb8e96c220ce3ae310202420cf2c",
"main.dart.js": "2f88ce13fa7c3bf70fed9a923ea1cc6e",
"manifest.json": "2fb9188af0bb263135877d3e3a776209",
"version.json": "9094aacdae789dccd67fa32109ff1a18"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
