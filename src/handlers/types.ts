export type TransactionStatus = 'PENDING' | 'SETTLED' | 'RETURNED';

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
