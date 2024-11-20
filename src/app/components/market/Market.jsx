




"use client";
import React, { useState, useEffect } from 'react';
import Dashboard from "@/app/components/dashboard";
import Cookies from "js-cookie";

export default function PageOne() {
  const [dashboardId, setDashboardId] = useState(""); // Initialize as a string or null
  const [countryId, setCountryId] = useState(""); // Initialize as a string or null
  const country = localStorage.getItem("country"); // Get country from localStorage
  useEffect(() => {
    // Set dashboardId based on the country stored in localStorage
    if (country === 'nigeria') {
      setCountryId("Nigeria Company Analytic - Company SKU Dashboard  "); // Nigeria Dashboard ID
    } else if (country === 'ghana') {
      setCountryId("Ghana Company Analytic - Company SKU Dashboard "); // Ghana Dashboard ID
    } 
  }, [country]); // Add country as dependency to re-run effect when it changes

  useEffect(() => {
    // Get country from cookie

    // Set dashboardId based on the country
    if (country === 'nigeria') {
      setDashboardId("2af0f0ae-b172-4afa-afb6-147d9e75affd"); // Nigeria Dashboard ID
    } else if (country === 'ghana') {
      setDashboardId("c24d24f3-732f-4439-a8b1-8d73a6994496"); // Ghana Dashboard ID
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
