import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const MenuItem = ({ title, icon, subItems, path }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentRoute = usePathname();
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const router = useRouter();


  const handleClick = (e) => {
    e.preventDefault();
    router.push(path);
  };

  const handleRoute = (e,routPath) => {
    e.preventDefault()
    router.push(routPath);
  };

 

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const activeSub = subItems.find((item) => currentRoute === item.path);
    if (activeSub) {
      setIsOpen(true);
      setActiveSubMenu(activeSub.path);
    } else {
      setIsOpen(false);
      setActiveSubMenu(null);
    }
  }, [currentRoute, subItems]);

  return (
    <div>
      <div className="w-full border border-gray-200 opacity-5"></div>
      <li className={`relative transition  `}>
        <input className="peer hidden" type="checkbox" id={title} />
        <Link href={path}>
          <div
            className={`relative m-2 flex items-center rounded-xl  py-3 pl-5 text-sm text-white ${
              currentRoute === subItems.path ? "bg-[#81B1D0]" : ""
            } ${isOpen && "bg-primary"}`}
          >
            {title}
            <label
              htmlFor={title}
              className="absolute inset-0 h-full w-full cursor-pointer"
            />
          </div>
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`peer-checked:rotate-90 absolute right-0 top-3 mr-5 ml-auto h-4 text-white transition ${
            isOpen && "transform rotate-180"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          onClick={toggleSubMenu}
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
        <ul
          className={`duration-400 peer-checked:max-h-96 my-2 m-2 flex max-h-0 flex-col overflow-hidden  transition-all duration-300 ${
            isOpen && "max-h-96"
          } ${currentRoute === subItems.path ? " p-2 max-h-96" : ""}`}
        >
          {subItems.map((item, index) => (
            <li
              key={index}
              className={`flex cursor-pointer pl-2  text-sm text-white`}
            >
             <button className="text-left" onClick={() => router.push(item.path)} 
        key={item.title}>
  <div
    className={`rounded-md px-3 py-2 ${
      currentRoute === item.path
        ? "bg-[#81B1D0] p-2 max-h-96"
        : ""
    }`}
  >
    {item.title}
  </div>
</button>
            </li>
          ))}
        </ul>
      </li>
      <div className="w-full border border-gray-200 opacity-5"></div>
    </div>
  );
};

const YourComponent = () => {
  const country = localStorage.getItem("country"); // Get country from localStorage

  const menuItems = [
    {
      title: "Company Analytics",
      path: "/pbr/company_analytic/performance",
      links: "performance",

      subItems: [
        {
          title: "Performance and Ranking",
          path: "/pbr/company_analytic/performance",
          links: "performance",
        },
        {
          title: "Company Brand",
          path: "/pbr/company_analytic/company_brand",
          links: "company_brand",
        },
        // Exclude "Company Sku" if the country is Ghana
        ...(country !== "ghana"
          ? [
              {
                title: "Company Sku",
                path: "/pbr/company_analytic/sku",
                links: "sku",
              },
            ]
          : []),
      ],
    },
    {
      title: "Therapy Area Analytics",
      path: "/pbr/therapy/market",
      links: "market",

      subItems: [
        {
          title: "Retail Market Overview",
          path: "/pbr/therapy/market",
        },
       
      ],
    },
    {
      title: "Brand Analytics",
      path: "/pbr/brand/brand_share",

      subItems: [
        {
          title: "Brand Share Analytic",
          path: "/pbr/brand/brand_share",
          links: "sku",
        },
        {
          title: "Brand SKU",
          path: "/pbr/brand/brand_sku",

          links: "sku",
        },
       
      ],
    },
    {
      title: "Channel Analytics",
      path: "/pbr/channel/numeric",

      subItems: [
        {
          title: "Retail Numeric Distribution",
          path: "/pbr/channel/numeric",

          links: "sku",
        },
       
      
      ],
    },
    {
      title: "Support",
      path: "/pbr/setting2/", // Corrected path

      links: "sku",

      subItems: [
        {
          title: "Support",
          path: "/pbr/setting2", // Corrected path
          links: "sku",
        },
        {
          title: "Admin",
          path: "/pbr/settings", // Corrected path
          links: "sku",
        },
      ],
    },
  ];

  return (
    <ul>
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          path={item.path}
          title={item.title}
          icon={item.icon}
          subItems={item.subItems}
        />
      ))}
    </ul>
  );
};

export default YourComponent;