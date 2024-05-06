import Image from 'next/image'
import { useState } from 'react';
import Search from "./Search"
import Drop from "./Dropdown"
import Box from "./Box"

export default function Home() {
    
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const pharmacyOptions = ['Option 1', 'Option 2', 'Option 3'];

  const atcLevelOptions = ['Option A', 'Option B', 'Option C'];

  const boxData = [
    {
      heading: '14',
      title: 'Anatomical Classes (ATC 1)',
      description: 'E.g Cardiovascular, Anti-infectives for systemic use, Alimentary tract and Metabolism, Nervous system',
    },
    {
      heading: '85',
      title: 'Therapy Areas (ATC 2)',
      description: 'E.g N02 Analgesics, A10 Drugs used in diabetes, A11 Vitamins, L04 Immunosuppressants, R05 Cough and cold preparations',
    },
    {
      heading: '85',
      title: 'Therapy Areas (ATC 2)',
      description: 'E.g N02 Analgesics, A10 Drugs used in diabetes, A11 Vitamins, L04 Immunosuppressants, R05 Cough and cold preparations',
    },
    {
      heading: '85',
      title: 'Therapy Areas (ATC 2)',
      description: 'E.g N02 Analgesics, A10 Drugs used in diabetes, A11 Vitamins, L04 Immunosuppressants, R05 Cough and cold preparations',
    },
    {
      heading: '85',
      title: 'Therapy Areas (ATC 2)',
      description: 'E.g N02 Analgesics, A10 Drugs used in diabetes, A11 Vitamins, L04 Immunosuppressants, R05 Cough and cold preparations',
    },
  ];

  return (
    <main className=" bg-gray-100 flex h-full w-full flex-col gap-9  ">

        <div className='my-7 flex flex-col gap-5'>
        <div><h1 className='text-2xl font-extrabold text-primary'>Welcome To VERSUS &#8482;</h1></div>
        <div><p className='text-2xl'>We provide cloud based real world non-observational pharmacy sell out data to help upscale brand, 
            give market insight and impact success of brand in the continent</p></div>

        </div>

        <div className=''>
      <div className=" flex flex-row w-full  ">
        
        <div className='shadow-md flex w-[40%] h-full'>
          <div className='max-h-full w-full'>
          <Search placeholder="search Pharmacy"/>

          </div>
        {/* Dropdown */}
       </div>

      <div>
      <Drop name="ATC Level" options={pharmacyOptions}/>
      </div>

        <div className='ml-9'>
        <Drop name="Period" options={atcLevelOptions}/>
        </div>
        <div className='ml-9'>
        <Drop name="Product Analysis" options={atcLevelOptions}/>
        </div>

       <button className="ml-5 px-5 py-3 text-md bg-[#5C001A] text-white rounded-md h-full">
          View Data
        </button>



      </div>
    </div>

    <div className='w-full lg:w-[80%] h-full bg-gray-100'>
      <Box data={boxData}/>
    </div>
    
    </main>
  )
}
