export type CustomerTransactionsRequest = {
  Params: {
    customerId: number;
  }
};

export type CustomerTransactionsResponse = {
  transactions: TransactionResponse[];
};

export type TransactionStatus = 'PENDING' | 'SETTLED' | 'RETURNED';

export type Timeline = {
  createdAt: string;
  status: TransactionStatus;
  amount: number;
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

export type Transaction = {
  transactionId: number;
  authorizationCode: string;
  transactionDate: string;
  customerId: number;
  transactionType: string;
  transactionStatus: TransactionStatus;
  description: string;
  amount: number;
  metadata: {
    relatedTransactionId?: number;
    deviceId?: string;
  };
};
