// import React, { useEffect, useState } from 'react';
// import Sidebar from './Sidebarapp';
// import Topbar from "./Topbar";
// import { Amplify } from "aws-amplify";
// import awsconfig from "../aws-exports";
// import "@aws-amplify/ui-react/styles.css";
// import { withAuthenticator } from "@aws-amplify/ui-react";
// import withAuth from '../utilities/withAuth';
// import Errpage from "../components/Errpage"

// Amplify.configure(awsconfig);

// const Layout2 = ({ children }) => {
//   const [userActive, setUserActive] = useState(true);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const checkUserStatus = async () => {
//       try {
//         const response = await fetch("/api/checkUserStatus", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const result = await response.json();
//         if (result.success) {
//           setUserActive(result.isActive);
//         } else {
//           setErrorMessage(result.message);
//           setUserActive(false);
//         }
//       } catch (error) {
//         console.error("Error checking user status:", error);
//         setErrorMessage("An error occurred while checking user status.");
//         setUserActive(false);
//       }
//     };

//     checkUserStatus();
//   }, []);

//   return (
//     <div className='max-w-[100vw] flex justify-center items-center font-custom'>
//       <div className='flex gap-0 h-auto w-full'>
//         <div className='z-40 hidden lg:block bg-white h-96 sticky top-0 w-[370px] max-h-[1080px]'><Sidebar /></div>
//         <div className='bg-gray-100 flex flex-col text-sm w-full font-light h-full'>
//           <div className='z-30 sticky top-0'>
//             <Topbar />
//           </div>
//           <div className='z-20 mt-2 px-3 lg:px-9 bg-[#f6f6f6] h-auto custom-scrollbar'>
//             {userActive ? (
//               children
//             ) : (
//               <div  className='h-[100vh] w-full'>
//               <Errpage/>

//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default withAuth(Layout2);
"use client"
import React, { Children } from 'react'
import Sidebar from './Sidebarapp'
import Topbar from "./Topbar"
import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import withAuth from '../utilities/withAuth';


Amplify.configure(awsconfig);

const Layout2 = ({children}) => {
  return (
    <div className=' max-w-[100vw] flex justify-center items-center font-custom '>
    <div className='flex gap-0 h-auto w-full'>
    <div className='z-40 hidden lg:block bg-white  h-96 sticky top-0 w-[370px]  max-h-[1080px]'><Sidebar/></div>
    <div className=' bg-gray-100 flex flex-col text-sm w-full font-light h-full'>
      <div className=' z-30 sticky top-0'>
      <Topbar/>
      </div>
      <div className='z-20 mt-2 px-3 lg:px-9 bg-[#f6f6f6] h-auto  custom-scrollbar'> 
      {children}
      </div>
      </div>
    </div>
  </div>
  )
}

export default withAuth(Layout2)
