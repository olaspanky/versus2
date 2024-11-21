import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

const SubscriptionModal = ({ country, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h2>
          <p className="text-gray-700 mb-6">
            You are not subscribed to <span className="font-bold">{country}</span>. 
            Please contact <a href="mailto:email.com" className="text-blue-500 underline">marketanalytics@pbrinsight.com</a> for assistance.
          </p>
          <button
            onClick={onClose}
            className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const BoxGrid = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [modalCountry, setModalCountry] = useState(null); // Track country for the modal
  const router = useRouter();
  const { data: session } = useSession();
  const selectedCountries = session?.user?.selectedCountries || [];

  const handleHover = (index) => {
    setHoveredIndex(index !== 0 ? index : 0);
  };

  const handleCountryClick = (country, link) => {
    console.log("Selected Countries:", selectedCountries);
    console.log("Clicked Country:", country);

    const isSubscribed = selectedCountries.some(
      (selectedCountry) =>
        selectedCountry.trim().toLowerCase() === country.trim().toLowerCase()
    );

    if (country.toLowerCase() === "ghana" && !isSubscribed) {
      setModalCountry(country); // Show modal
      return;
    }

    localStorage.setItem("country", country);
    router.push(link);
  };

  return (
    <div>
      {modalCountry && (
        <SubscriptionModal
          country={modalCountry}
          onClose={() => setModalCountry(null)}
        />
      )}
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
            <div
              className={`${hoveredIndex === index ? 'bg-primary bg-clip_bg bg-no-repeat' : ''} p-3 cursor-pointer`}
              onClick={() => handleCountryClick(box.country, box.link)}
            >
              <div className="flex justify-between w-full gap-5 items-center max-h-36">
                <div className="flex gap-3 items-center">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoxGrid;
