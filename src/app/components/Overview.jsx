import Image from 'next/image';
import { useState } from 'react';
import Clip from "./Country";
import data from "../../../public/assets/data.svg";
import arr from "../../../public/assets/arr.svg";
import arl from "../../../public/assets/arl.png";
import ghana from "../../../public/assets/ghana.png";
import cameroon from "../../../public/assets/cameroon.png";
import ivory from "../../../public/assets/ivory.png";
import kenya from "../../../public/assets/kenya.png";
import nigeria from "../../../public/assets/nigeria.png";
import senegal from "../../../public/assets/senegal.png";

const Home2 = () => {
  // Function to handle country click and store country in localStorage
  const handleCountryClick = (country) => {
    // Set country in localStorage
    localStorage.setItem("country", country); // Store country in localStorage
  };

  const Clipdata = [
    {
      title: '1.5M',
      description: 'Nigeria',
      icon: nigeria,
      link: "/pbr/overview",
      icon2: arr,
      icon3: arl,
      country: 'nigeria'
    },
    {
      title: '8,000',
      description: 'Ghana',
      icon: ghana,
      link: "/pbr/ghana",
      icon2: arr,
      icon3: arl,
      country: 'ghana'
    },
    {
      title: '1,860',
      description: 'Kenya',
      icon: kenya,
      link: "/pbr/construction",
      icon2: arr,
      icon3: arl,
      country: 'kenya'
    },
    {
      title: '20M',
      description: 'Ivory Coast',
      icon: ivory,
      link: "/pbr/construction",
      icon2: arr,
      icon3: arl,
      country: 'ivory_coast'
    },
    {
      title: '1,860',
      description: 'Senegal',
      icon: senegal,
      link: "/pbr/construction",
      icon2: arr,
      icon3: arl,
      country: 'senegal'
    },
    {
      title: '10,000',
      description: 'Cameroon',
      icon: cameroon,
      link: "/pbr/construction",
      icon2: arr,
      icon3: arl,
      country: 'cameroon'
    },
  ];

  return (
    <main className="flex h-full w-full flex-col gap-9 font-custom2">
      <div className='my-7 flex flex-col gap-5'>
        <div>
          <h1 className='text-2xl font-extrabold text-primary font-custom'>
            Welcome To VERSUS&#8482;
          </h1>
        </div>
        <div className='bg-white p-3 rounded-md'>
          <p className='text-lg'>
            This platform provides you with unparalleled access to critical data and insights, enabling you to gain a comprehensive understanding of your organization and brand's performance within retail pharmacies. VERSUS&#8482; was meticulously crafted using real sell-out data obtained from pharmacies, capturing essential metrics. With VERSUS&#8482;, you gain access to a suite of comprehensive and objective dashboards, including:
          </p>
        </div>
      </div>

      <div className='font-custom'>
        <Clip 
          data={Clipdata} 
          onCountryClick={handleCountryClick} 
        />
      </div>

      <div className='my-3 flex flex-wrap-reverse md:flex-nowrap gap-20 justify-between p-3 md:p-9 bg-white rounded-md items-center'>
        <div className='w-1/4'>
          <Image alt="VERSUS Dashboard" src={data} />
        </div>
        <div className='w-3/4 md:p-2 lg:p-10'>
          <p className='text-lg text-black font-custom2'>
            With VERSUS, you can make data-driven decisions, gain a competitive edge, and unlock new growth opportunities by harnessing the power of actionable insights derived from real-world retail pharmacy data. Welcome to a new era of data-driven decision-making in the retail pharmaceutical industry.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Home2;
