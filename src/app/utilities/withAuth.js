import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser, selectUser } from '../store/slice/userSlice';
import UserPool from '../UserPool';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";


const withAuth = (WrappedComponent) => {

  const AuthComponent = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const accessToken = Cookies.get("auth_token");

          if (!accessToken) {
            console.log('Access token not found, redirecting to login');
            router.replace('/'); 
            return;
          }

          // const tokenExpiration = new Date(
          //   JSON.parse(atob(accessToken.split('.')[1])).exp * 1000
          // );
          // if (tokenExpiration < new Date()) {
          //   console.log('Access token expired, redirecting to login');
          //   router.replace('/'); 
          // }

          // console.log('Access Token:', accessToken);
         
          dispatch(setUser({ accessToken }));
        } catch (error) {
          console.error('Authentication error:', error);
          router.replace('/error');
        } finally {
          setIsLoading(false);
        }
      };

      checkAuth();
    }, [dispatch, router]);

    // If isLoading is true, return a loading indicator or message
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
