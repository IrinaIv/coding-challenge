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

export const getSameDeviceTransactions = (allTransactions: Transaction[], customerId: number): Transaction[] => {
  const devices = new Set(
    allTransactions
      .filter((transaction: Transaction) => transaction.customerId === customerId && transaction.metadata.deviceId)
      .map((transaction: Transaction) => transaction.metadata.deviceId)
  );

  return allTransactions.filter((transaction: Transaction) => {
    return devices.has(transaction.metadata.deviceId) && transaction.customerId !== customerId;
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

export const retrieveSameDeviceTransactionData = (transactions: Transaction[]): RelatedCustomerResponse[] => {
  return transactions
    .map((transaction: Transaction) => ({
      relatedCustomerId: transaction.customerId,
      relationType: 'DEVICE',
    }));
};

const createRelatedCustomersList = (
  allTransactionsMap: Map<number, Transaction>,
  relatedTransactions: RelatedTransactionData[],
): RelatedCustomerResponse[] => {
  const result = [];

  for (const relatedTransaction of relatedTransactions) {
    const transaction = allTransactionsMap.get(relatedTransaction.relatedTransactionId);
    if (transaction) {
      result.push({
        relatedCustomerId: transaction.customerId,
        relationType: relatedTransaction.relationType,
      });
    }
  }

  return result;
};

const getUniqueRelatedCustomersList = (relatedCustomers: RelatedCustomerResponse[]): RelatedCustomerResponse[] => {
  const uniqueMap: Map<string, RelatedCustomerResponse> = new Map();

  relatedCustomers.forEach(relatedCustomer => {
    const key = `${relatedCustomer.relatedCustomerId}_${relatedCustomer.relationType}`;
    uniqueMap.set(key, relatedCustomer);
  });

  return Array.from(uniqueMap.values());
};

export const createRelatedCustomersResponse = (
  allTransactions: Transaction[],
  relatedTransactions: RelatedTransactionData[],
  sameDevicesTransactions: RelatedCustomerResponse[],
): RelatedCustomersResponse => {
  const allTransactionsMap = new Map();

  for (const transaction of allTransactions) {
    allTransactionsMap.set(transaction.transactionId, transaction);
  }

  return {
    relatedCustomers: [
      ...createRelatedCustomersList(allTransactionsMap, relatedTransactions),
      ...getUniqueRelatedCustomersList(sameDevicesTransactions),
    ],
  };
};
