"use client";

import { useQuery } from '@tanstack/react-query';
import { Spinner, Button } from "flowbite-react";
import { useRouter } from 'next/router';

import { Property, Investment } from "@/store/types";
import Link from 'next/link';
import Image from 'next/image';

const fetchProperty = async (id: string) => {
  const response = await fetch(`/api/properties/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }
  return response.json();
};

const Properties = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isPending } = useQuery({
    queryKey: ["property"],
    enabled: !!id,
    queryFn: () => fetchProperty(id as string),
  });
  
  const property: Property = data?.property;

  return (
    <>
      {isPending ?
        <Spinner aria-label="loading..." /> :
        <>
          <div className="w-full flex justify-between items-center">
            <h2 className="text-3xl font-medium mb-4 text-gray-500 dark:text-gray-400">{property.title} (${property.total_fund})</h2>
            <Link href={`/investments/${property.id}`}><Button>Invest Now</Button></Link>
          </div>
          <p className="text-gray-700 dark:text-gray-400">{property.description}</p>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {property.invests && property.invests.map((invest: Investment) => 
                <li key={invest.id} className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      <Image
                        alt={invest.investor?.username as string}
                        height="32"
                        width="32"
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        className="rounded-full"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{invest.investor?.username}</p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">{invest.investor?.email}</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      ${invest.amount.toLocaleString()}
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </>
      }
    </>
  );
};

export default Properties;
