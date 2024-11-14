import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/store/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const response = await fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/users`)
    const users: User[] = await response.json();

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
