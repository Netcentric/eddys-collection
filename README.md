# Netcentric Block Collection

[![Version](https://img.shields.io/npm/v/@netcentric/eddys-video.svg)](https://npmjs.org/package/@netcentric/eddys-video)
[![Build Status](https://github.com/netcentric/eddys-video/workflows/CI/badge.svg?branch=main)](https://github.com/netcentric/eddys-video/actions)
[![CodeQL Analysis](https://github.com/netcentric/eddys-video/workflows/CodeQL/badge.svg?branch=main)](https://github.com/netcentric/eddys-video/actions)
[![semver: semantic-release](https://img.shields.io/badge/semver-semantic--release-blue.svg)](https://github.com/semantic-release/semantic-release)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Custom and extendable block collection 

## Installation

In the Edge delivery project folder run

`npm i @netcentric/eddys-block-collection` //TODO change name to the correct package/repo

it will download it as a dependency and create a `/libs` folder with all th e blocks to reference.

## Usage

in your `/blocks` folder create a new block with a css and a js file (the name can be the same or different that the block you want to use)

### There Are 2 ways to use a block from the Block Collection

#### Option 1 - Use an already existing block with no possibility to extend the js or use a custom block developed using a js class Not extending the js class

```javascript
import defaultDecorate from '/libs/blocks/<original-block-name>/<original-block-name>.js';

export default async function decorate(block) {
    // Custom decoration can be done here
  await defaultDecorate(block);
}
```

#### Option 2 - Use a custom block developed using a js class extending the js class

```javascript
import { defaultDecorate, OriginalBlockName } from '/libs/blocks/<original-block-name>/<original-block-name>.js';

class BlockName extends OriginalBlockName {
  constructor(block) {
    super(block);
  }
    // Code here
}

export default async function decorate(block) {
  await defaultDecorate(block, BlockName); // Note that you need to pass the extended class to the defaultDeaorate
}
```

### Issue template
  - .github/ISSUE_TEMPLATE.md

### PR template
  - .github/PULL_REQUEST_TEMPLATE.md --> automatically closes connected issue

### Workflows
  - CI --> npm ci, test and build
  - CodeQL --> Perform CodeQL Analysis (Security, etc.)
  - Release --> semantic-release:
    * Creates release notes
    * Updates CHANGELOG
    * Updates package.json version
    * Creates Git tag/release
    * Publish package to NPM
  - Manual Release --> same as Release, but can be triggered manually in Actions tab

### Release
  - based on Angular Commit Message Conventions in commits -
    https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit-message-header
  - Commit message format is used to build:
    * Release notes
    * Changelog updates
    * NPM package semver

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

