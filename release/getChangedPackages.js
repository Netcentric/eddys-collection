const fs = require('fs');
const { join, resolve } = require('path');
const { runProcess } = require('./runProcess');

const getDirectories = (srcPath, baseDir) => {
  const dir = resolve(srcPath, baseDir);
  return fs.readdirSync(dir).map(file => join(dir, file)).filter((filePath) => fs.statSync(filePath).isDirectory())
}
//returns the abs path of all packages
function getPackagesPaths() {
  const root = '../packages';
  const groups = ['blocks', 'scripts'].map((p) => getDirectories(root, p));
  return groups.flat();
}

async function getChangedModules() {
  const modulePaths = getPackagesPaths();
  const changedModules = [];

  for (let modulePath of modulePaths) {
    const args = ['diff', '--quiet', 'HEAD^', '--', `${modulePath}`];
    const { code } = await runProcess('git', args);
    // skips if module was unchanged
    if (code === 0) continue;
    changedModules.push(modulePath);
  }

  return changedModules;
}

module.exports = {
  getChangedModules
}

