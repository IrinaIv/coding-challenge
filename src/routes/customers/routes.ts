import { FastifyInstance, FastifyPluginCallback } from 'fastify';

import { getTransactions } from './transactions';
import { getRelatedCustomers } from './relatedCustomers';

export const Customers: FastifyPluginCallback = async (
  server: FastifyInstance,
) => {
  server.get(
    '/:customerId/transactions',
    getTransactions,
  );
  server.get(
    '/:customerId/relatedCustomers',
    getRelatedCustomers,
  );
};
