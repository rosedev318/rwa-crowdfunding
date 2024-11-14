"use client";

import InvestsTable from '@/components/InvestsTable';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <h2 className="text-3xl font-medium mb-4 text-gray-500 dark:text-gray-400">Your Investment List</h2>
      <InvestsTable invests={user?.invests || []} />
    </>
  );
};

export default Dashboard;
