import type { NextApiRequest, NextApiResponse } from 'next';
import { User, Investment, Property } from '@/store/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const requests = [
      fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/properties`),
      fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/users`),
      fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/investments`),
    ];
    const [propertiesRes, usersRes, investmentsRes] = await Promise.all(requests);
    const properties = await propertiesRes.json();
    const users = await usersRes.json();
    const investments = await investmentsRes.json();

    const user = users.find((u: User) => u.email === email && u.password === password);
    
    if (user) {
      const ownInvests = investments.filter((i: Investment) => i.user_id === user.id)
        .map((i: Investment) => ({...i, property: properties.find((p: Property) => p.id === i.property_id)}));
      return res.status(200).json({ user: {...user, invests: ownInvests} });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
