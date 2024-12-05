import { Transaction, TransactionResponse } from '../types';

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
