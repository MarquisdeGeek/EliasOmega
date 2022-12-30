const utils = require('./utils');

function encode(n, withPadding = false) {
  let code = "0";

  while (n !== 1) {
    let prepend = utils.asBinary(n);
    n = prepend.length - 1;
    if (withPadding) {
      prepend += " ";
    }
    code = prepend + code;
  }

  return code;
}

module.exports = encode;
