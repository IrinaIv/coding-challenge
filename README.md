# coding-challenge
Coding Challenge for Seen

## Start
To build and start the server
```
npm start
```

## Test
To run tests
```
npm test
```

## Description
The server has two endpoints: one to get customer's transactions by `customerId` and the other one to get related customers by `customerId`.

### Transactions
Transactions endpoint
```
/customers/{customerId}/transactions
```

**Types**
```
type CustomerTransactionsRequest = {
  Params: {
    customerId: number;
  }
};

type CustomerTransactionsResponse = {
  transactions: Array<{
    createdAt: string;
    updatedAt: string;
    transactionId: number;
    authorizationCode: string;
    status: 'PENDING' | 'SETTLED' | 'RETURNED';
    description: string;
    transactionType: string;
    metadata: {
      deviceId?: string;
    };
    timeline: Array<{
      createdAt: string;
      status: TransactionStatus;
      amount: number;
    }>;
  }>;
};
```

**Possible response status codes**
* 200
* 400
* 500

### Related Customers
Related Customers endpoint
```
/customers/{customerId}/relatedCustomers
```

**Types**
```
export type RelatedCustomersRequest = {
  Params: {
    customerId: number;
  }
};

export type RelatedCustomersResponse = {
  relatedCustomers: Array<{
    relatedCustomerId: number;
    relationType: string | 'DEVICE';
  }>;
};
```

**Possible response status codes**
* 200
* 400
* 500

## Misc
For a framework I was choosing between Fastify and Express. I had following requirements:
* Lightweight. For the current simple and small project I was looking for a lightweight framework
* Performance and scalability. Despite being lightweight, a framework should be performing and scalable
* TypeScript support
* Strict and predictable. Stricter error handling and schema usage, which leads to more predictable behavior and fewer edge cases
* Community support

**Next steps**
* Add schemas for the endpoints to validate the routes and serialize the outputs
* Extand test coverage. Currently, there are a few tests for several functions, but, as the next step, I would certainly add unit tests for all functions and both endpoints, covering possible edge cases
