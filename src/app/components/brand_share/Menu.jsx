import React, { useState } from 'react';
import { usePathname } from 'next/navigation';


const MenuItem = ({ title, icon, subItems, path, changeDashboard  }) => {

  return (<>

<div className='flex flex-col my-5 gap-3'>
        {/* Button 1 */}
        <button
          onClick={() => handleButtonClick("996fd4fe-40f8-4ebf-9abd-08814f988896")}
          className='flex-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:border-primary transition duration-300 ease-in-out'
        >
          Go to Dashboard
        </button>
        {/* Button 2 */}
        <button
          onClick={() => handleButtonClick("da865c6a-f2e8-4854-947d-8da74ec4abfa")}
          className='flex-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:border-primary transition duration-300 ease-in-out'
        >
          Brand Ranking Dashboard
        </button>
        <button
          onClick={() => handleButtonClick("70ff0838-a669-4c34-ba38-f3e6c7f8c54d")}
          className='flex-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:border-primary transition duration-300 ease-in-out'
        >
          Brand Ranking Dashboard
        </button>
        <button
          onClick={() => handleButtonClick("8cadbbac-5c8c-4d6b-bdb7-fa957307e9ec")}
          className='flex-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:border-primary transition duration-300 ease-in-out'
        >
          Brand SKU Dashboard
        </button>
        {/* Add more buttons if needed */}
      </div>
      
  
  </>)}
export default MenuItem