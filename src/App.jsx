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

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, [auth]);

  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/login" element={<Homes />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <div className="flex w-full">
                <div className="w-1/6">
                  <LeftSidebar />
                </div>
                <div className="flex w-5/6">
                  <div className="w-3/4 p-6 bg-[#87cfeb1a]">
                    <DashboardPage />
                  </div>
                  <div className="w-1/4">
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
  path="/inventory"
  element={
    isAuthenticated ? (
      <div className="flex w-full">
        {/* Left Sidebar */}
        <div className="w-1/6">
          <LeftSidebar />
        </div>

        {/* Inventory Section */}
        <div className="flex-1 p-6 bg-[#87cfeb1a]">
          <InventoryPage />
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
              <div className="flex w-full fixed">
                <div className="w-1/6">
                  <LeftSidebar />
                </div>
                <div className="flex w-5/6">
                  <div className="w-3/4 p-6 bg-[#87cfeb1a]">
                    <SalesPage />
                  </div>
                  <div className="w-1/4">
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
  path="/production"
  element={
    isAuthenticated ? (
      <div className="flex w-full fixed">
        {/* Left Sidebar */}
        <div className="w-1/6">
          <LeftSidebar />
        </div>

        {/* Production Section */}
        <div className="flex-1 p-6 bg-[#87cfeb1a]">
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
                <div className="w-1/6">
                  <LeftSidebar />
                </div>
                <div className="flex w-5/6">
                  <div className="w-3/4 p-6 bg-[#87cfeb1a]">
                    <ReportPage />
                  </div>
                  <div className="w-1/4">
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
  path="/help"
  element={
    isAuthenticated ? (
      <div className="flex w-full fixed">
        <div className="w-1/6">
          <LeftSidebar />
        </div>
        <div className="flex w-5/6">
          <div className="w-3/4 p-6 bg-[#87cfeb1a]">
            <HelpPage />
          </div>
          <div className="w-1/4">
            <RightSidebar />
          </div>
        </div>
      </div>
    ) : (
      <Navigate to="/login" />
    )
  }
/>

        {/* Redirect the root path to the login page if not authenticated */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
