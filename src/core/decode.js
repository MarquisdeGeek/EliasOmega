const utils = require('./utils');
const error = require('./error');

function decode(encodedValue) {
  if (typeof encodedValue === typeof "") {
    let n = 1;
    let index = 0;
    while (true) {
      let nextBit = encodedValue.substr(index++, 1);

      if (nextBit === ' ') {
        // Allow spaces in the numbers, between sections, since that format is
        // easier for humans to digest.
        continue;
      } else if (nextBit === '0') {
        return {
          result: n,
          size: index
        };

      } else if (nextBit !== '1') {
        throw new error.EliasInvalidDecodeDigit(nextBit);
      }
      //
      let nextEncode = 1; // since the first bit must be 1 to reach here
      for (let i = 0; i < n; ++i, ++index) {
        nextEncode <<= 1;
        if (encodedValue.substr(index, 1) == '1') {
          nextEncode += 1;
        }
      }
      //
      n = nextEncode;
    }
  }

  throw new error.EliasInvalidDecodeType(typeof encodedValue);
}


module.exports = decode;
