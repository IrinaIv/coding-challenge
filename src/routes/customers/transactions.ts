import { FastifyRequest, FastifyReply } from 'fastify';

import { fetchAllTransactions } from '../../handlers/api';
import { groupTransactions } from '../../handlers/customers/groupTransactions';
import { getAllCustomerTransactions, createGetTransactionsResponse } from '../../handlers/customers/transactions/utils';
import { CustomerTransactionsRequest } from '../../handlers/customers/transactions/types';
import { HTTPStatusCodes } from './constants';

export const getTransactions = async (
  request: FastifyRequest<CustomerTransactionsRequest>,
  reply: FastifyReply,
) => {
  try {
    const customerId = Number(request.params.customerId);
    if (isNaN(customerId)) {
      return reply.code(HTTPStatusCodes.BAD_REQUEST).send({
        statusCode: HTTPStatusCodes.BAD_REQUEST,
        message: 'Customer id must be a valid integer',
      });
    }
    const allTransactions = await fetchAllTransactions();
    if (!allTransactions) {
      throw new Error('No transactions found');
    }
    const customerTransactions = getAllCustomerTransactions(allTransactions, customerId);
    if (!customerTransactions.length) {
      return reply.code(HTTPStatusCodes.OK).send({ transactions: [] });
    }
    const groupedTransactions = groupTransactions(customerTransactions);
    const response = createGetTransactionsResponse(groupedTransactions);
    return reply.code(HTTPStatusCodes.OK).send(response);
  } catch (error) {
    console.error('Failed to get transactions', error);
    return reply.code(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
