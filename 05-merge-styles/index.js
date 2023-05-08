/* eslint-disable linebreak-style */
const fs = require('fs');
const path = require('path');
const promises = require('fs/promises');

const pathToOrigFile = path.join(__dirname, './styles');
const pathToBundleFile = path.join(__dirname, './project-dist', 'bundle.css');
const writableStream = fs.createWriteStream(pathToBundleFile, 'utf-8');
const bundle = [];
fs.unlink(pathToBundleFile, () => {
  promises.readdir(pathToOrigFile, { withFileTypes: true })
    .then((files) => files.forEach((file) => {
      const pathNew = path.join(pathToOrigFile, './', file.name);
      if (file.name.slice(-3) === 'css') {
        const readableStream = fs.createReadStream(pathNew, 'utf-8');
        readableStream.on('data', (styles) => {
          bundle.push(styles);
        });
        readableStream.on('end', () => {
          writableStream.write(bundle.flat().join('\n'), 'utf-8');
        });
      }
    }));
});
