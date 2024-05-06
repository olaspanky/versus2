import Image from "next/image";
import { useState } from "react";
import Trend from "./Trend";
import Share from "./Share";
import Transactions from "../Transctions"


export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTrendActive, setIsTrendActive] = useState(true);

  const handleTrendClick = () => {
    setIsTrendActive(true);
  };

  const handleShareClick = () => {
    setIsTrendActive(false);
  };

  return (
    <main className="  flex h-full w-full flex-col gap-9  ">
      <div className="flex justify-center gap-2 items-center  cursor-pointer">
        <div
          onClick={handleTrendClick}
          className={`px-9 py-2 ${
            isTrendActive
              ? "bg-primary text-white"
              : "text-primary bg-white border border-primary"
          } text-2xl font-extrabold`}
        >
          <h1>TREND</h1>
        </div>
        <div
          onClick={handleShareClick}
          className={`px-9 py-2 ${
            isTrendActive
              ? "text-primary bg-white border border-primary"
              : "bg-primary text-white"
          } text-2xl font-extrabold`}
        >
          <h1>SHARE</h1>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-5 justify-between items-center my-5'>
    <div className=''><h1 className='text-4xl font-extrabold '>Brand Analytic - Competitive Analysis Dashboard</h1></div>
    <div className='bg-white flex flex-col p-2 px-2 gap-2 font-semibold rounded-md border border-gray-50 shadow-md'>
          </div>
</div>

      {isTrendActive ? (
        <div>
          <Trend />
        </div>
      ) : (
        // Share content here
        <div>
          <Share />
        </div>
      )}
    </main>
  );
}
