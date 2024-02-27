module.exports = {
  extends: "semantic-release-monorepo",
  dryRun: true,
  "branches": ["monorepo"],
  "tagFormat": "v${version}",
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
