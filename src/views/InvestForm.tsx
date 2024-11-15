"use client";

import { useEffect, useState } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useToastStore } from "@/store";
import { Investment, Property } from "@/store/types";
import { fetchProperties } from "./properties/Properties";
import { useAuth } from "@/hooks/useAuth";

const InvestForm = () => {
  const [form, setForm] = useState<Investment | null>(null);
  const [error, setError] = useState('');
  const { data } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });
  const properties = data?.properties;
  
  const { fireToast } = useToastStore();
  const { user } = useAuth();
  const router = useRouter();
  const { to } = router.query;

  const initInvestment: Investment = {
    property_id: to as string,
    user_id: user?.id ? user.id : '',
    amount: 100
  }

  useEffect(() => {
    console.log(initInvestment);
    if (initInvestment.property_id && initInvestment.user_id) {
      setForm(initInvestment);
    }
  }, [initInvestment.property_id, initInvestment.user_id]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    } as Investment);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    const res = await fetch('/api/investments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...form }),
    });

    if (res.ok) {
      fireToast('success', 'Investment created successfully!');
      setError('');
      router.push('/dashboard');
    } else {
      const data = await res.json();
      setError(data.message);
    }
  }

  return (
    <>
      <h2 className="text-3xl font-medium mb-4 text-gray-500 dark:text-gray-400">Complete your Investment</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {form &&
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="properties" value="Property" />
            </div>
            <Select id="properties" required value={form?.property_id} onChange={handleFormChange} name="property_id">
              {properties.length > 0 && properties.map((p: Property) => 
                <option key={p.id} value={p.id}>{p.title}</option>
              )}
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="amount" value="Amount" />
            </div>
            <TextInput id="amount" name="amount" value={form?.amount} onChange={handleFormChange} type="number" step={100} required />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      }
    </>
  );
};

export default InvestForm;
