import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

interface AuthWrapperProps {
  children: React.ReactNode;
  loginRequired?: boolean;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, loginRequired = false }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser && loginRequired) {}
    if (loginRequired && !user) {
      if (!localUser) {
        router.push('/auth/login');
      }
    } else if (!loginRequired && user) {
      if (localUser) {
        router.push('/');
      }
    }
  }, [user, loginRequired, router]);

  return <>{children}</>;
};

export default AuthWrapper;
