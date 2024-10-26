import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,faUsers , faBox, faIndustry, faShoppingBag, faChartLine, faLifeRing, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth"; 
import { auth } from "../utils/Firebabse"; 
import logo from "../assets/tci.png";

const LeftSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false); // Controls sidebar expansion
  const navigate = useNavigate();

  const tabs = [
    { label: "Dashboard", route: "/dashboard", icon: faHome },
    { label: "Inventory", route: "/inventory", icon: faBox },
    { label: "Customers", route: "/customers", icon: faUsers },
    { label: "Production", route: "/production", icon: faIndustry },
    { label: "Sales and Production", route: "/sales", icon: faShoppingBag },
    { label: "Reports", route: "/reports", icon: faChartLine },
    { label: "Help & Support", route: "/help", icon: faLifeRing },
  ];

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logout successful");
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Error logging out:", error.message);
      });
  };

  return (
    <div
      className={`left-sidebar bg-blue-800 h-screen flex flex-col relative transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <div
        className="logo-container cursor-pointer flex items-center justify-center my-6 mx-4"
        onClick={() => setIsExpanded(!isExpanded)} 
      >
        <img src={logo} className="w-12 h-12" alt="Logo" />
      </div>
      
      {/* Tabs */}
      <div className="flex-grow">
        {tabs.map((tab) => (
          <NavLink
            key={tab.route}
            to={tab.route}
            className={({ isActive }) =>
              `sidebar-item p-4 cursor-pointer rounded-l-[28px] transition-all duration-200 flex items-center ${
                isActive ? "bg-gray-100 text-blue-600" : "text-white"
              } ${isExpanded ? "ml-4" : "justify-center"}`
            }
          >
            <FontAwesomeIcon icon={tab.icon} className="mr-3" />
            {isExpanded && <span className="font-semibold">{tab.label}</span>}
          </NavLink>
        ))}
      </div>

      {/* Logout Button */}
      <div className={`absolute bottom-6 w-full ${isExpanded ? "px-4" : "flex justify-center"}`}>
        <button
          onClick={handleLogout}
          className="text-white text-lg font-semibold flex items-center"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          {isExpanded && "Log Out"}
        </button>
        {isExpanded && <p className="text-[12px] mt-[5px] text-center">Powered by MetXR studios @2024</p>}
      </div>
    </div>
  );
};

export default LeftSidebar;
