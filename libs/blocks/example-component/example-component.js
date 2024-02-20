export class ExampleComponent {
  constructor(block) {
    console.log('this is the example component', block);
  }
}

export async function defaultDecorate(block) {
  const elements = Array.from(block.children);

  elements.forEach( element => {
    element.classList.add('example-component-element');
  })

  const exampleComponent = new ExampleComponent(block);
}
