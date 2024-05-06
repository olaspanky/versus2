"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import google from "../../public/assets/google.png";
import mi from "../../public/assets/mi.png";
import logo from "../../public/assets/login_logo.svg";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slice/userSlice";
import Cookies from "js-cookie";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";



const CustomAlert = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  const alertClass =
    type === "success" ? "text-primary text-xl" : "text-red-500";

  return (
    <div
      className={`p-3   ${alertClass} ${
        isVisible ? "slide-in border bg-white mt-5 " : "slide-out"
      }`}
    >
      {message}
    </div>
  );
};

export default function Home() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [signInText, setSignInText] = useState("Sign in");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
    }, 3000);
  };



  const { data: session } = useSession();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      const user = session?.user;
      const sub = session?.user?.subscription;

      Cookies.set("auth_token", user);
  

      
      
      console.log("User data is", session);
      console.log("Subscription is", sub);
    
      router.push("pbr/home2");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setSignInText("Signing in...");

  //   const user = new CognitoUser({
  //     Username: email,
  //     Pool: UserPool,
  //   });

  //   const authDetails = new AuthenticationDetails({
  //     Username: email,
  //     Password: password,
  //   });

  //   user.authenticateUser(authDetails, {
  //     onSuccess: async (data) => {
  //       setIsLoading(false);
  //       setSignInText("Sign in");
  //       dispatch(setUser(user.getSignInUserSession()));
  //       const userSession = user.getSignInUserSession();
  //       const idToken = userSession.getIdToken().getJwtToken();
  //       console.log("token:", idToken);
  //       const accessToken = userSession.getAccessToken().getJwtToken();
  //       const company = data.idToken.payload["custom:ATC2"];
  //       const companyName = data.idToken.payload["custom:company"];
  //       Cookies.set("userData1", JSON.stringify(company), { expires: 1 });
  //       Cookies.set("userData2", JSON.stringify(companyName), { expires: 1 });
  //       Cookies.set("auth_token", idToken, { expires: 1 });
  //       showAlert("Signed in successfully!", "success");
  //       await user.signOut({ global: true });
  //       router.push("/pbr/home2");
  //     },
  //     onFailure: (err) => {
  //       console.error("onFailure:", err);
  //       setError(err.message || "An error occurred");
  //       showAlert("Sign in failed. Please check your credentials.", "error");

  //       setIsLoading(false);
  //       setSignInText("Sign in");
  //     },
  //     newPasswordRequired: (data) => {
  //       //console.log("newPasswordRequired:", data);
  //       setIsLoading(false);
  //       showAlert("Sign in failed. New password required.", "error");

  //       setSignInText("Sign in");
  //     },
  //   });
  // };

  return (
    <main className="flex max-h-[100vh] flex-col items-center justify-between bg-white  font-custom2">
      <CustomAlert message={alertMessage} type={alertType} />

      <div className=" w-full flex flex-row">
        <div className="items-start justify-start hidden bg-bgImage bg-contain bg-no-repeat bg-center lg:flex flex-col gap-5 w-[50%] px-20  p-9">
          <div className="mb-9">
            {" "}
            <Image alt="alt" src={logo} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold">VERSUS&#8482;</h1>
          </div>
          <div>
            <p className="text-md text-gray-600">
              Access user-friendly analysis and visualization of anonymised{" "}
              <br /> dispensing data collected from the retail pharmacies.
            </p>
          </div>
        </div>

        <div className="md:p-[5rem] flex flex-col justify-center items-center px-2   w-full lg:w-auto">
          <div className="flex flex-col  md:gap-5 my-10 justify-center ">
            <div className="mb-9 md:hidden">
              {" "}
              <Image alt="alt" src={logo} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold">
                Welcome To VERSUS&#8482;
              </h1>
            </div>
            <form onSubmit={handleSubmit}>
              <section className=" my-9 flex flex-col gap-9 lg:w-[90%]">
                <div className=" flex flex-col gap-5">
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="text-gray-700 font-semibold mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border border-gray-300 w-full rounded-md py-3 px-3 focus:outline-none focus:border-blue-500 "
                    />
                  </div>

                  <div className="flex flex-col p-1">
                    <label
                      htmlFor="password"
                      className="text-gray-700 font-semibold mb-1"
                    >
                      Password
                    </label>
                    <div className=" flex flex-row border justify-between border-gray-300 p-1 rounded-md">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full outline-none p-2"
                      />
                      <button
                        type="button"
                        className=" focus:outline-none mx-2 "
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="remember" className="mr-2" />
                        <label
                          htmlFor="remember"
                          className="text-sm text-gray-700"
                        >
                          Remember me
                        </label>
                      </div>

                      <div>
                        <p className="text-sm text-gray-700">
                          Forgotten Password
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <section className="flex flex-col my-9 w-full gap-5">
                  <button
                    className="bg-primary py-3 text-white px-3 rounded-md "
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="mr-2">Loading...</span>
                      </>
                    ) : (
                      signInText
                    )}
                  </button>
                  {session && session.user ? (
        <Link href="/pbr/home2">
          <button className="bg-primary py-3 w-full text-white px-3 rounded-md text-center">
            Go to Home
          </button>
        </Link>
      ) : null}
                  <div>
                    <p>Dont have an account yet? Contact us</p>
                  </div>
                </section>

                <div className="md:flex gap-3 justify-between"></div>
              </section>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
