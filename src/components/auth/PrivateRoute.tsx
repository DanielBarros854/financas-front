import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getToken } from '../../lib/auth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
} 
