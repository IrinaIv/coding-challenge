import { Transaction, CustomerTransactionsResponse } from '../types';
import { aggregateTransactions } from './aggregateTransactions';

export const createGetTransactionsResponse = (groupedTransactions: Map<string, Transaction[]>): CustomerTransactionsResponse => {
  const response = [];

  for (const authorizationCode of groupedTransactions.keys()) {
    const transactions = groupedTransactions.get(authorizationCode);
    if (transactions?.length) {
      const aggregatedTransactions = aggregateTransactions(transactions);
      response.push(aggregatedTransactions);
    }
  }

  return {
    transactions: response,
  };
};
