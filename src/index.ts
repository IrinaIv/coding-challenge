import { build } from './server';

export const start = async () => {
  try {
    const server = await build();
    await server.listen({ port: 3000 });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
