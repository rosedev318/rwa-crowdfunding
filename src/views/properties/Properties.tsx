"use client";

import { useQuery } from '@tanstack/react-query';
import { Spinner } from "flowbite-react";

import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/store/types";
import FilterBox, { FilterOption } from '@/components/FilterBox';
import { useEffect, useState } from 'react';

const fetchProperties = async () => {
  const response = await fetch('/api/properties');
  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }
  return response.json();
};

const initOption: FilterOption = {
  search: '',
  min: 0,
  max: 10000
}

const Properties = () => {
  let [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const [option, setOption] = useState<FilterOption>(initOption);
  const [properties, setProperties] = useState<Property[]>([]);
  const { data, isPending } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });
  
  useEffect(() => {
    if (data?.properties.length > 0) {
      setProperties(data?.properties);
    }
  }, [data?.properties]);

  const handleOptionChange = (opt: FilterOption) => {
    setOption(opt);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const timerId = setTimeout(() => {
      setProperties(data?.properties.filter((property: Property) => {
        return property.title.toLowerCase().includes(opt.search.toLowerCase()) && property.total_fund >= opt.min && property.total_fund <= opt.max
      }))
    }, 300);

    setTimeoutId(timerId);
  }

  return (
    <>
      <div className="w-full flex justify-between items-end pt-2 mb-4 flex-wrap">
        <h2 className="text-3xl font-medium mb-4 text-gray-500 dark:text-gray-400">Properties</h2>
        <FilterBox option={option} handleChange={handleOptionChange} />
      </div>
      {isPending && <Spinner aria-label="loading..." />}
      <div className="w-full grid sm:grid-cols-4 grid-cols-1 gap-4 mb-2">
        {properties && properties.map((property: Property) => 
          <PropertyCard key={property.id} property={property} />
        )}
      </div>
    </>
  );
};

export default Properties;
