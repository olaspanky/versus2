import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import logo from "../../../public/assets/logo.svg";
import home from "../../../public/assets/home.svg";
import logout from "../../../public/assets/logout.svg";
import Menu from "../components/Menu";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, clearUser } from "../store/slice/userSlice";
import Cookies from 'js-cookie';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import useAutoSignOut from '../components/useAutoSignOut';


const Sidebar = ({ title, icon, subItems }) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const currentRoute = usePathname();
  const { data: session } = useSession();


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };



  // const handleSignOut = async () => {
  
  //   try {
  //     // Sign out the user
  //     await signOut({ redirect: false, callbackUrl: '/' });
  
  //     // Extract email from the session
  //     const email = session?.user?.email;
  //     console.log("email is", email);
  
  //     // Update the isLoggedIn field in the database
  //     const response = await fetch("/api/update-isloggedin", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, isLoggedIn: false }),
  //     });
  
  //     // Check if the update is successful before redirecting
  //     if (response.ok) {
  //       // Clear the auth_token cookie
  //       Cookies.remove('auth_token');
  
  //       // Redirect the user to the route '/'
  //       router.push('/');
  //     } else {
  //       console.error("Error updating isLoggedIn:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error signing out:", error);
  //   }
  // };
  const handleSignOut = async () => {
    try {
      // Use navigator.sendBeacon to ensure sign out request is sent
      const email = session?.user?.email;
      if (email) {
        navigator.sendBeacon('/api/update-isloggedin', JSON.stringify({ email, isLoggedIn: false }));
      }

      // Clear deviceId from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem('deviceId');
      }

      // Clear cookies
      Cookies.remove('atc');
      Cookies.remove('auth_token');

      // Sign out the user from AWS Amplify
      await signOut({ redirect: false, callbackUrl: '/' });

      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useAutoSignOut(handleSignOut, 650000); // 300000 ms = 5 minutes
  localStorage.setItem('isReloaded', true);



  return (
    <div className={`h-[100vh] max-h-[1080px] transition-width duration-300 ${isOpen ? "w-[270px]" : "w-[80px]"}`}>
      <div className="flex h-full flex-col shadow-xl bg-gradient-to-b from-[#177199] via-[#115573] to-[#01212F]">
        <div className="flex justify-center my-5">
         
        <div
  className={`absolute top-[42vh] -right-[24px] z-1 p-[3px] bg-gray-100 transform -translate-y-1/2 flex justify-center items-center rounded-r-full rounded-l-none shadow-lg focus:outline-none transition-transform duration-300`}
>
  <button
    onClick={toggleSidebar}
    className={`text-primary font-[48px] text-5xl focus:outline-none transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
</div>

        </div>

        <div className={`flex justify-center my-5 ${!isOpen && "hidden"}`}>
          <Image alt="Logo" src={logo} />
        </div>

        <div>
          <div className="relative transition mt-9">
            <Link href="/pbr/home2">
              <div className={`relative m-2 flex items-center gap-2 rounded-xl py-3 pl-5 text-sm text-white ${currentRoute === "/pbr/home2" ? "bg-[#81B1D0]" : ""}`}>
                <Image alt="Home" src={home} />
                {isOpen && <h1 className="text-lg font-semibold">Homepage</h1>}
              </div>
            </Link>
          </div>
          {/* <div className="relative transition mt-2">
            <Link href="/pbr/overview">
              <div className={`relative m-2 flex items-center gap-2 rounded-xl py-3 pl-5 text-sm text-white ${currentRoute === "/pbr/overview" ? "bg-[#81B1D0]" : ""}`}>
                {isOpen && <h1 className="text-lg font-semibold">Overview</h1>}
              </div>
            </Link>
          </div> */}
        </div>

        {isOpen && (
          <div className="my-2 max-h-[80%] overflow-auto no-scrollbar custom-scrollbar">
            <Menu />
          </div>
        )}

        <div className="mt-auto mb-20">
          <div className="w-full border border-gray-200 opacity-5"></div>
          <div className="relative fixed m-2">
            <button className="flex items-center gap-2 rounded-xl py-3 pl-5 text-sm text-white" onClick={handleSignOut}>
              <Image alt="Logout" src={logout} />
              {isOpen && <h1 className="text-lg text-white opacity-50 font-semibold">Logout</h1>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
