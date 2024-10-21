// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const calculator = simpleCalculator({ a: 2, b: 2, action: Action.Add });
    expect(calculator).toBe(4);
  });

  test('should subtract two numbers', () => {
    const calculator = simpleCalculator({
      a: 3,
      b: 2,
      action: Action.Subtract,
    });
    expect(calculator).toBe(1);
  });

  test('should multiply two numbers', () => {
    const calculator = simpleCalculator({
      a: 4,
      b: 2,
      action: Action.Multiply,
    });
    expect(calculator).toBe(8);
  });

  test('should divide two numbers', () => {
    const calculator = simpleCalculator({ a: 4, b: 2, action: Action.Divide });
    expect(calculator).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const calculator = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(calculator).toBe(8);
  });

  test('should return null for invalid action', () => {
    const calculator = simpleCalculator({ a: 2, b: 3, action: 'invalid' });
    expect(calculator).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const calculator = simpleCalculator({ a: '2', b: 3, action: Action.Add });
    expect(calculator).toBeNull();
  });
});
