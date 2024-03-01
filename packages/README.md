# Eddys Collection Packages

## Dependency Installation and Updates
We use NPM to handle the blocks and script dependencies.

Each package has a script `install.js` automatically injected in the release of the package process.

When the package is installed in a project, using `npm i @netcentric/eddys-<module-name>`, or the dependencies are upgraded using `npm upgrade`, this script is executed in the `postinstall` scripts.

The `install.js` script copies all what is in the package `/libs` folder and searches in our Edge delivery project for a `/libs` folder, if it doesn't exist it creates it and includes all the content copied from the package, if it does exist it includes the content, it updates it if it was already there.

The project packages can be controlled through the project `package.json` file, and the project `/libs` folder can be upgraded just using `npm upgrade` command.
