import React, { useState } from 'react';
import Image from 'next/image';
import arr from "../../../public/assets/arr.svg";
import Link from 'next/link';

const BoxGrid = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const handleHover = (index) => {
    if (index !== 0) {
      setHoveredIndex(index);
    } else {
      setHoveredIndex(0);
    }
  };

  const handleCountryClick = (country) => {
    // Store the selected country in localStorage
    localStorage.setItem("country", country);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-20 -mx-2">
      {data.map((box, index) => (
        <div
          key={index}
          onMouseEnter={() => handleHover(index)}
          onMouseLeave={() => setHoveredIndex(0)}
          className={`
            col-span-1
            flex flex-col
            border-2 border-gray-200 rounded-lg shadow-lg hover:bg-clip_bg
            ${hoveredIndex === index ? 'bg-primary bg-contain bg-no-repeat bg-clip_bg' : 'bg-white'}
          `}
        >
          <Link href={box.link} className={`${hoveredIndex === index ? 'bg-primary  bg-clip_bg bg-no-repeat' : ''} p-3`} onClick={() => handleCountryClick(box.country)}>
            <div className="flex justify-between w-full gap-5 items-center max-h-36">
              <div className='flex gap-3 items-center'>
                <div className="p-1">
                  <Image alt="alt" src={box.icon} width={40} height={40} />
                </div>
                <p className={`text-${hoveredIndex === index ? 'white' : '[#1973AF]'} text-lg font-extrabold`}>
                  {box.description}
                </p>
              </div>

              <div>
                <Image alt="alt" src={hoveredIndex === index ? box.icon2 : box.icon3} />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BoxGrid;
