import type { NextApiRequest, NextApiResponse } from 'next';
import { Investment, Property, User } from '@/store/types';

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

    const property = properties.find((p: Property) => p.id === id);
    const ownInvests = investments.filter((i: Investment) => i.property_id === id)
      .map((i: Investment) => ({...i, investor: users.find((u: User) => u.id === i.user_id)}));

    if (property) {
      return res.status(200).json({ property: {...property, invests: ownInvests} });
    } else {
      return res.status(401).json({ message: 'Invalid ID' });
    }
  } catch (error) {
    console.error('Failed to Fetch property:', error);
    return res.status(401).json({ message: 'Invalid ID' });
  }
}
