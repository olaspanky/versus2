import React, { useState } from 'react';
import { usePathname } from 'next/navigation';


const MenuItem = ({ title, icon, subItems, path }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentRoute = usePathname();
  //console.log('currentRoute:', currentRoute);
//console.log('path:', path);


  const toggleSubMenu = () => {

    setIsOpen(!isOpen);
  };

  return (
    <div>
        <div className='w-full border border-gray-200 opacity-5'></div>
    <li className= { `relative transition  `}>
      <input className="peer hidden" type="checkbox" id={title} />
      <div className= {`relative m-2 flex items-center rounded-xl  py-3 pl-5 text-sm text-white ${currentRoute === path ? 'bg-[#81B1D0]' : ''}`}>
        {title}
        <label htmlFor={title} className="absolute inset-0 h-full w-full cursor-pointer" />
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`peer-checked:rotate-90 absolute right-0 top-3 mr-5 ml-auto h-4 text-white transition ${isOpen && 'transform rotate-180'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        onClick={toggleSubMenu}

      >
        <path d="M19 9l-7 7-7-7" />
      </svg>
      <ul
        className={`duration-400 peer-checked:max-h-96 my-2 m-2 flex max-h-0 flex-col overflow-hidden rounded-2xl  transition-all duration-300 ${
          isOpen && 'max-h-96'
        }`}
      >
        {subItems.map((item, index) => (
          <li key={index} className= {`flex cursor-pointer   text-sm text-white`}>
                  <div className= {`rounded-md px-3 py-2 ${currentRoute === item.path ? 'bg-[#81B1D0]' : ''}`}>

            {item.title}
            </div>
          </li>
        ))}
      </ul>
    </li>
    <div className='w-full border border-gray-200 opacity-5'></div>

    </div>
  );
};

const YourComponent = () => {
  const menuItems = [
    {
      title: 'Company Analytics',
      path: '/pbr/company_analytic/performance',
      
      subItems: [
        {
          title: 'Performance and Ranking',
          path: "/pbr/company_analytic/performance"
        },
        {
          title: 'Company Brand',
          path: '/pbr/company_analytic/company_brand',

        },
        {
          title: 'Company Sku',
          path: '/pbr/company_analytic/sku',

        },
      ],
    },
    {
      title: 'Therapy Area Analytics',
      path: '/pbr/therapy/market',

      
      
      subItems: [
        {
          title: 'Market Overview',
          path: '/pbr/therapy/market',

        },
        {
          title: 'Therapy Area',
          path: '/pbr/therapy/therapy',

        },
        {
          title: 'Market Size Model',
          path: '/pbr/therapy/market-Modal',

        },
      ],
    },
    {
      title: 'Brand Analytics',
      path: '/pbr/brand/brand_share',

      
      subItems: [
        {
          title: 'Brand Share Analytics',
          path: '/pbr/brand/brand_share',

        },
        {
          title: 'Brank SKU',
        },
        {
          title: 'Competitive Analysis',
        },
        {
          title: 'Patient Uptake',
        },
        {
          title: 'Co-prescription Analysis',
        },
      ],
    },
    {
      title: 'Channel Analytics',
     
      subItems: [
        {
          title: 'Numeric Selling Distribution',
         
        },
        {
          title: 'Brand ',
        },
        {
          title: 'SKU',
        },
        {
          title: 'Weighted Selling Distribution',
        },
      ],
    },
    {
      title: 'Settings',
     
      subItems: [
        {
          title: 'Carnival',
         
        },
      ],
    },
  ];

  return (
    <ul>
      {menuItems.map((item, index) => (
        <MenuItem key={index} path={item.path} title={item.title} icon={item.icon} subItems={item.subItems} />
      ))}
    </ul>
  );
};

export default YourComponent;
