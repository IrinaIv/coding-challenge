import {
  getP2PCustomerTransactions,
  retrieveRelatedTransactionData,
} from './utils';
import { Transaction } from '../../types';
import allTransactionsMock from '../../../test/mockData.json';

const partialTransactionsMock = [
  {
    transactionId: 16,
    authorizationCode: 'F10007',
    transactionDate: '2022-09-06T11:05:00+00:00',
    customerId: 4,
    transactionType: 'P2P_RECEIVE',
    transactionStatus: 'SETTLED',
    description: 'Transfer from Frederik',
    amount: 10000,
    metadata: {
        relatedTransactionId: 15
    }
  },
  {
    transactionId: 17,
    authorizationCode: 'F10008',
    transactionDate: '2022-09-06T13:05:00+00:00',
    customerId: 4,
    transactionType: 'P2P_SEND',
    transactionStatus: 'SETTLED',
    description: 'Transfer to Weoy',
    amount: -10000,
    metadata: {
        relatedTransactionId: 18,
        deviceId: 'F210200'
    }
  },
];

describe('getP2PCustomerTransactions', () => {
  it('should work with empty array', () => {
    const p2pTransactions = getP2PCustomerTransactions([], 1);
    expect(p2pTransactions).toEqual([]);
  });
  it('should return zero P2P transactions for customer id 1', () => {
    const p2pTransactions = getP2PCustomerTransactions(allTransactionsMock as Transaction[], 1);
    expect(p2pTransactions).toEqual([]);
  });
  it('should return 2 P2P transactions for customer id 4', () => {
    const p2pTransactions = getP2PCustomerTransactions(allTransactionsMock as Transaction[], 4);
    expect(p2pTransactions).toEqual(partialTransactionsMock);
  });
});

describe('retrieveRelatedTransactionData', () => {
  it('should work with empty array', () => {
    const relatedTransactionData = retrieveRelatedTransactionData([]);
    expect(relatedTransactionData).toEqual([]);
  });
  it('should return related transactions data', () => {
    const result = [
      {
        relatedTransactionId: 15,
        relationType: 'P2P_RECEIVE',
      },
      {
        relatedTransactionId: 18,
        relationType: 'P2P_SEND',
      }
    ];
    const relatedTransactionData = retrieveRelatedTransactionData(partialTransactionsMock as Transaction[]);
    expect(relatedTransactionData).toEqual(result);
  });
});
