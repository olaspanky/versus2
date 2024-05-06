import Image from 'next/image'
import { useState } from 'react';
import Search from "./Search"
import Drop from "./Dropdown"
import Box from "./Box2"
import Clip from "./clips"
import data from "../../../../public/assets/data.png"
import brand from "../../../../public/assets/brand.svg"
import brandw from "../../../../public/assets/brandw.svg"
import sku from "../../../../public/assets/sku.svg"
import skuw from "../../../../public/assets/skuw.svg"
import pharm from "../../../../public/assets/pharm.svg"
import pharmw from "../../../../public/assets/pharmw.svg"
import sold from "../../../../public/assets/sold.svg"
import soldw from "../../../../public/assets/soldw.svg"
import state from "../../../../public/assets/state.svg"
import statew from "../../../../public/assets/statew.svg"

export default function Home() {
    
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const pharmacyOptions = ['Option 1', 'Option 2', 'Option 3'];

  const atcLevelOptions = ['Option A', 'Option B', 'Option C'];

  const boxData = [
    {
      heading: 'Anatomical Classes (ATC 1)',
      description: 'Explore the performance of over 1,000 companies and compare your organizations achievements with peers in the same therapy area, period, or location. Uncover valuable insights into your market share and growth trends, both in terms of volume and value. This enables you to objectively evaluate your market position, even at the granular therapy area levels.',
    },
    {
      heading: 'Therapy Areas (ATC 2)',
      description: 'VERSUS encompasses more than 74 therapy areas, empowering you to conduct in-depth analysis and pinpoint opportunities for your brand, team, and organization. From Anatomical Therapeutic Chemical (ATC) Classification Level 1 (based on the area of the body the drug acts on) to ATC Level 5 (chemical substance, International non-proprietary Name (INN)), our platform allows you to dive deep into identifying trends and patterns.      ',
    },
    {
      heading: 'Therapy Areas (ATC 2)',
      description: 'Evaluate your brand and SKU market share and growth trends in comparison to competitors, using both volume and value as objective, data-driven metrics. VERSUS grants you access to explore a vast database containing over 8,000 brands and 10,000 SKUs in the market, providing invaluable guidance for your commercial planning.',
    },
    {
        heading: 'Therapy Areas (ATC 2)',
      description: 'Evaluate your brand and SKU market share and growth trends in comparison to competitors, using both volume and value as objective, data-driven metrics. VERSUS grants you access to explore a vast database containing over 8,000 brands and 10,000 SKUs in the market, providing invaluable guidance for your commercial planning.',
    },
    {
        heading: 'Therapy Areas (ATC 2)',

      description: 'E.g N02 Analgesics, A10 Drugs used in diabetes, A11 Vitamins, L04 Immunosuppressants, R05 Cough and cold preparations',
    },
  ];
  const Clipdata = [
    {
      title: '14 ',
      description: 'Brands',
      icon: brandw,
      icon2: brand

    },
    {
      title: '10K',
      description: 'SKUs',
      icon: sku,
      icon2: skuw

    },
    {
      title: '20M',
      description: 'Units Item Sold',
      icon: sold,
      icon2: soldw

    },
    {
      title: '500',
      description: 'Pharmacies',
      icon: pharm,
      icon2: pharmw
    },
    {
      title: '16',
      description: 'State',
      icon: state,
      icon2: statew

    },
  ];

  return (
    <main className=" bg-gray-100 flex h-full w-full flex-col gap-9  ">

        <div className='my-7 flex flex-col gap-5'>
        <div><h1 className='text-2xl font-extrabold text-primary'>Welcome To VERSUS &#8482;</h1></div>
        <div className='bg-white p-3 rounded-md'><p className='text-lg'>This platform provides you with unparalleled access to critical data and insights, enabling you to gain a comprehensive understanding of your organization and brand's performance within retail pharmacies. VERSUSTM was meticulously crafted using real sell-out data obtained from pharmacies, capturing essential metrics. With VERSUSTM, you gain access to a suite of comprehensive and objective dashboards, including:</p></div>

        </div>

        <div className=''>

            <Clip data={Clipdata}/>
      
        </div>

    <div className='w-full h-full bg-gray-100'>
      <Box data={boxData}/>
    </div>

    <div className='my-3 flex flex-wrap-reverse md:flex-nowrap gap-20 justify-between p-9 bg-white rounded-md  items-center'>
      <div>
        <Image alt="alt" src={data} width={700} height={700}/>
      </div>

      <div className='p-2 lg:p-20'>
        <p className='text-xl text-gray-500  font-bold '>
        With VERSUS, you can make data-driven decisions, gain a competitive edge, and unlock new growth opportunities by harnessing the power of actionable insights derived from real-world retail pharmacy data. Welcome to a new era of data-driven decision-making in the retail pharmaceutical industry.
        </p>
      </div>

    </div>
    
    </main>
  )
}
