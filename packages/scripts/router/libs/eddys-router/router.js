import { decorateMain } from '../scripts/scripts.js';
import { loadBlocks, decorateTemplateAndTheme } from '../scripts/aem.js';

function isPathExcluded(path) {
  return ((window.router || {}).excludedPaths || []).some((excludedPath) => (
    path === excludedPath
    || path.startsWith(`${excludedPath}/`)
  ));
}

function emitNavigateEvent() {
  window.dispatchEvent(
    new CustomEvent('router:navgate', {
      bubbles: true,
    }),
  );
}

async function render(html) {
  const main = document.querySelector('body>main');
  const head = document.querySelector('html>head');
  const newDocument = new DOMParser().parseFromString(html, 'text/html');
  const newHead = newDocument.querySelector('html>head');

  // replace meta tags
  [...head.querySelectorAll('meta')].forEach((tag) => tag.remove());
  const metaHtml = [...newHead.querySelectorAll('meta')].map((meta) => (meta).outerHTML).join('\n');
  head.querySelector('title').insertAdjacentHTML('afterend', metaHtml);

  // replace title
  document.title = newDocument.title;

  // replace main
  main.innerHTML = newDocument.querySelector('body>main').innerHTML;
  main.classList.add('hidden');
  document.body.className = 'appear';
  decorateTemplateAndTheme();
  decorateMain(main);
  await loadBlocks(main);
  main.classList.remove('hidden');
  emitNavigateEvent();
}

async function navigate(path, shouldPushState = true) {
  fetch(path)
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (!response.ok || !contentType || !contentType.includes('text/html')) {
        window.location.href = path;
      }

      return response.text();
    })
    .then(async (html) => {
      if (shouldPushState) {
        window.history.pushState({}, '', path);
      }

      await render(html);
    });
}

function checkUrl(href, force = false) {
  const url = new URL(href, document.location.href);
  const path = `${url.pathname}${url.search}${url.hash}`;
  const simplePath = url.pathname;

  if (force) {
    return { path, shouldFetchPage: true };
  }

  // check origin
  if (url.origin !== document.location.origin) {
    return { shouldFetchPage: false };
  }

  // check if it's the same page
  if (simplePath === document.location.pathname) {
    return { shouldFetchPage: false };
  }

  // check excluded paths
  if (isPathExcluded(simplePath)) {
    return { shouldFetchPage: false };
  }

  // ok
  return { path, shouldFetchPage: true };
}

const clickHandler = (event) => {
  const { target } = event;
  if (target.tagName !== 'A' || typeof target.href === 'undefined') return;
  const { shouldFetchPage, path } = checkUrl(target.href);
  if (!shouldFetchPage) return;

  event.preventDefault();
  navigate(path);
};

const popstateHandler = () => {
  const { path } = checkUrl(document.location.href, true);
  navigate(path, false);
};

function router() {
  if (isPathExcluded(document.location.pathname)) {
    return;
  }

  document.addEventListener('click', clickHandler);
  window.addEventListener('popstate', popstateHandler);
}

router();
