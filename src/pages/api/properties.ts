import type { NextApiRequest, NextApiResponse } from 'next';
import { Property } from '@/store/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const propertiesRes = await fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/properties`);
    
    if (!propertiesRes.ok) {
      return res.status(500).json({ message: 'Failed to fetch properties' });
    }
    const properties: Property[] = await propertiesRes.json();
  
    return res.status(201).json({ properties });
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
