import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slice/userSlice';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { data: session, status } = useSession();

    const [isLoading, setIsLoading] = useState(true);

    console.log("session is", session)

    useEffect(() => {
      const checkAuth = async () => {
        try {
          if (!session) {
            console.log('Access token not found, redirecting to login');
            router.replace('/'); 
            return;
          }

          // Assuming you have an accessToken in the session object
          dispatch(setUser({ accessToken: session.accessToken }));

        } catch (error) {
          console.error('Authentication error:', error);
          router.replace('/error');
        } finally {
          setIsLoading(false);
        }
      };

      checkAuth();
    }, [dispatch, router, session]);

    // If session status is loading, return a loading indicator or message
    if (status === "loading") {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
