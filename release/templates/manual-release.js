const analyzeCommits = (pluginConfig, context) => {
  return context.env.FORCE_VERSION;
};

const generateNotes = (pluginConfig, context) => {
  return '### Forced Manual release without code changes';
};

module.exports = {
  analyzeCommits,
  generateNotes
}
