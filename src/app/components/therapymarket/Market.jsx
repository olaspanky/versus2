



"use client";
import React, { useState, useEffect } from 'react';
import Dashboard from "@/app/components/Dashboard";
import Cookies from "js-cookie";

export default function PageOne() {
  const [countryId, setCountryId] = useState(""); // Initialize as a string or null
  const [dashboardId, setDashboardId] = useState(""); // Initialize as a string or null
  const country = localStorage.getItem("country"); // Get country from localStorage
  useEffect(() => {
    // Set dashboardId based on the country stored in localStorage
    if (country === 'nigeria') {
      setCountryId("Nigeria Therapy Area Analytics - Market Overview Dashboard"); // Nigeria Dashboard ID
    } else if (country === 'ghana') {
      setCountryId("Ghana Therapy Area Analytics - Market Overview Dashboard"); // Ghana Dashboard ID
    } 
  }, [country]); // Add country as dependency to re-run effect when it changes

  useEffect(() => {
    // Get country from cookie

    // Set dashboardId based on the country
    if (country === 'nigeria') {
      setDashboardId("d8c5b0c7-6a9b-408e-92c7-fa45f630a17e"); // Nigeria Dashboard ID
    } else if (country === 'ghana') {
      setDashboardId("f84f612f-93c3-4240-a500-1bf4f37093fc"); // Ghana Dashboard ID
    } else if (country === 'kenya') {
      setDashboardId("3a115ebe-479f-4cd3-9df7-d3a6fc33fefa"); // Kenya Dashboard ID
    } else {
      setDashboardId("ba763508-18d8-4b26-a1b6-28b4b7a13782"); // Default Dashboard ID
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <>
      <div className="my-5">
      <div className=''><h1 className='md:text-4xl text-xl font-extrabold'>{countryId}</h1></div>
      </div>
      <div className='w-full h-[150vh]'>
        <Dashboard dashboardId={dashboardId} />
      </div>
    </>
  );
}
