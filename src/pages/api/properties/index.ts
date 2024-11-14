import type { NextApiRequest, NextApiResponse } from 'next';
import { Property, Investment, User } from '@/store/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const requests = [
      fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/properties`),
      fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/users`),
      fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/investments`),
    ];
    const [propertiesRes, usersRes, investmentsRes] = await Promise.all(requests);
    const properties = await propertiesRes.json();
    const users = await usersRes.json();
    const investments = await investmentsRes.json();

    const propertiesWithInvests = properties.map((p: Property) => {
      const ownInvests = investments.filter((i: Investment) => i.property_id === p.id)
        .map((i: Investment) => ({...i, investor: users.find((u: User) => u.id === i.user_id)}));
      return {
        ...p,
        invests: ownInvests
      }
    });
    
    if (!propertiesRes.ok) {
      return res.status(500).json({ message: 'Failed to fetch properties' });
    }
  
    return res.status(201).json({ properties: propertiesWithInvests });
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
