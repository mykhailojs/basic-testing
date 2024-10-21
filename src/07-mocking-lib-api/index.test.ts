import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockedAxios.create.mockReturnValue({
      get: mockedAxios.get,
    } as any);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.resetAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/posts');
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const responseData = { data: 'test data' };
    mockedAxios.get.mockResolvedValue(responseData);

    const result = await throttledGetDataFromApi('/posts');
    expect(mockedAxios.get).toHaveBeenCalledWith('/posts');
    expect(result).toBe(responseData.data);
  });

  test('should return response data', async () => {
    const responseData = { data: 'test data' };
    mockedAxios.get.mockResolvedValue(responseData);

    const result = await throttledGetDataFromApi('/posts');
    expect(result).toBe(responseData.data);
  });

  test('should throttle requests', async () => {
    const responseData = { data: 'test data' };
    mockedAxios.get.mockResolvedValue(responseData);

    throttledGetDataFromApi('/posts');
    throttledGetDataFromApi('/posts');
    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});
