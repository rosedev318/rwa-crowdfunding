import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/store/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/users`)
    const users: User[] = await response.json();

    const user = users.find(user => user.id === id);

    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(401).json({ message: 'Invalid ID' });
    }
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}
