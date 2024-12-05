import { Transaction } from '../types';

export const groupTransactions = (transactions: Transaction[]): Map<string, Transaction[]> => {
  const transactionGroups = new Map();
  for (const transaction of transactions) {
    const value = transactionGroups.get(transaction.authorizationCode);
    if (value) {
      transactionGroups.set(transaction.authorizationCode, [...value, transaction]);
    } else {
      transactionGroups.set(transaction.authorizationCode, [transaction])
    }
  }
  return transactionGroups;
};
