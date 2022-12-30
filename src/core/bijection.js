const error = require('./error');

class bijection {

}

class bijectionPositiveOnly extends bijection {
  // Numbers returned as-is. Rely on developer to ensure their range is
  // 1, or above.

  isInputValid(n) {
    return (n > 0) ? true : false;
  }

  encode(n) {
    if (!this.isInputValid(n)) {
      throw new error.EliasInvalidNumber(n);
    }
    return n;
  }

  decode(n) {
    if (n < 1) {
      throw new error.EliasInvalidNumber(n);
    }
    return n;
  }
}


class bijectionNonNegativeOnly extends bijection {
  // Move the range from 0-N, to 1-N

  isInputValid(n) {
    return (n >= 0) ? true : false;
  }

  encode(n) {
    if (!this.isInputValid(n)) {
      throw new error.EliasInvalidNumber(n);
    }
    return n + 1;
  }

  decode(n) {
    if (n < 1) {
      throw new error.EliasInvalidNumber(n);
    }
    return n - 1;
  }
}

class bijectionAllIntegers extends bijection {
  // Use the mapping of
  //   (0, 1, -1, 2, -2, 3, -3, ...) 
  //   (1, 2, 3, 4, 5, 6, 7, ...) 
  isInputValid(n) {
    return true ;
  }

  encode(n) {
    if (n > 0) {
      return n * 2;
    }
    // for -v2 and 0
    return -n * 2 + 1;
  }

  decode(n) {
    if (n < 1) {
      throw new error.EliasInvalidNumber(n);
    } else if (n === 1) {
      return 0;
    } else if (n % 2) { // remainder of 1 means odd
      return -(n - 1) / 2
    }
    // Evens
    return n / 2;
  }
}


module.exports = {
  PositiveOnly:    bijectionPositiveOnly,
  NonNegativeOnly: bijectionNonNegativeOnly,
  AllIntegers:     bijectionAllIntegers
}
