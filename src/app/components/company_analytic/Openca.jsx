import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Trend from "./Trendopen";
import Share from "./Shareopen";

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTrendActive, setIsTrendActive] = useState(true);
  const [dashboardId, setDashboardId] = useState(""); // Initialize as a string or null
  const country = 'nigeria'; // Get country from localStorage

  useEffect(() => {
    // Set dashboardId based on the country stored in localStorage
    if (country === 'nigeria') {
      setDashboardId("Nigeria Company Analytics - Performance and Ranking Dashboard"); // Nigeria Dashboard ID
    } else if (country === 'ghana') {
      setDashboardId("Ghana Company Analytics - Performance and Ranking Dashboard"); // Ghana Dashboard ID
    } 
  }, [country]); // Add country as dependency to re-run effect when it changes

  const handleTrendClick = () => {
    setIsTrendActive(true);
  };

  const handleShareClick = () => {
    setIsTrendActive(false);
  };

  return (
    <main className="flex h-full w-full flex-col gap-9">
      <div className='flex justify-center gap-2 items-center cursor-pointer'>
        <div
          onClick={handleTrendClick}
          className={`px-9 py-2 ${isTrendActive ? 'bg-primary text-white' : 'text-primary bg-white border border-primary'} text-2xl font-extrabold`}
        >
          <h1>TREND</h1>
        </div>
        <div
          onClick={handleShareClick}
          className={`px-9 py-2 ${isTrendActive ? 'text-primary bg-white border border-primary' : 'bg-primary text-white'} text-2xl font-extrabold`}
        >
          <h1>SHARE</h1>
        </div>
      </div>

      <div className='flex flex-col gap-5 md:flex-row justify-between items-center my-5'>
        <div className=''><h1 className='md:text-4xl text-xl font-extrabold'>{dashboardId}</h1></div>
        <div className='bg-white flex flex-col p-2 px-2 gap-2 font-semibold rounded-md border border-gray-50 shadow-md'></div>
      </div>

      {isTrendActive ? (
        <div>
          <Trend />
        </div>
      ) : (
        <div>
          <Share />
        </div>
      )}
    </main>
  );
}
