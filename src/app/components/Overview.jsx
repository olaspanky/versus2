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
      heading: 'Nigeria',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.',
    },
    {
      heading: 'Ghana',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.',
    },
    {
      heading: 'Kenya',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.',
    },
 
  
  ];
 
  return (
    <main className="  flex h-full w-full flex-col gap-9  font-custom2">

        <div className='my-7 flex flex-col gap-5'>
        <div><h1 className='text-2xl font-extrabold text-primary font-custom'>Overview</h1></div>
        <div className='bg-white p-3 rounded-md'><p className='text-lg'>We provide cloud based real world non-observational pharmacy sell out data to help upscale brand,
give market insight and impact success of brand in the continent</p></div>

        </div>

     

    <div className='w-full h-full bg-gray-100'>
      <Box data={boxData}/>
    </div>

   
    
    </main>
  )
}
 export default Home2
