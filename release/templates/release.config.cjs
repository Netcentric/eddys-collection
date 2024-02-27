const pkg = require('./package.json');

const pkgTag = pkg.name.replace('@', '').replace('/', '-');

module.exports = {
  extends: "semantic-release-monorepo",
  tagFormat: `${pkgTag}-v\${version}`,
  dryRun: true,
  "branches": ["monorepo"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
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
  ]
}
