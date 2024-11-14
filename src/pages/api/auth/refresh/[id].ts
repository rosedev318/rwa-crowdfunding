import type { NextApiRequest, NextApiResponse } from 'next';
import { User, Property, Investment } from '@/store/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const requests = [
      fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/properties`),
      fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/users`),
      fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/investments`),
    ];
    const [propertiesRes, usersRes, investmentsRes] = await Promise.all(requests);
    const properties = await propertiesRes.json();
    const users = await usersRes.json();
    const investments = await investmentsRes.json();

    const user = users.find((u: User) => u.id === id);
    const ownInvests = investments.filter((i: Investment) => i.user_id === id)
      .map((i: Investment) => ({...i, property: properties.find((p: Property) => p.id === i.property_id)}));

    if (user) {
      return res.status(200).json({ user: {...user, invests: ownInvests} });
    } else {
      return res.status(401).json({ message: 'Invalid ID' });
    }
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}
