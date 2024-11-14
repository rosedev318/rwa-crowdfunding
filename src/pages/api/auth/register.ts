import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/store/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const newUser: User = req.body;
    const usersRes = await fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/users`);
    const users: User[] = await usersRes.json();

    if (users.find(user => user.email === newUser.email)) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      return res.status(500).json({ message: 'Registration failed' });
    }
  
    return res.status(201).json({ message: 'User registered successfully' });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
