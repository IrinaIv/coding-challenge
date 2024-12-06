export type RelatedCustomersRequest = {
  Params: {
    customerId: number;
  }
};

export type RelatedCustomersResponse = {
  relatedCustomers: RelatedCustomerResponse[];
};

export type RelatedCustomerResponse = {
  relatedCustomerId: number;
  relationType: string | 'DEVICE';
};

export type RelatedTransactionData = {
  relatedTransactionId: number;
  relationType: string;
};
