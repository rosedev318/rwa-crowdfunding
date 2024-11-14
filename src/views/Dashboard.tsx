"use client";

import { useQuery } from '@tanstack/react-query';
import { Spinner } from "flowbite-react";

import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/store/types";

const fetchFeaturedProperties = async () => {
  const response = await fetch('/api/featured-properties');
  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }
  return response.json();
};

const Dashboard = () => {
  const { data, isPending } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchFeaturedProperties,
  });
  const properties = data?.properties;

  return (
    <>
      <h2 className="text-3xl font-medium mb-4 text-gray-500 dark:text-gray-400">Featured Properties</h2>
      {isPending && <Spinner aria-label="loading..." />}
      {/* <FilterBox /> */}
      <div className="w-full grid grid-cols-4 gap-4 mb-2">
        {properties && properties.map((property: Property) => 
          <PropertyCard key={property.id} property={property} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
