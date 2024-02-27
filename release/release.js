const semanticRelease = require("semantic-release");

const release = async (cwd) => {
  try {
    const result = await semanticRelease({}, {
      cwd,
    });
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  release
}
