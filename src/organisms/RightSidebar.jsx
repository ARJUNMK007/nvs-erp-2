// src/components/organisms/RightSidebar.jsx
import { useLocation } from "react-router-dom";
import RightDash from "../molecules/RightSidebarDashboard";

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
    </div>
  );
};

export default RightSidebar;
