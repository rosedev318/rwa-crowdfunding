import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/store/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const updatedUser = req.body;

    const response = await fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/users/${updatedUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      return res.status(500).json({ message: 'Failed to update user info' });
    }
  
    return res.status(201).json({ user: updatedUser });
  }

  res.setHeader('Allow', ['PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
