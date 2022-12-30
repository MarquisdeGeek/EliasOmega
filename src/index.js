const bijection = require('./core/bijection');
const error = require('./core/error');
const encodeMethod = require('./core/encode');
const decodeMethod = require('./core/decode');


class EliasOmega {
  static biPositiveOnly = 0;
  static biNonNegativeOnly = 1;
  static biAllIntegers = 2;

  #bijectionMethod;

  constructor(bijectionType = EliasOmega.biPositiveOnly) {
    switch (bijectionType) {
      case EliasOmega.biPositiveOnly:
        this.#bijectionMethod = new bijection.PositiveOnly();
        break;

      case EliasOmega.biNonNegativeOnly:
        this.#bijectionMethod = new bijection.NonNegativeOnly();
        break;

      case EliasOmega.biAllIntegers:
        this.#bijectionMethod = new bijection.AllIntegers();
        break;

      default:
        throw new error.EliasInvalidBijection(bijectionType);
    }
  }

  encode(n) {
    const adjusted = this.#bijectionMethod.encode(n);
    return encodeMethod(adjusted);
  }

  decode(n) {
    const decoded = decodeMethod(n);
    const adjusted = this.#bijectionMethod.decode(decoded.result);
    return {
    	result: adjusted,
    	size:   decoded.size
    };
  }

  isInputValid(n) {
    return this.#bijectionMethod.isInputValid(n);
  }
}


module.exports = EliasOmega;
