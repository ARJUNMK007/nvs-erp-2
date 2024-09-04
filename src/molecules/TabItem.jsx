/* eslint-disable react/prop-types */


const TabItem = ({ label, isActive, onClick }) => {
  return (
    <div
      className={`tab-item p-2 cursor-pointer ${
        isActive ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"
      }`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default TabItem;
