const factorial = (n) => {
  let r = 1;
  for (let i = 0; i < n; i++) {
    r *= i + 1;
  }
  return r;
};

const permutation = (n, r) => {
  return factorial(n) / factorial(n - r);
};

const combination = (n, r) => {
  return factorial(n) / (factorial(n - r) * factorial(r));
};

const multiPermutation = (n, r) => {
  if (!r) return 1;
  const rem = r % 2;
  let res = multiPermutation(n, (r - rem) / 2);
  res = res * res;
  if (rem) res *= n;
  return res;
};

const multiCombination = (n, r) => {
  return combination(n + r - 1, r);
};

module.exports = {
  factorial,
  permutation,
  combination,
  multiCombination,
  multiPermutation,
};
