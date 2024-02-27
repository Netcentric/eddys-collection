const path = require('path');
const pkg = require('./package.json');

const root = path.join(__dirname, '..', '..', '..');
const releaseConfig = path.join(root, 'release', 'release.config.cjs');
const pkgTag = pkg.name.replace('@', '').replace('/', '-');

module.exports = {
  extends: releaseConfig,
  tagFormat: `${pkgTag}-v\${version}`
}
