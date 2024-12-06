import { Transaction } from './types';

export const fetchAllTransactions = async (): Promise<Transaction[] | undefined> => {
  try {
    const response = await fetch('https://cdn.seen.com/challenge/transactions-v2.json');
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json() as Transaction[];
  } catch (error) {
    console.error('Failed to fetch all transactions', error);
    throw error;
  }
}
