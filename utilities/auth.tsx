import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';

export const isAuthenticated = async () => {
  const data = await getServerSession(authOptions);
  return data;
};
