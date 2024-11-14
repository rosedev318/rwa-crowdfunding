import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import Layout from './Layout';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  
  const isGuest = router.pathname.includes('/auth');

  useEffect(() => {
    const localUser = localStorage.getItem('user');

    if (localUser && !isGuest) {}
    if (!isGuest && !user) {
      if (!localUser) {
        router.push('/auth/login');
      }
    } else if (isGuest && user) {
      if (localUser) {
        router.push('/');
      }
    }
  }, [user, router]);


  return (isGuest ?
    <>{children}</> :
    <Layout>{children}</Layout>
  );
};

export default LayoutWrapper;
