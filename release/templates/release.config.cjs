const pkg = require('./package.json');

const pkgTag = pkg.name.replace('@', '').replace('/', '-');
const dryRun = !!process.env.DRY_RUN;
const forceVersion = process.env.FORCE_VERSION;

console.log('[RELEASE CONFIG]: ', { pkgTag, dryRun, forceVersion });

const baseConfig = {
  tagFormat: `${pkgTag}-v\${version}`,
  dryRun,
  branches: ['main']
};

const basePlugins = [
  [
    "@semantic-release/changelog",
    {
      "changelogFile": "docs/CHANGELOG.md"
    }
  ],
  "@semantic-release/npm",
  [
    "@semantic-release/git",
    {
      "assets": ["docs/CHANGELOG.md", "package.json"]
    }
  ]
];
let plugins = [
  "@semantic-release/commit-analyzer",
  "@semantic-release/release-notes-generator",
];

if (forceVersion) {
  plugins = ['manual-release.js'];
} else {
  baseConfig.extends = 'semantic-release-monorepo';
}

module.exports = {
  ...baseConfig,
  plugins: [
    ...plugins,
    ...basePlugins
  ]
}
