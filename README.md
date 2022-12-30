# EliasOmega
A node module to encode/decode arbitrary length binary strings, using the EliasOmega method

## Background

To quote Wikipedia:

"Elias ω coding or Elias omega coding is a universal code encoding the positive integers developed by Peter Elias. Like Elias gamma coding and Elias delta coding, it works by prefixing the positive integer with a representation of its order of magnitude in a universal code. Unlike those other two codes, however, Elias omega recursively encodes that prefix; thus, they are sometimes known as recursive Elias codes.

Omega coding is used in applications where the largest encoded value is not known ahead of time, or to compress data in which small values are much more frequent than large values."

Source:
https://en.wikipedia.org/wiki/Elias_omega_coding


## Usage

From examples/ex1.js

```
const EliasOmega = require('../src/index');

// By default, the basic Elias Omega method only handles the numbers 1+
// We use this default to minimize the surprise to those that already understand
// the encoding method. Instead, we provide this example to cover all integers
// to avoid confusion in the unwary.
const elias = new EliasOmega(EliasOmega.biAllIntegers);

[-10, -1, 0, 1, 10, 100].forEach((v) => {
  console.log(`${v} => ${elias.encode(v)}`);
});

```

Or, if using this as a module, simply:

```
const EliasOmega = require('eliasomega');
```

