/* eslint-disable linebreak-style */
const fs = require('fs/promises');
const path = require('path');

const obj = fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true });

obj.then((files) => files.forEach((file) => {
  if (file.isFile()) {
    const pathToFile = path.join(__dirname, 'secret-folder', file.name);
    const baseName = path.basename(pathToFile);
    const extName = path.extname(pathToFile);
    const stats = fs.stat(pathToFile);

    stats.then((stat) => {
      const { size } = stat;
      const name = baseName.slice(0, baseName.indexOf('.'));
      const ext = extName.slice(extName.indexOf('.') + 1);
      console.log(`${name} - ${ext} - ${size / 1024}kb`);
    });
  }
}));
