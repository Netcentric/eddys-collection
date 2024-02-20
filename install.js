const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');
const filePath = path.join(packageJson.main);

function mkFullPathSync(absolutePath, permissions = '0755') {
  absolutePath.split(path.sep).reduce((origin, folder) => {
    const next = `${origin}${folder}${path.sep}`;
    if (!fs.existsSync(next)) fs.mkdirSync(next, permissions);
    return next;
  }, '');
}

mkFullPathSync(`../../${filePath}`);

fs.cp(filePath, `../../${filePath}`, { recursive: true }, (err) => {
  if (err) fs.writeFileSync(`error.txt`, err, 'utf8');
  fs.writeFileSync(`done.txt`, `${filePath} => ../../${filePath}`, 'utf8');
});
