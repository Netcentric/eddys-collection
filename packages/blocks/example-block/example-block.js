const componentName = 'example-block'; // Change the string according to your block name (kebab case)
export class ExampleBlock { // Change the Class name according to your block name
  constructor(block) {
    this.block = block;
  }

  // Your code here
}

export async function defaultDecorate(block, ClassObj) {
  block.classList.add(componentName);

  // Your decoration code here

  // eslint-disable-next-line no-unused-vars
  const exampleBlock = ClassObj ? new ClassObj(block) : new ExampleBlock(block); // Change "ExampleBlock" according to the class name
}
