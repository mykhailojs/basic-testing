// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const listStructure = {
      value: 5,
      next: {
        value: 1,
        next: {
          value: 13,
          next: {
            value: 22,
            next: {
              value: null,
              next: null,
            },
          },
        },
      },
    };
    const arr = [1, 2, 3];

    const result = generateLinkedList(arr);
    expect(result).toStrictEqual(listStructure);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const arr = [1, 2, 3];
    const data = generateLinkedList(arr);
    expect(data).toMatchSnapshot();
  });
});
