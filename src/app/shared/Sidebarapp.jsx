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
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const currentRoute = usePathname();
  const user = useSelector((state) => state.user);
  const { data: session } = useSession();


  const toggleSubMenu = () => {
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

  useAutoSignOut(handleSignOut, 100000); // 300000 ms = 5 minutes
  localStorage.setItem('isReloaded', true);



  return (
    <div className="h-[100vh] max-h-[1080px]">
      <div className=" flex h-full  flex-col shadow-xl shadow-[#01212F] bg-gradient-to-b from-[#177199] via-[#115573] to-[#01212F]">
        <div className="flex justify-center my-5">
          {" "}
          <Image alt="alt" src={logo} />{" "}
        </div>

        <div>
          <div className="relative transition mt-9">
            <Link href="/pbr/home2">
              <div
                className={`relative m-2 flex items-center gap-2  rounded-xl  py-3 pl-5 text-sm text-white ${
                  currentRoute === "/pbr/home2" ? "bg-[#81B1D0]" : ""
                }`}
              >
                <Image alt="alt" src={home} />
                <h1 className="text-lg font-semibold">Homepage</h1>
              </div>
            </Link>
          </div>
        </div>

        <div className="my-2 max-h-[80%] overflow-auto no-scrollbar custom-scrollbar">
          <Menu />
        </div>

        <div className=" mt-auto mb-20">
          <div className="w-full border border-gray-200 opacity-5"></div>

          <div className="relative fixed m-2 ">
            <button
              className="flex items-center gap-2 rounded-xl  py-3 pl-5 text-sm text-white"
              onClick={handleSignOut}
            >
              <Image alt="alt" src={logout} />
              <h1 className="text-lg text-white opacity-50 font-semibold">
                Logout
              </h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
