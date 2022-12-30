class EliasInvalidBijection extends Error {
  constructor(type) {
    super(`You can use the bijection type of ${type}`);
  }
}

class EliasInvalidNumber extends Error {
  constructor(v) {
    super(`The number '${v}' is not valid in EliasOmega. Try an alternate bijection function`);
  }
}

class EliasInvalidDecodeDigit extends Error {
  constructor(chr) {
    super(`Can not decode the character '${chr}' as only 0's and 1's are permitted`);
  }
}

class EliasInvalidDecodeType extends Error {
  constructor(typeGiven) {
    super(`Can only decode strings, and not '${typeGiven}'`);
  }
}


module.exports = {
  EliasInvalidBijection,
  EliasInvalidNumber,
  EliasInvalidDecodeDigit,
  EliasInvalidDecodeType,
};
