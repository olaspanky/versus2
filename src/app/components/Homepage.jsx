import Image from 'next/image'
import { useState } from 'react';
import Search from "./therapy/Search"
import Drop from "./Dropdown"
import Box from "./therapy/Box2"
import Clip from "./Clips"
import data from "../../../public/assets/data.svg"
import brand from "../../../public/assets/brand.svg"
import brandw from "../../../public/assets/brandw.svg"
import sku from "../../../public/assets/sku.svg"
import skuw from "../../../public/assets/skuw.svg"
import pharm from "../../../public/assets/pharm.svg"
import pharmw from "../../../public/assets/pharmw.svg"
import sold from "../../../public/assets/sold.svg"
import soldw from "../../../public/assets/soldw.svg"
import state from "../../../public/assets/state.svg"
import statew from "../../../public/assets/statew.svg"
import withAuth from '../utilities/withAuth';
import Cookies from "js-cookie";


const Home2 =() => {
    
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const pharmacyOptions = ['Option 1', 'Option 2', 'Option 3'];

  const atcLevelOptions = ['Option A', 'Option B', 'Option C'];

  const atc = Cookies.get("auth_token");
  
  const accessToken = Cookies.get("atc");

  if (accessToken) {
    try {
      // Parse JSON string to JSON array
      const atc_array = JSON.parse(accessToken);
      console.log("atc is ", atc_array);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      // Handle the error, e.g., set default values or inform the user
    }
  } else {
    console.log("atc cookie is not set");
    // Handle the scenario where the cookie is not set, e.g., set default values or inform the user
  }
  




  const boxData = [
    {
      heading: 'Company Analytics',
      description: 'Explore the performance of over 1,000 companies and compare your organizations achievements with peers in the same therapy area, period, or location. Uncover valuable insights into your market share and growth trends, both in terms of volume and value. This enables you to objectively evaluate your market position, even at the granular therapy area levels.',
    },
    {
      heading: 'Therapy Area Analytics',
      description: 'VERSUS encompasses more than 74 therapy areas, empowering you to conduct in-depth analysis and pinpoint opportunities for your brand, team, and organization. From Anatomical Therapeutic Chemical (ATC) Classification Level 1 (based on the area of the body the drug acts on) to ATC Level 5 (chemical substance, International non-proprietary Name (INN), our platform allows you to dive deep into identifying trends and patterns.      ',
    },
    {
      heading: 'Brand Analytics',
      description: 'Evaluate your brand and SKU market share and growth trends in comparison to competitors, using both volume and value as objective, data-driven metrics. VERSUS grants you access to explore a vast database containing over 8,000 brands and 10,000 SKUs in the market, providing invaluable guidance for your commercial planning.',
    },
    {
        heading: 'Channel Analytics',
      description: 'Understanding the proportion of pharmacies stocking your products and assessing whether your brand is positioned optimally within pharmacies can unlock new avenues for growth. VERSUS equips you with the tools to perform this analysis and more, enabling you to make informed decisions about your market strategy.',
    },
  
  ];
  const Clipdata = [
    {
      title: '8,000',
      description: 'Brands',
      icon: brandw,
      icon2: brand

    },
    {
      title: '10,000',
      description: 'SKUs',
      icon: sku,
      icon2: skuw

    },
    {
      title: '20M',
      description: 'Unit Items Sold',
      icon: sold,
      icon2: soldw

    },
    {
      title: '1.5M',
      description: 'Transactions',
      icon: pharm,
      icon2: pharmw
    },
    {
      title: '1,860',
      description: 'Companies',
      icon: state,
      icon2: statew

    },
  ];

  return (
    <main className="  flex h-[100vh] w-full flex-col gap-9  font-custom2">

        <div className='my-7 flex flex-col gap-5'>
        <div><h1 className='text-2xl font-extrabold text-primary font-custom'>Welcome To VERSUS&#8482; Platform</h1></div>
        <div className='bg-white p-3 rounded-md'>
          <p className='text-lg'>This platform provides you with unparalleled access to critical data and insights, enabling you to gain a comprehensive understanding of your organization and brand's performance within retail pharmacies. VERSUS&#8482; was meticulously crafted using real sell-out data obtained from pharmacies, capturing essential metrics. With VERSUS&#8482;, you gain access to a suite of comprehensive and objective dashboards, including:</p>
          </div>

        </div>

       <div className='flex flex-col gap-9 justify-center items-center my-24'>
        <p className='text-5xl text-[#2D2D2D]  font-bold  '>We are creating something amazing</p>
        <p className='text-2xl text-[#2D2D2D] font-bold'>we will launch soon.</p>

        <div className='flex w-full justify-center gap-3 items-center'>
          <input 
          placeholder="Enter your email"
          className="p-3 w-96 rounded-lg"
          />

          <button className='p-3 bg-primary text-white rounded-[16px] w-32'>Subscribe</button>
        </div>

       </div>

       


    
    </main>
  )
}
 export default Home2
