const componentName = 'example-component';
export class ExampleComponent {
  constructor(block) {
    console.log('this is the example component', block);
  }
}

export async function defaultDecorate(block, ClassObj) {
  block.classList.add(componentName);
  const elements = Array.from(block.children);

  elements.forEach( element => {
    element.classList.add('example-component-element');
  })

  const exampleComponent = ClassObj ? new ClassObj: new ExampleComponent(block);
}
