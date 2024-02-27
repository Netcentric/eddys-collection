export class ShadowDomComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.prepareShadowDom();
  }

  prepareShadowDom() {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.onload = () => {
      this.shadowRoot.append(...this.children);
      if (this.onComponentComplete) this.onComponentComplete(this);
    };
    const name = this.constructor.name.toLocaleLowerCase();
    css.href = import.meta.url.replaceAll(
      'libs/shadow-dom-component/shadow-dom-component.js',
      `blocks/${name}/${name}.shadow.css`,
    );
    this.shadowRoot.append(css);
  }
}
