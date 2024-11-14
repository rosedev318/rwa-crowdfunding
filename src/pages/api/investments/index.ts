import type { NextApiRequest, NextApiResponse } from 'next';
import { Investment } from '@/store/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const newInvest: Investment = req.body;
    const response = await fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/investments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newInvest),
    });

    if (!response.ok) {
      return res.status(500).json({ message: 'Registration failed' });
    }
  
    return res.status(201).json({ message: 'User registered successfully' });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
