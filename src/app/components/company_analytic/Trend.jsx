
"use client";
import React, { useState, useEffect } from 'react';
import Dashboard from "@/app/components/dashboard";
import Cookies from "js-cookie";

export default function PageOne() {
  const [dashboardId, setDashboardId] = useState(""); // Initialize as a string or null
  const country = localStorage.getItem("country"); // Get country from localStorage

  useEffect(() => {
    // Get country from cookie

    // Set dashboardId based on the country
    if (country === 'nigeria') {
      setDashboardId("c405b651-d394-48f2-a835-ecfc7ad7c1e2"); // Nigeria Dashboard ID
    } else if (country === 'ghana') {
      setDashboardId("a0e5e091-5131-43d2-bfac-81ce6142335e"); // Ghana Dashboard ID
    } else if (country === 'kenya') {
      setDashboardId("3a115ebe-479f-4cd3-9df7-d3a6fc33fefa"); // Kenya Dashboard ID
    } else {
      setDashboardId("ba763508-18d8-4b26-a1b6-28b4b7a13782"); // Default Dashboard ID
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <>
      <div className="my-5">
        
      </div>
      <div className='w-full h-[150vh]'>
        <Dashboard dashboardId={dashboardId} />
      </div>
    </>
  );
}
