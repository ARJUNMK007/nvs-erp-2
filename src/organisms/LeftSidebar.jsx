import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox, faIndustry, faShoppingBag, faChartLine, faLifeRing, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import specific icons

const LeftSidebar = () => {
  const tabs = [
    { label: "Dashboard", route: "/dashboard", icon: faHome },
    { label: "Inventory", route: "/inventory", icon: faBox },
    { label: "Production", route: "/production", icon: faIndustry },
    { label: "Sales and Production", route: "/sales", icon: faShoppingBag },
    { label: "Reports", route: "/reports", icon: faChartLine },
    { label: "Help & Support", route: "/help", icon: faLifeRing },
  ];

  return (
    <div className="left-sidebar bg-blue-800 w-full h-screen flex flex-col relative ">
      <h1 className="text-[19px] font-bold text-center my-6 mx-[100px] bg-green-300">L</h1>
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
            <FontAwesomeIcon icon={tab.icon} className="mr-3" /> {/* Icon here */}
            {tab.label}
          </NavLink>
        </div>
      ))}
      <div className="absolute bottom-6 w-full ">
        <div className="flex justify-center">
          <button className="text-[white] text-lg font-semibold flex items-center">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
