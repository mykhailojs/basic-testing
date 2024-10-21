import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 12, b: 3, action: Action.Divide, expected: 4 },
  { a: 8, b: 3, action: Action.Subtract, expected: 5 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: '12', b: 3, action: Action.Add, expected: null },
  { a: 2, b: '311', action: Action.Add, expected: null },
  { a: 2, b: 333, action: 'invalid', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'given $a, $b and $action, returns $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
