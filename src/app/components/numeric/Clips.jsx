import React, { useState } from 'react';
import Image from 'next/image';

const BoxGrid = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-2 -mx-2">
      {data.map((box, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(-1)} // Reset the hover effect
          className={`col-span-1 flex flex-col bg-white border-2 border-primary rounded-lg shadow-lg p-3 hover:bg-primary hover:bg-clip_bg`}
         
        >
          <div className="flex w-full justify-between max-h-36">
            <div className="flex pt-9 items-center">
              <p className={`text-${hoveredIndex === index ? 'white' : '[#1973AF]'} text-3xl font-extrabold`}>
                {box.title} <sup>+</sup>
              </p>
            </div>
            <div className="p-1">
            <Image alt="alt" src={hoveredIndex === index ? box.icon2 : box.icon} width={40} height={40} />
            </div>
          </div>
          <div>
            <p className={`text-${hoveredIndex === index ? 'white' : '[#1973AF]'} text-2xl pt-3 font-bold pb-6`}>
              {box.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoxGrid;
