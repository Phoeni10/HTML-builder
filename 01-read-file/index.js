/* eslint-disable linebreak-style */
const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

let data = '';
// eslint-disable-next-line no-return-assign
readStream.on('data', (chunk) => data += chunk);
readStream.on('end', () => stdout.write(data));
