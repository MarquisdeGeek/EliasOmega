const expect = require("chai").expect;

const EliasOmega = require('../src/index');
const bijection = require('../src/core/bijection');
const utils = require('../src/core/utils');

const examples = [
  { v: 1, r: "0" },
  { v: 2, r: "100" },
  { v: 3, r: "110" },
  { v: 4, r: "101000" },
  { v: 8, r: "1110000" },
  { v: 16, r: "10100100000" },
];

describe("Bijection tests", function() {
  it("PositiveOnly", function() {
    let bi = new bijection.PositiveOnly();
    expect(bi.encode(1)).to.equal(1);
    expect(bi.encode(10)).to.equal(10);
    expect(() => {
      bi.encode(0)
    }).to.throw();
    expect(() => {
      bi.encode(-1)
    }).to.throw();
  });

  it("NonNegativeOnly", function() {
    let bi = new bijection.NonNegativeOnly();
    expect(bi.encode(0)).to.equal(1);
    expect(bi.encode(1)).to.equal(2);
    expect(() => {
      bi.encode(-1)
    }).to.throw();
  });


  it("AllIntegers", function() {
    let bi = new bijection.AllIntegers();
    expect(bi.encode(0)).to.equal(1);
    expect(bi.encode(1)).to.equal(2);
    expect(bi.encode(-1)).to.equal(3);
  });
});

describe("Encoding tests", function() {
  it("Invalid bijections fail", function() {
    expect(() => {
      new EliasOmega(4);
    }).to.throw();
  });

  it("Invalid (i.e. non-binary) characters", function() {
    expect(() => {
      const elias = new EliasOmega();
      elias.decode("2")
    }).to.throw();
  });

  it("Known examples", function() {
    const elias = new EliasOmega();

    examples.forEach((ex) => {
      const encoded = elias.encode(ex.v);
      expect(encoded).to.equal(ex.r);
    })
  });
});

describe("Decoding tests", function() {

  it("Known examples", function() {
    const elias = new EliasOmega();

    examples.forEach((ex) => {
      const decoded = elias.decode(ex.r);
      expect(decoded.result).to.equal(ex.v);
      expect(decoded.size).to.equal(ex.r.length);
    })
  });

  it("Bad types", function() {
    const elias = new EliasOmega();
    expect(() => {
      const elias = new EliasOmega();
      elias.decode(2)
    }).to.throw();
    expect(() => {
      const elias = new EliasOmega();
      elias.decode({})
    }).to.throw();
  });
});

describe("Encode-decode pairing", function() {
  const from = -100;
  const until = 100;

  // This is a bit of fun, since nothing precludes an error at until+1
  [EliasOmega.biPositiveOnly, EliasOmega.biNonNegativeOnly, EliasOmega.biAllIntegers].forEach((type) => {
    it(`Bijection type ${type} : A dull iteration test, ${from}-${until}`, function() {
      const elias = new EliasOmega(type);
      for (let i = from; i < until; ++i) {
        if (elias.isInputValid(i)) {
          const encoded = elias.encode(i);
          const decoded = elias.decode(encoded);
          expect(decoded.result).to.equal(i);
        }
      }
    });
  });
});
