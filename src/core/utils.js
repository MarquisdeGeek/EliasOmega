function asInteger(n) {
  return parseInt(n, 2);
}

function asBinary(n) {
  return n.toString(2);
}


module.exports = {
  asInteger,
  asBinary
};
