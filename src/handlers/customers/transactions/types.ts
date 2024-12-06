import { TransactionStatus } from '../../types';

export type CustomerTransactionsRequest = {
  Params: {
    customerId: number;
  }
};

export type CustomerTransactionsResponse = {
  transactions: TransactionResponse[];
};

export type TransactionResponse = {
  createdAt: string;
  updatedAt: string;
  transactionId: number;
  authorizationCode: string;
  status: TransactionStatus;
  description: string;
  transactionType: string;
  metadata: {
    deviceId?: string;
  };
  timeline: Timeline[];
};

export type Timeline = {
  createdAt: string;
  status: TransactionStatus;
  amount: number;
};
