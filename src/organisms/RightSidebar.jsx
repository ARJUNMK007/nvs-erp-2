// src/components/organisms/RightSidebar.jsx
import { useLocation } from "react-router-dom";
import RightDash from "../molecules/RightSidebarDashboard";
import Sidebar from "../pages/RightSideBar";

const RightSidebar = () => {
  const location = useLocation();

  return (
    <div className="right-sidebar bg-white ">
      {location.pathname === "/" && (
        <div>
          <RightDash />
        </div>
      )}
      {location.pathname === "/dashboard" && (
        <div>
          <RightDash />
        </div>
      )}
      {location.pathname === "/inventory" && (
        <div>
          {/* <RightDash /> */}
        </div>
      )}
      {location.pathname === "/production" && (
        <div>
          {/* <RightDash /> */}
        </div>
      )}
       {location.pathname === "/production" && (
        <div>
          {/* <RightDash /> */}
        </div>
      )}
       {location.pathname === "/sales" && (
        <div>
         <Sidebar/>
        </div>
      )}
         {location.pathname === "/reports" && (
        <div>
         <Sidebar/>
        </div>
      )}
        {location.pathname === "/help" && (
        <div>
         <Sidebar/>
        </div>
      )}
    </div>
  );
};

export default RightSidebar;
