import { FastifyRequest, FastifyReply } from 'fastify';

import { fetchAllTransactions } from '../api';
import { getAllCustomerTransactions, groupTransactions, createGetTransactionsResponse } from '../utils';
import { CustomerTransactionsRequest } from '../types';

export const getTransactions = async (
  request: FastifyRequest<CustomerTransactionsRequest>,
  reply: FastifyReply,
) => {
  const customerId = Number(request.params.customerId);
  try {
    const allTransactions = await fetchAllTransactions();
    if (!allTransactions) {
      throw new Error('No transactions found');
    }
    const customerTransactions = getAllCustomerTransactions(allTransactions, customerId);
    const groupedTransactions = groupTransactions(customerTransactions);
    const response = createGetTransactionsResponse(groupedTransactions);
    return reply.code(200).send(response);
  } catch (error) {
    console.error('Failed to get transactions', error);
    return reply.code(500).send(error);
  }
};
