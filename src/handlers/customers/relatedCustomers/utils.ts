import { Transaction } from '../../types';
import { P2PTypes } from './constants';
import {
  RelatedCustomersResponse,
  RelatedTransactionData,
  RelatedCustomerResponse,
} from './types';

export const getP2PCustomerTransactions = (allTransactions: Transaction[], customerId: number): Transaction[] => {
  return allTransactions.filter((transaction: Transaction) => {
    return (transaction.transactionType === P2PTypes.P2P_SEND || transaction.transactionType === P2PTypes.P2P_RECEIVE)
      && transaction.customerId === customerId;
  });
};

export const retrieveRelatedTransactionData = (transactions: Transaction[]): RelatedTransactionData[] => {
  return transactions
    .map((transaction: Transaction) => {
      if (transaction.metadata.relatedTransactionId) {
        return {
          relatedTransactionId: transaction.metadata.relatedTransactionId,
          relationType: transaction.transactionType,
        };
      }
    })
    .filter(Boolean) as RelatedTransactionData[];
};

export const getSameDeviceTransactions = (allTransactions: Transaction[], customerId: number): Transaction[] => {
  const devices = new Set(
    allTransactions
      .filter((transaction: Transaction) => transaction.customerId === customerId && transaction.metadata.deviceId)
      .map((transaction: Transaction) => transaction.metadata.deviceId)
  );

  return allTransactions.filter((transaction: Transaction) => devices.has(transaction.metadata.deviceId));
};

export const createRelatedCustomersList = (
  allTransactionsMap: Map<number, Transaction>,
  relatedTransactions: RelatedTransactionData[],
  relationType?: 'DEVICE',
): RelatedCustomerResponse[] => {
  const result = [];

  for (const relatedTransaction of relatedTransactions) {
    const transaction = allTransactionsMap.get(relatedTransaction.relatedTransactionId);
    if (transaction) {
      result.push({
        relatedCustomerId: transaction.customerId,
        relationType: relationType ?? relatedTransaction.relationType,
      });
    }
  }

  return result;
};

export const createRelatedCustomersResponse = (
  allTransactions: Transaction[],
  relatedTransactions: RelatedTransactionData[],
  sameDevicesTransactions: RelatedTransactionData[],
): RelatedCustomersResponse => {
  const allTransactionsMap = new Map();

  for (const transaction of allTransactions) {
    allTransactionsMap.set(transaction.transactionId, transaction);
  }

  return {
    relatedCustomers: [
      ...createRelatedCustomersList(allTransactionsMap, relatedTransactions),
      ...createRelatedCustomersList(allTransactionsMap, sameDevicesTransactions, 'DEVICE'),
    ],
  };
};
