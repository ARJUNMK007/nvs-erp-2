import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox, faIndustry, faShoppingBag, faChartLine, faLifeRing, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { signOut } from "firebase/auth"; // Import signOut from Firebase
import { auth } from "../utils/Firebabse" // Import Firebase auth
import logo from "../assets/logosz.png"

const LeftSidebar = () => {
  const navigate = useNavigate(); // Used for navigation after logout

  // Tabs for the sidebar
  const tabs = [
    { label: "Dashboard", route: "/dashboard", icon: faHome },
    { label: "Inventory", route: "/inventory", icon: faBox },
    { label: "Customers", route: "/customers", icon: faLifeRing },
    { label: "Production", route: "/production", icon: faIndustry },
    { label: "Sales and Production", route: "/sales", icon: faShoppingBag },
    { label: "Reports", route: "/reports", icon: faChartLine },
  ];

  // Handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful, navigate to login page
        console.log("Logout successful");
        navigate("/"); // Redirect to the login page
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error logging out:", error.message);
      });
  };

  return (
    <div className="left-sidebar bg-blue-800 w-full h-screen flex flex-col relative">
      <img className=" font-bold text-center my-6 mx-[25px]  w-[150px]"src={logo}/>
      {tabs.map((tab) => (
        <div key={tab.route}>
          <NavLink
            to={tab.route}
            className={({ isActive }) =>
              `sidebar-item p-4 cursor-pointer ml-5 rounded-l-[28px] transition-all duration-200 font-semibold flex items-center ${
                isActive ? "bg-gray-100 text-blue-600 " : "text-white"
              }`
            }
          >
            <FontAwesomeIcon icon={tab.icon} className="mr-3" />
            {tab.label}
          </NavLink>
        </div>
      ))}
      {/* Logout Button */}
      <div className="absolute bottom-6 w-full">
        <div className="flex justify-center items-center flex-col">
          <button
            onClick={handleLogout}
            className="text-[white] text-lg font-semibold flex items-center"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Log Out
          </button>
          <p className="text-[12px] mt-[5px]">Powered by MetXR studios @2024</p>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
