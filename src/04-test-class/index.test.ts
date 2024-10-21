// Uncomment the code below and write your tests

import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const acc = getBankAccount(30);
    expect(acc.getBalance()).toBe(30);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(30);
    expect(() => acc.withdraw(88)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const firstAcc = getBankAccount(33);
    const secondAcc = getBankAccount(80);
    expect(() => firstAcc.transfer(80, secondAcc)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(20);
    expect(() => acc.transfer(50, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = getBankAccount(80);
    acc.deposit(20);
    expect(acc.getBalance()).toBe(100);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(80);
    acc.withdraw(50);
    expect(acc.getBalance()).toBe(30);
  });

  test('should transfer money', () => {
    const firstAcc = getBankAccount(100);
    const secondAcc = getBankAccount(50);
    firstAcc.transfer(50, secondAcc);
    expect(firstAcc.getBalance()).toBe(50);
    expect(secondAcc.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = getBankAccount(100);
    const checkBalance = await acc.fetchBalance();
    if (checkBalance !== null) {
      expect(typeof checkBalance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(100);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(200);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(200);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(100);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(null);
    await expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
