const { getChangedModules } = require('./getChangedPackages');
const fs = require('fs/promises');
// const { release } = require('./release');

const copyTemplates = async (modulePath) => {
  return fs.cp('./templates/', modulePath, { recursive: true });
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
