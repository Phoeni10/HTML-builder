/* eslint-disable linebreak-style */
const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('start', () => stdout.write('Hello! write your message here\n'));
emitter.emit('start');

fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

stdin.on('data', (data) => {
  if (data.toString().slice(0, 4) === 'exit') {
    stdout.write('Thanks. Good Bye!');
    process.exit(0);
  }

  fs.appendFile(path.join(__dirname, 'text.txt'), data, (err) => {
    if (err) throw err;
  });
});
process.on('SIGINT', () => {
  stdout.write('\nThanks. Good Bye!');

  process.exit(0);
});
