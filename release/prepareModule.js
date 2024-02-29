const fs = require('fs/promises');
const { readdirSync, statSync } = require('fs');
const { join } = require('path');

const getDirectories = (srcPath, baseDir) => {
  const dir = join(srcPath, baseDir);
  return readdirSync(dir).map(file => join(dir, file)).filter((filePath) => statSync(filePath).isDirectory())
}

//returns the abs path of all packages
function getPackagesPaths() {
  const root = join(__dirname, '..', 'packages');
  const groups = ['blocks', 'scripts'].map((p) => getDirectories(root, p));
  return groups.flat();
}

const copyTemplates = async (modulePath) => {
  const templates = join(__dirname, 'templates', '/');
  return fs.cp(templates, modulePath, { recursive: true });
}

const copyLicense = async (modulePath) => {
  const fileName = 'LICENSE';
  const srcFile = join(__dirname, '..', fileName);
  const destFile = join(modulePath, fileName)
  return fs.copyFile(srcFile, destFile);
}

const prepareModules = async () => {
  const changedModules = getPackagesPaths();
  for (const modulePath of changedModules) {
    await copyTemplates(modulePath);
    await copyLicense(modulePath);
  }
  return changedModules;
};

console.log('copyTemplates start');
(async () => {
  const changedModules = await prepareModules();
  console.log('changedModules start');
  for (const modulePath of changedModules) {
    await copyTemplates(modulePath);
    console.log('copyTemplates done');
  }
})();
