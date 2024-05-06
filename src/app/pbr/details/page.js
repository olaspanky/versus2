"use client";
// Home.js
import React, { useState } from "react";
import Layout2 from '@/app/shared/Layout2'
import Topbar from "@/app/shared/Topbar";
import Users from "../../components/settings/Subusers";
import AddUsers from "../../components/settings/AddUsers";
import { withAuthenticator } from "@aws-amplify/ui-react";

const Home = () => {
  // State to track the view (Users or AddUsers)
  const [currentView, setCurrentView] = useState("Users");

  // Function to toggle the visibility of AddUsers and switch views
  const toggleView = () => {
    setCurrentView(currentView === "Users" ? "AddUsers" : "Users");
  };

  return (
    <Layout2>
    <main className="bg-gray-100 flex ">
      <Users/>

    </main>
    </Layout2>
  );
};

export default Home;
