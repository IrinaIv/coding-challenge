import { build } from '../../server';
import { fetchAllTransactions } from '../../handlers/api';
import allTransactionsMock from '../../test/mockData.json';
import { HTTPStatusCodes } from './constants';

const createRequest = (customerId: number | undefined) => ({
  method: 'GET',
  path: `/customers/${customerId}/transactions`,
});

let app: any;

jest.mock('../../handlers/api');

beforeAll(async () => {
  app = await build();
});

describe('Transactions endpoint', () => {
  it('calls /transactions route successfully', async () => {
    (fetchAllTransactions as jest.Mock).mockResolvedValue(allTransactionsMock);

    const request = createRequest(1);
    const response = await app.inject(request);

    expect(response.statusCode).toEqual(HTTPStatusCodes.OK);
  });
  it('returns 404 if no customer id provided', async () => {
    const request = {
      method: 'GET',
      path: `/customers/transactions`,
    };
    const response = await app.inject(request);

    expect(response.statusCode).toEqual(HTTPStatusCodes.NOT_FOUND);
  });
  it('returns 400 if customer id is not an integer', async () => {
    const request = createRequest(undefined);
    const response = await app.inject(request);

    expect(response.statusCode).toEqual(HTTPStatusCodes.BAD_REQUEST);
  });
  it('returns 500 if fetchAllTransactions fails', async () => {
    (fetchAllTransactions as jest.Mock).mockRejectedValue(new Error('Something failed'));
    const request = createRequest(1);
    const response = await app.inject(request);

    expect(response.statusCode).toEqual(HTTPStatusCodes.INTERNAL_SERVER_ERROR);
  });
});
