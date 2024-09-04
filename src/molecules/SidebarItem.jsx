/* eslint-disable react/prop-types */

const SidebarItem = ({ label, route, isActive, onClick }) => {
  return (
    <div
      className={`sidebar-item p-4 cursor-pointer ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`}
      onClick={() => onClick(route)}
    >
      {label}
    </div>
  );
};

export default SidebarItem;
