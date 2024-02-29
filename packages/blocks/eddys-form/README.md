# Eddys Form

Form Block enhacement for Edge Delivery Services

## Installation

Having a forked project from https://github.com/adobe/aem-boilerplate

You can use by just

`npm i @netcentric/eddys-form`

it will install the scripts at the root of your Edge delivery project under `libs/eddys-form`

## Usage

in your `/blocks` folder create a new block with a css and a js file

### JS file: There Are 2 ways you can use this plugin

#### Option 1 
Use `eddys-form` block as it is with no possibility to extend the js

You need to import the defaultDecorate function from `libs/eddys-form`.
And export the async function decorate to get your code executed when the block is in place.

```javascript
import defaultDecorate from '/libs/eddys-form/eddys-form.js';

export default async function decorate(block) {
    // Custom decoration can be done here
  await defaultDecorate(block);
}
```

#### Option 2
Use a custom block developed using a js class extending the js class

You need to import the `defaultDecorate` method and `EddysForm` class from the `libs/eddys-form` folder.
And export the async function decorate to get your code executed when the block is in place.
If you are extending the class you need to pass the extended class as a param in the defaultDecorate function

```javascript
import { defaultDecorate, EddysForm } from '/libs/eddys-form/eddys-form.js';

class BlockName extends EddysForm {
  constructor(block) {
    super(block);
  }
    // Code here
}

export default async function decorate(block) {
  // Custom decoration can be done here
  await defaultDecorate(block, BlockName); // Note that you need to pass the extended class to the defaultDeaorate
}
```

### CSS file:
You need to import the CSS file from the `libs/eddys-form` block you want to use.
And then you can add as much extra CSS you want.

```css
@import "/libs/eddys-form/eddys-form.css";

/* you can add custom css here */ 
```


### Release

- based on Angular Commit Message Conventions in commits -
  https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit-message-header
- Commit message format is used to build:
  - Release notes
  - Changelog updates
  - NPM package semver

### Commit message Convention

```
<type>(<scope>): <short summary>
│       │             │
│       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
│       │
│       └─⫸ Commit Scope (optional): project|based|list
│
└─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```
