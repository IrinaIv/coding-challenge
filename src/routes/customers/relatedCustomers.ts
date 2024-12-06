import { FastifyRequest, FastifyReply } from 'fastify';

import { fetchAllTransactions } from '../../handlers/api';
import {
  getP2PCustomerTransactions,
  getSameDeviceTransactions,
  createRelatedCustomersResponse,
  retrieveRelatedTransactionData,
} from '../../handlers/customers/relatedCustomers/utils';
import { RelatedCustomersRequest } from '../../handlers/customers/relatedCustomers/types';
import { HTTPStatusCodes } from './constants';

export const getRelatedCustomers = async (
  request: FastifyRequest<RelatedCustomersRequest>,
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
    const p2pCustomerTransactions = getP2PCustomerTransactions(allTransactions, customerId);
    const sameDevicesTransactions = getSameDeviceTransactions(allTransactions, customerId);
    if (!p2pCustomerTransactions.length || !sameDevicesTransactions.length) {
      return reply.code(HTTPStatusCodes.OK).send({ relatedCustomers: [] });
    }
    const relatedTransactionData = retrieveRelatedTransactionData(p2pCustomerTransactions);
    const sameDevicesTransactionData = retrieveRelatedTransactionData(sameDevicesTransactions);
    const response = createRelatedCustomersResponse(allTransactions, relatedTransactionData, sameDevicesTransactionData);
    return reply.code(HTTPStatusCodes.OK).send(response);
  } catch (error) {
    console.error('Failed to get transactions', error);
    return reply.code(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
