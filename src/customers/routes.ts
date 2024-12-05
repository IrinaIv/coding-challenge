import { FastifyInstance, FastifyPluginCallback } from 'fastify';

import { getTransactions } from './transactions';

export const Customers: FastifyPluginCallback = async (
  server: FastifyInstance,
) => {
  server.get(
    '/:customerId/transactions',
    getTransactions,
  );
};
