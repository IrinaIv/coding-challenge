import { Transaction } from '../../types';
import { TransactionResponse, CustomerTransactionsResponse } from './types';

export const getAllCustomerTransactions = (allTransactions: Transaction[], customerId: number): Transaction[] => {
  return allTransactions.filter((transaction: Transaction) => transaction.customerId === customerId);
};

export const aggregateTransactions = (transactions: Transaction[]): TransactionResponse => {
  const firstTransaction = transactions[0];
  const lastTransaction = transactions[transactions.length - 1];
  const deviceId = transactions.find((transaction: Transaction) => Boolean(transaction.metadata.deviceId))?.metadata?.deviceId;
  const timeline = transactions.map((transaction: Transaction) => ({
    createdAt: transaction.transactionDate,
    status: transaction.transactionStatus,
    amount: transaction.amount,
  }));

  return {
    createdAt: firstTransaction.transactionDate,
    updatedAt: lastTransaction.transactionDate,
    transactionId: firstTransaction.transactionId,
    authorizationCode: firstTransaction.authorizationCode,
    status: lastTransaction.transactionStatus,
    description: firstTransaction.description,
    transactionType: firstTransaction.transactionType,
    metadata: {
      ...(deviceId ? { deviceId } : {})
    },
    timeline,
  };
};

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
