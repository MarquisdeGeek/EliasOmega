const EliasOmega = require('../src/index');

// By default, the basic Elias Omega method only handles the numbers 1+
// We use this default to minimize the surprise to those that already understand
// the encoding method. Instead, we provide this example to cover all integers
// to avoid confusion in the unwary.
const elias = new EliasOmega(EliasOmega.biAllIntegers);

[-10, -1, 0, 1, 10, 100].forEach((v) => {
  console.log(`${v} => ${elias.encode(v)}`);
});
