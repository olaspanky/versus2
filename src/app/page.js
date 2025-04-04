"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
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
import Layout2 from "./shared2/Layout2";

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

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signInText, setSignInText] = useState("Sign in");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle
  const router = useRouter();
  const { data: session } = useSession();

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
    }, 3000);
  };

  useEffect(() => {
    if (session && session.user) {
      router.push("/pbr/home2"); // Redirect if logged in
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

  return (
    <main className="flex min-h-screen flex-col bg-gray-100 font-custom2">
      <CustomAlert message={alertMessage} type={alertType} />
      <PasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Topbar */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex items-center justify-between z-100">
        <div className="flex items-center">
          
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            {session && session.user ? `Welcome, ${session.user.email}` : "Guest"}
          </span>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {isSidebarOpen ? "Close" : "Log In"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 pt-16"> {/* Adjust padding-top for topbar height */}
        {/* Openca Dashboard */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "mr-96" : "mr-0"
          }`}
        >
          <Layout2>
          <Openca />
          </Layout2>
          
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