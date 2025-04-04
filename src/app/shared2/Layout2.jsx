


"use client";
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebarapp';
import Topbar from './Topbar';
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';
import '@aws-amplify/ui-react/styles.css';
import TimeMe from 'timeme.js';
import { useSession } from "next-auth/react";
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';


Amplify.configure(awsconfig);

const Layout2 = ({ children }) => {
  const [accumulatedTime, setAccumulatedTime] = useState(0);
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  useEffect(() => {
    // Initialize TimeMe.js
    TimeMe.setIdleDurationInSeconds(30);
    TimeMe.setCurrentPageName('my-home-page');
    TimeMe.initialize();
    TimeMe.startTimer();

    // Load accumulated time from localStorage on component mount
    const storedTime = localStorage.getItem('accumulatedTime');
    if (storedTime) {
      setAccumulatedTime(parseInt(storedTime, 10));
    }

    // Function to update accumulated time
    const updateAccumulatedTime = () => {
      const timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
      const newAccumulatedTime = accumulatedTime + timeSpentOnPage;
      setAccumulatedTime(newAccumulatedTime);
      localStorage.setItem('accumulatedTime', newAccumulatedTime.toString());
      TimeMe.resetAllRecordedPageTimes();
    };

    // Update accumulated time every 8 minutes (480000 milliseconds)
    const timeUpdateInterval = setInterval(updateAccumulatedTime, 900000);

    // Sync with database every 10 minutes (600000 milliseconds)
    const syncWithDatabase = async () => {
      const timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
      const newAccumulatedTime = accumulatedTime + timeSpentOnPage;

      if (newAccumulatedTime > 0) {
        // Get user email from session (replace this with actual method to get email)
        const email = session?.user?.email;
        console.log("email session is", email);

        // Send accumulated time to backend
        try {
          // Call the original updateSession endpoint
          const response1 = await fetch('/api/updateSession', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, timeSpent: newAccumulatedTime }),
          });

          if (!response1.ok) {
            console.error('Failed to update session duration.');
          }

          // Call the new updateSession endpoint
          const response2 = await fetch('/api/dailyUpdate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, timeSpent: newAccumulatedTime }),
          });

          if (response2.ok) {
            // Reset accumulated time after sending to database
            setAccumulatedTime(0);
            localStorage.setItem('accumulatedTime', '0');
          } else {
            console.error('Failed to update daily session duration.');
          }
        } catch (error) {
          console.error('Error sending accumulated time to database: ', error);
        }
      }
    };

    const databaseSyncInterval = setInterval(syncWithDatabase, 200000);

    // Pause/Resume timer based on visibility
    const handleVisibilityChange = () => {
      if (document.hidden) {
        TimeMe.stopTimer();
      } else {
        TimeMe.startTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup on component unmount
    return () => {
      clearInterval(timeUpdateInterval);
      clearInterval(databaseSyncInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      TimeMe.resetAllRecordedPageTimes();
    };
  }, [accumulatedTime, session]);

  return (
    <div className='max-w-[100vw] flex justify-center items-center font-custom'>
      <div className='flex gap-0 h-auto w-full'>
        <div className={`z-40 hidden lg:block bg-white h-96 sticky top-0 ${isSidebarOpen ? "hidden" : "hidden lg:hidden"} max-h-[1080px]`}>
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>
        <div className='bg-gray-100 flex flex-col text-sm w-full font-light h-full'>
         
         
        </div>
      </div>
    </div>
  );
};

export default Layout2;

