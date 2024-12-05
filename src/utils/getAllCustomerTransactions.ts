import { Transaction } from '../types';

export const getAllCustomerTransactions = (allTransactions: Transaction[], customerId: number): Transaction[] => {
  return allTransactions.filter((transaction: Transaction) => transaction.customerId === customerId);
};
