const { getChangedModules } = require('./getChangedPackages');
const fs = require('fs/promises');
const { join } = require('path');

const copyTemplates = async (modulePath) => {
  const templates = join(__dirname, 'templates', '/');
  return fs.cp(templates, modulePath, { recursive: true });
}

const prepareModules = async () => {
  const changedModules = await getChangedModules();
  for (const modulePath of changedModules) {
    await copyTemplates(modulePath);
  }
  return changedModules;
};

(async () => {
  const changedModules = await prepareModules();
  for (const modulePath of changedModules) {
    await copyTemplates(modulePath);
    console.log('copyTemplates done');
  }
})();
