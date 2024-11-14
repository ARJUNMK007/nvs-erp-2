import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Homes from "./Login/Home";
import DashboardPage from "./pages/Dashboard";
import InventoryPage from "./pages/Inventory";
import LeftSidebar from "./organisms/LeftSidebar";
import RightSidebar from "./organisms/RightSidebar";
import ProductionPage from "./pages/Production";
import '@fortawesome/fontawesome-free/css/all.min.css';
import SalesPage from "./pages/SalesPage";
import ReportPage from "./pages/ReportPage"; // Import the new ReportPage component
import HelpPage from "./pages/HelpPage";
import Stock from "./pages/Stock";
import Helpsup from "./pages/Helpsup";
import MoqStock from "./pages/MoqStock";
import RotatePage from "./pages/RotatePage";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPortraitMode, setIsPortraitMode] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, [auth]);

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsPortraitMode(window.innerWidth < window.innerHeight); // Portrait mode when height > width
    };

    handleOrientationChange(); // Check initial orientation
    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/login" element={isPortraitMode ? <RotatePage /> : <Homes />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <div className="flex w-full">
                <div className="w-20 fixed">
                  <LeftSidebar />
                </div>
                <div className="flex flex-grow">
                  <div className="flex-grow p-6 bg-[#87cfeb1a] ml-20">
                    <DashboardPage />
                  </div>
                  <div className="w-[19.5%] lg:block">
                    <RightSidebar />
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      <Route
  path="/sales"
  element={
    isAuthenticated ? (
      <div className="flex w-screen">
        {/* Left Sidebar */}
        <div className="w-20"> {/* Adjust width as needed for your LeftSidebar */}
          <LeftSidebar />
        </div>
        
        {/* Main Content */}
        <div className="flex flex-grow">
          {/* Dashboard Page (Main Content Area) */}
          <div className="flex-grow p-6 bg-[#87cfeb1a]">
            <SalesPage />
          </div>
          
          {/* Right Sidebar */}
          {/* <div className="w-[20.5%]">
            <RightSidebar />
          </div> */}
        </div>
      </div>
    ) : (
      <Navigate to="/login" />
    )
  }
/>

<Route
  path="/inventory"
  element={
    isAuthenticated ? (
      <div className="flex w-full fixed">
        {/* Left Sidebar */}
        <div className="w-20"> {/* Matches the sidebar width from the /dashboard route */}
          <LeftSidebar />
        </div>

        {/* Inventory Section */}
        <div className="flex-grow p-6 bg-[#87cfeb1a]">
          <Stock />
        </div>
      </div>
    ) : (
      <Navigate to="/login" />
    )
  }
/>
<Route
  path="/moq"
  element={
    isAuthenticated ? (
      <div className="flex w-full fixed">
        {/* Left Sidebar */}
        <div className="w-20">
          <LeftSidebar />
        </div>

        {/* Inventory Section with defaultTab="Stock Moq" */}
        <div className="flex-grow p-6 bg-[#87cfeb1a]">
          <Stock defaultTab="Stock Moq" />
        </div>
      </div>
    ) : (
      <Navigate to="/login" />
    )
  }
/>



        {/* <Route
          path="/sales"
          element={
            isAuthenticated ? (
              <div className="flex w-full fixed">
                <div className="w-20">
                  <LeftSidebar />
                </div>
                <div className="flex flex-grow">
                  <div className="w-3/4 p-6 bg-[#87cfeb1a]">
                    <SalesPage />
                  </div>
                  <div className="w-[20%] sm:">
                    <RightSidebar />
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        /> */}
<Route
  path="/production"
  element={
    isAuthenticated ? (
      <div className="flex w-full fixed">
        {/* Left Sidebar */}
        <div className="w-20"> {/* Matches the sidebar width used in other routes */}
          <LeftSidebar />
        </div>

        {/* Production Section */}
        <div className="flex-grow p-6 bg-[#87cfeb1a]">
          <ProductionPage />
        </div>
      </div>
    ) : (
      <Navigate to="/login" />
    )
  }
/>



        {/* Route for the Report Page */}
        <Route
  path="/reports"
  element={
    isAuthenticated ? (
      <div className="flex w-full fixed">
        {/* Left Sidebar */}
        <div className="w-20"> {/* Consistent sidebar width */}
          <LeftSidebar />
        </div>

        {/* Main Content with Right Sidebar */}
        <div className="flex flex-grow">
          {/* Report Page */}
          <div className="flex-1 p-6 bg-[#87cfeb1a]">
            <ReportPage />
          </div>
          
          {/* Right Sidebar */}
          <div className="w-1/4 bg-white"> {/* Added bg-white to ensure visibility */}
            <RightSidebar />
          </div>
        </div>
      </div>
    ) : (
      <Navigate to="/login" />
    )
  }
/>



        {/* {Route for Report & help} */}
        <Route
  path="/customers"
  element={
    isAuthenticated ? (
      <div className="flex w-full fixed">
        {/* Left Sidebar */}
        <div className="w-20"> {/* Matches the sidebar width from other routes */}
          <LeftSidebar />
        </div>

        {/* Main Content (Help Page) */}
        <div className="flex-grow p-6 bg-[#87cfeb1a]">
          <HelpPage />
        </div>
      </div>
    ) : (
      <Navigate to="/login" />
    )
  }
/>
<Route
  path="/help"
  element={
    isAuthenticated ? (
      <div className="flex w-full fixed">
        {/* Left Sidebar */}
        <div className="w-20"> {/* Matches the sidebar width from other routes */}
          <LeftSidebar />
        </div>

        {/* Main Content (Help Page) */}
        <div className="flex-grow p-6 bg-[#87cfeb1a]">
          <Helpsup />
        </div>
      </div>
    ) : (
      <Navigate to="/login" />
    )
  }
/>
<Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
