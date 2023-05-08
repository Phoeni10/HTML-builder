/* eslint-disable linebreak-style */
const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, './project-dist'), { recursive: true }, () => {});
