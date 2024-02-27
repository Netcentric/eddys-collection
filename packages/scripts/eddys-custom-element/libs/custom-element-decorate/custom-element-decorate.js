function setupElement(elementName, block) {
  const element = document.createElement(elementName);
  element.uuid = `gen${crypto.randomUUID().split('-')[0]}`;
  element.onComponentComplete = block.onComponentComplete;
  element.append(...block.children);
  element.classList.add(...Array.from(block.classList));
  block.replaceWith(element);
  return block;
}

export default function customElementsDecorate(elementName, contructor) {
  return async function decorate(block) {
    return new Promise((resolve) => {
      block.onComponentComplete = (el) => {
        resolve(el);
      };
      if (customElements.get(elementName)) {
        const el = setupElement(elementName, block);
      } else {
        customElements.define(elementName, contructor);
        if (!window.eddysComponents) window.eddysComponents = {};
        window.eddysComponents[elementName] = contructor;
        const el = setupElement(elementName, block);
      }
    });
  };
}
