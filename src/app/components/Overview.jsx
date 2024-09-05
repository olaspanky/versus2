import Image from 'next/image'
import { useState } from 'react';
import Search from "./therapy/Search"
import Drop from "./Dropdown"
import Box from "./therapy/Box2"
import Clip from "./Country"
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
import ghana from "../../../public/assets/ghana.png"
import cameroon from "../../../public/assets/cameroon.png"
import ivory from "../../../public/assets/ivory.png"
import kenya from "../../../public/assets/kenya.png"
import nigeria from "../../../public/assets/nigeria.png"
import senegal from "../../../public/assets/senegal.png"
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
  





  const Clipdata = [
    {
      title: '1.5M',
      description: 'Nigeria',
      icon: nigeria,
    },
    {
      title: '8,000',
      description: 'Ghana',
      icon: ghana,

    },
   
    {
      title: '1,860',
      description: 'Kenya',
      icon: kenya,

    },
    {
      title: '20M',
      description: 'Ivory Coast',
      icon: ivory,

    },
    
    {
      title: '1,860',
      description: 'Senegal',
      icon: senegal,

    },
    {
      title: '10,000',
      description: 'Cameroon',
      icon: cameroon,

    },
   
  ];

  return (
    <main className="  flex h-full w-full flex-col gap-9  font-custom2">

        <div className='my-7 flex flex-col gap-5'>
        <div><h1 className='text-2xl font-extrabold text-primary font-custom'>Welcome To VERSUS&#8482;</h1></div>
        <div className='bg-white p-3 rounded-md'><p className='text-lg'>This platform provides you with unparalleled access to critical data and insights, enabling you to gain a comprehensive understanding of your organization and brand's performance within retail pharmacies. VERSUS&#8482; was meticulously crafted using real sell-out data obtained from pharmacies, capturing essential metrics. With VERSUS&#8482;, you gain access to a suite of comprehensive and objective dashboards, including:</p></div>

        </div>

        <div className='font-custom'>

            <Clip data={Clipdata}/>
      
        </div>

 

    <div className='my-3 flex flex-wrap-reverse md:flex-nowrap gap-20 justify-between p-3 md:p-9 bg-white rounded-md  items-center'>
      <div className='w-1/4'>
        <Image alt="alt" src={data} />
      </div>

      <div className='w-3/4 md:p-2 lg:p-10'>
        <p className='text-lg text-black font-custom2 '>
        With VERSUS, you can make data-driven decisions, gain a competitive edge, and unlock new growth opportunities by harnessing the power of actionable insights derived from real-world retail pharmacy data. Welcome to a new era of data-driven decision-making in the retail pharmaceutical industry.
        </p>
      </div>

    </div>

    
    </main>
  )
}
 export default Home2
