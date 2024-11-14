import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import Layout from './Layout';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
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

export default AuthWrapper;
