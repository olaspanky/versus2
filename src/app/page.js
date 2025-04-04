"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Clip from "./components/Country2"; // Adjust path as needed
import data from "../../public/assets/data.svg";
import arr from "../../public/assets/arr.svg";
import arl from "../../public/assets/arl.png";
import ghana from "../../public/assets/ghana.png";
import cameroon from "../../public/assets/cameroon.png";
import ivory from "../../public/assets/ivory.png";
import kenya from "../../public/assets/kenya.png";
import nigeria from "../../public/assets/nigeria.png";
import senegal from "../../public/assets/senegal.png";
import google from "../../public/assets/google.png";
import mi from "../../public/assets/mi.png";
import logo from "../../public/assets/login_logo.svg";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Openca from "./components/company_analytic/Openca"; // Adjust path as needed
import PasswordModal from "./components/PasswordModal"; // Adjust path as needed
import { getDeviceIdentifier } from "./components/getDeviceIdentifier"; // Adjust path as needed
import Layout2 from "./shared2/Layout2"; // Adjust path as needed

const Clipdata = [
  {
    title: "1.5M",
    description: "Nigeria",
    icon: nigeria,
    link: "/pbr/overview2",
    icon2: arr,
    icon3: arl,
    country: "nigeria",
  },
  {
    title: "8,000",
    description: "Ghana",
    icon: ghana,
    link: "/pbr/ghana",
    icon2: arr,
    icon3: arl,
    country: "ghana",
  },
  {
    title: "1,860",
    description: "Kenya",
    icon: kenya,
    link: "/pbr/construction",
    icon2: arr,
    icon3: arl,
    country: "kenya",
  },
  {
    title: "20M",
    description: "Ivory Coast",
    icon: ivory,
    link: "/pbr/construction",
    icon2: arr,
    icon3: arl,
    country: "ivory_coast",
  },
  {
    title: "1,860",
    description: "Senegal",
    icon: senegal,
    link: "/pbr/construction",
    icon2: arr,
    icon3: arl,
    country: "senegal",
  },
  {
    title: "10,000",
    description: "Cameroon",
    icon: cameroon,
    link: "/pbr/construction",
    icon2: arr,
    icon3: arl,
    country: "cameroon",
  },
];

const CustomAlert = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timeoutId = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  const alertClass = type === "success" ? "text-green-600 text-xl" : "text-red-500";

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 p-3 ${alertClass} ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300 border bg-white shadow-md rounded`}
    >
      {message}
    </div>
  );
};

export default function Index() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signInText, setSignInText] = useState("Sign in");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
    }, 3000);
  };

  useEffect(() => {
    if (session && session.user) {
      router.push("/pbr/home2");
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { deviceId, browserName, deviceName, deviceDevice } = getDeviceIdentifier();

    if (!deviceId) {
      showAlert("Unable to identify device.", "error");
      return;
    }

    setIsLoading(true);
    setSignInText("Signing in...");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        deviceId,
        browserName,
        deviceName,
        deviceDevice,
      });

      if (res?.error) {
        setError(res.error);
        showAlert(res.error, "error");
        setIsLoading(false);
        setSignInText("Sign in");
        return;
      }

      if (res?.ok) {
        showAlert("Logged in successfully!", "success");
        router.push("/pbr/home2");
      } else {
        setError("Failed to sign in");
        showAlert("Failed to sign in!", "error");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError("An error occurred while signing in");
      showAlert("An error occurred while signing in!", "error");
    } finally {
      setIsLoading(false);
      setSignInText("Sign in");
    }
  };

  const handleForgotPasswordClick = () => {
    setIsModalOpen(true);
  };

  if (!showDashboard) {
    return (
      <main className="flex  h-full w-full flex-col gap-9 font-custom2">
          <div className="left-0 right-0 bg-white shadow-md p-4 flex items-center justify-between z-100">
        <div className="flex items-center">
        <div className="flex justify-center">
          
        </div>
        </div>
        <div className="flex items-center gap-4">
        <div className="flex justify-center">
          <button
            onClick={() => setShowDashboard(true)}
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            View Free Dashboard
          </button>
        </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary transition duration-300"
          >
            {isSidebarOpen ? "Close" : "Log In"}
          </button>
        </div>
      </div>

        <div className="my-7 p-5 flex flex-col gap-5">
          <div>
            <h1 className="text-2xl font-extrabold text-primary font-custom">
              Welcome To VERSUS™
            </h1>
          </div>
          <div className="bg-white p-3 rounded-md">
            <p className="text-lg">
              This platform provides you with unparalleled access to critical
              data and insights, enabling you to gain a comprehensive
              understanding of your organization and brand's performance within
              retail pharmacies. VERSUS™ was meticulously crafted using real
              sell-out data obtained from pharmacies, capturing essential
              metrics. With VERSUS™, you gain access to a suite of comprehensive
              and objective dashboards, including:
            </p>
          </div>
        </div>

        <div className="font-custom">
          <Clip data={Clipdata} />
        </div>

        <div className="my-3 flex flex-wrap-reverse md:flex-nowrap gap-20 justify-between p-3 md:p-9 bg-white rounded-md items-center">
          <div className="w-1/4">
            <Image alt="VERSUS Dashboard" src={data} />
          </div>
          <div className="w-3/4 md:p-2 lg:p-10">
            <p className="text-lg text-black font-custom2">
              With VERSUS, you can make data-driven decisions, gain a
              competitive edge, and unlock new growth opportunities by
              harnessing the power of actionable insights derived from
              real-world retail pharmacy data. Welcome to a new era of
              data-driven decision-making in the retail pharmaceutical industry.
            </p>
          </div>
        </div>

      
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-100 font-custom2">
      <CustomAlert message={alertMessage} type={alertType} />
      <PasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Topbar */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex items-center justify-between z-100">
        <div className="flex items-center">
          <button
            onClick={() => setShowDashboard(false)}
            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
          >
            Back
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            {session && session.user ? `Welcome, ${session.user.email}` : "Go Premium"}
          </span>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary transition duration-300"
          >
            {isSidebarOpen ? "Close" : "Log In"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 pt-16">
        {/* Openca Dashboard */}
        <div
          className={`flex-1 transition-all duration-300 p-5 ${
            isSidebarOpen ? "mr-96" : "mr-0"
          }`}
        >
          <Openca />
        </div>

        {/* Sidebar */}
        <div
          className={`fixed top-16 right-0 h-[calc(100vh-4rem)] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } w-96 p-6 z-10`}
        >
          <div className="flex flex-col h-full py-32">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Log In to VERSUS™</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-700 font-semibold mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="text-gray-700 font-semibold mb-1">
                  Password
                </label>
                <div className="flex border border-gray-300 rounded-md p-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full outline-none p-2"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none mx-2"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-700">
                  <div className="flex items-center">
                    <input type="checkbox" id="remember" className="mr-2" />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <p className="cursor-pointer" onClick={handleForgotPasswordClick}>
                    Forgotten Password
                  </p>
                </div>
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                {isLoading ? "Signing in..." : signInText}
              </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
              Don’t have an account yet? Contact us at{" "}
              <a
                href="mailto:marketanalytics@pbrinsight.com"
                className="text-blue-600 hover:underline"
              >
                marketanalytics@pbrinsight.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}