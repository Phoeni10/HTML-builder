/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable linebreak-style */
const fs = require('fs');
const promises = require('fs/promises');
const path = require('path');

function copyDir() {
  promises.readdir(path.join(__dirname, './files-copy'), { withFileTypes: true }).then((files) => files.forEach((file) => {
    fs.unlink(path.join(__dirname, './files-copy', file.name), () => {});
  }), () => {});
  fs.rmdir(path.join(__dirname, './files-copy'), () => {});
  promises.readdir(path.join(__dirname, './files'), { withFileTypes: true }).then((files) => files.forEach((file) => {
    if (file.isFile()) {
      const pathToOrigFile = path.join(__dirname, './files', file.name);
      const pathToCopyDir = path.join(__dirname, './files-copy');
      const pathToCopyFile = path.join(pathToCopyDir, file.name);
      promises.mkdir(pathToCopyDir, { recursive: true }).then(() => {
        const readableStream = fs.createReadStream(pathToOrigFile, 'utf8');
        const writeableStream = fs.createWriteStream(pathToCopyFile, 'utf8');

        readableStream.on('data', () => {
	        writeableStream.write('data', 'utf8');
        });
      });
    }
  }));
}

copyDir();
