import fastify from 'fastify';

import { Customers } from './customers/routes';

export const start = async () => {
  const server = fastify({
    logger: true,
  });

  try {
    await server.register(Customers, { prefix: '/customers' });
    await server.listen({ port: 3000 });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
