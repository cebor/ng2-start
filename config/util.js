const path = require('path');

const _root = path.resolve(__dirname, '..');

function root() {
  var args = Array.prototype.slice.call(arguments);
  return path.join.apply(path, [_root].concat(args));
}

exports.root = root;
