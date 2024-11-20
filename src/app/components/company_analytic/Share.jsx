


"use client";
import React, { useState, useEffect } from 'react';
import Dashboard from "@/app/components/Dashboard";
import Cookies from "js-cookie";


export default function PageOne() {
  const [dashboardId, setDashboardId] = useState(""); // Initialize as a string or null

  const country = localStorage.getItem("country"); // Get country from localStorage

    useEffect(() => {
      // Get country from cookie
  
      // Set dashboardId based on the country
      if (country === 'nigeria') {
        setDashboardId("ba763508-18d8-4b26-a1b6-28b4b7a13782"); // Nigeria Dashboard ID
      } else if (country === 'ghana') {
        setDashboardId("00d5147a-9a78-4da2-8134-7d5534f47577"); // Ghana Dashboard ID
      } 
    }, []); // Empty dependency array ensures this runs once on mount
  

  return (
    <>
      <div className="my-5">
      </div>
      <Dashboard dashboardId={dashboardId} />;
    </>
  );
}
