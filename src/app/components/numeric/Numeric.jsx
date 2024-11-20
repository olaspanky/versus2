

import Image from "next/image";
import React, { useState, useEffect } from 'react';
import Trend from "./Trend";
import Share from "./Share";

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTrendActive, setIsTrendActive] = useState(true);
  const [trendCountryId, setTrendCountryId] = useState(""); // Initialize as a string or null
  const [shareCountryId, setShareCountryId] = useState(""); // Initialize as a string or null
  const country = localStorage.getItem("country"); // Get country from localStorage


  useEffect(() => {
    if (country === 'nigeria') {
      setTrendCountryId("Nigeria Channel Analytic - Numeric Selling Distribution (BRAND) Dashboard"); // Nigeria Dashboard ID
      setShareCountryId("Nigeria Channel Analytic - Numeric Selling Distribution (SKU) Dashboard"); // Example for Share
    } else if (country === 'ghana') {
      setTrendCountryId("Ghana Channel Analytic - Numeric Selling Distribution (BRAND) Dashboard"); // Ghana Dashboard ID
      setShareCountryId("Ghana Channel Analytic - Numeric Selling Distribution (SKU) Dashboard"); // Example for Share
    }
    // You can add other countries here if necessary
  }, [country]); // Add country as dependency to re-run effect when it changes

  const handleTrendClick = () => {
    setIsTrendActive(true);
  };

  const handleShareClick = () => {
    setIsTrendActive(false);
  };
  return (
    <main className="  flex h-full w-full flex-col gap-9  ">
      <div className="flex justify-center gap-2 items-center cursor-pointer ">
        <div
          onClick={handleTrendClick}
          className={`px-9 py-2 ${
            isTrendActive
              ? "bg-primary text-white"
              : "text-primary bg-white border border-primary"
          } text-2xl font-extrabold`}
        >
          <h1>BRAND</h1>
        </div>
        <div
          onClick={handleShareClick}
          className={`px-9 py-2 ${
            isTrendActive
              ? "text-primary bg-white border border-primary"
              : "bg-primary text-white"
          } text-2xl font-extrabold`}
        >
          <h1>SKU</h1>
        </div>
      </div>

      {isTrendActive ? (
        <div>
          <div className="flex flex-col gap-5 md:flex-row justify-between items-center my-5">
            <div className="">
              <h1 className="md:text-4xl text-xl font-extrabold ">
                {trendCountryId}
               
              </h1>
            </div>
            <div className="bg-white flex flex-col p-2 px-2 gap-2 font-semibold rounded-md border border-gray-50 shadow-md"></div>
          </div>
          <Trend />
        </div>
      ) : (
        // Share content here
        <div>
          <div className="flex flex-col gap-5 md:flex-row justify-between items-center my-5">
            <div className="">
              <h1 className="md:text-4xl text-xl font-extrabold ">
                {shareCountryId}
              </h1>
            </div>
            <div className="bg-white flex flex-col p-2 px-2 gap-2 font-semibold rounded-md border border-gray-50 shadow-md"></div>
          </div>

          <Share />
        </div>
      )}
    </main>
  );
}
