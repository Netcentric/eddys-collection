# Adobe Experience Manager - Edge Delivery Services - Extension Collection

[![Version](https://img.shields.io/npm/v/@netcentric/eddys-video.svg)](https://npmjs.org/package/@netcentric/eddys-video)
[![Build Status](https://github.com/netcentric/eddys-video/workflows/CI/badge.svg?branch=main)](https://github.com/netcentric/eddys-video/actions)
[![CodeQL Analysis](https://github.com/netcentric/eddys-video/workflows/CodeQL/badge.svg?branch=main)](https://github.com/netcentric/eddys-video/actions)
[![semver: semantic-release](https://img.shields.io/badge/semver-semantic--release-blue.svg)](https://github.com/semantic-release/semantic-release)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

This repository provides a set of extensions and documents best practises for projects based on the [AEM Boilderplate](https://github.com/adobe/aem-boilerplate).

The repository structure follows the [monorepo](https://en.wikipedia.org/wiki/Monorepo) approach, meaning it contains multiple sub-modules. All of those sub-modules aim to be usable standalone. Using them in your project should be a "choose and cherry-pick" rather than an all or nothing.

For demo purposes most of the modules are installed on https://github.com/netcentric/genom.

## Installation

As mentioned above each sub-module can be installed standalone but there is also a wrapper module to install all at once. Installation follows always the same approach documented in [TODO](TODO):

In your own AEM project repository directory run

`npm i @netcentric/eddys-<module>`

The dependency will be downloaded and depending on its install script typically create a `/libs` folder containing all the necessary scripts to use it. Some modules have some additional instructions about manuel integration steps. For these please refer to the documentation of the individual modules.

## Modules

- [WebComponents / CustomElements](https://github.com/Netcentric/eddys-collection/tree/main/packages/scripts/eddys-custom-element)
- [SPA Router](TODO)
- [Blocks](https://github.com/Netcentric/eddys-collection/tree/main/packages/blocks)
  - [Advanced Forms](TODO)

## Best Practises & Examples

- [Dependency installation and updates](TODO)
- [Extendable Blocks](TODO)
- [SPA integration](TODO)
- [Closed User Groups and Permissions](https://github.com/Netcentric/envelop) (separate repository)

## Contribution

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

