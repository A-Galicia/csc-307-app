import mut from './module.js'; // MUT = Module Under Test

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
  expect(mut.sum(1, 2)).toBe(3);
  expect(mut.sum(-1, 5)).toBe(4);
  expect(mut.sum(" ", 5)).toBe(5);
  expect(mut.sum(null, null)).toBe(0);
  expect(mut.sum(Infinity, 1)).toBe(Infinity);
});

test('Testing div -- success', () => {
  expect(mut.div(10, 2)).toBe(5);
  expect(mut.div(10, 0)).toBe(Infinity);
  expect(mut.div(0, Infinity)).toBe(0);
  expect(mut.div(null, null)).toBe(0);
});

test('Testing containsNumbers -- success', () => {
  expect(mut.containsNumbers('abc1def')).toBe(true);
  expect(mut.containsNumbers('hello')).toBe(false);
  expect(mut.containsNumbers('   ')).toBe(false);
  expect(mut.containsNumbers(null)).toBe(false);
});
