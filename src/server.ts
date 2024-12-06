import fastify from 'fastify';

import { Customers } from './routes/customers/routes';

export const build = async () => {
  const server = fastify({
    logger: true,
  });

  await server.register(Customers, { prefix: '/customers' });

  return server;
};
