# eddys-router
SPA Style router with soft naviagtion betweeen pages

## Description
This is a simple router that uses the `fetch` API to load content from the server and update just the `<main>` tag. 
It also uses the `history` API to update the URL and listen for changes to the URL.

Excluded paths can be configured in the router.js file to prevent the router from loading content for certain paths. This is useful for paths that should be loaded in the traditional way, (for example, a page that contains a react app using react-router)

If other components need to be updated when the URL changes (for example the navigation), they can listen for the `router:navgate` event on the `window` object. (see `listenToNavigationeEvents()` in `header.js` for an example)

## How to use
1. Install the router.js to your repository

```bash
npm i @netcentric/eddys-router
```

2. Load the router script in your head.html file

```html
  <script src="/lib/router.js" type="module"></script>
```

3. Configure the excluded paths 

```javascript
  window.routerExcludedPaths = [
    '/content/excluded-path',
    '/content/excluded-path-2'
  ];
```

4. If needed listen for the `router:navgate` event in other components

```javascript
  window.addEventListener('router:navgate', (event) => {
    // do something with the event
  });
```

## Demo Links

- Preview: https://main--eddys-router--nfarmache-nc.hlx.page/
- Live: https://main--eddys-router--nfarmache-nc.hlx.live/
