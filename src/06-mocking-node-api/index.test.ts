import { join } from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();

    const timeout = 1000;

    doStuffByTimeout(cb, timeout);
    expect(setTimeout).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();

    const timeout = 1000;

    doStuffByTimeout(cb, timeout);
    jest.advanceTimersByTime(timeout);
    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();

    const interval = 1000;

    doStuffByInterval(cb, interval);
    expect(setInterval).toHaveBeenCalledWith(cb, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();

    const interval = 1000;

    doStuffByInterval(cb, interval);
    jest.advanceTimersByTime(interval * 3);
    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const path = 'some-test.txt';

  const fullPath = `path/${path}`;

  beforeEach(() => {
    (join as jest.Mock).mockReturnValue(fullPath);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(path);

    expect(join).toHaveBeenCalledWith(__dirname, path);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(path);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const text = 'text';

    (existsSync as jest.Mock).mockReturnValue(true);

    (readFile as jest.Mock).mockResolvedValue(Buffer.from(text));

    const data = await readFileAsynchronously(path);

    expect(data).toBe(text);
  });
});
