import React, { useState } from 'react';
import Image from 'next/image';

const BoxGrid = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const handleHover = (index) => {
    if (index !== 0) {
      setHoveredIndex(index);
    } else {
      setHoveredIndex(0);
    }
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
        ><div className={`${hoveredIndex === index ? 'bg-primary  bg-clip_bg bg-no-repeat' : ''} p-3`}>
          <div className="flex w-full gap-5 items-center max-h-36">
           
            <div className="p-1">
              <Image alt="alt"  src={box.icon} width={40} height={40} />
            </div>
            <p className={`text-${hoveredIndex === index ? 'white' : '[#1973AF]'} text-lg font-extrabold`}>
                {box.description}
              </p>
          </div>
          <div>
           
          </div>
        </div>
        </div>
      ))}
    </div>
  );
};

export default BoxGrid;
