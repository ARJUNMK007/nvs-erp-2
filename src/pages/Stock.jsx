import React, { useState } from 'react';
import SalesPage from './Inventory';
import DailyStock from './DailyStock';
import InvenTools from './InvenTools';





function Stock() {
  const [activeTab, setActiveTab] = useState("Inventory");

  return (
    <div className="relative max-w-full h-[100%] overflow-x-scroll scrollbar-hide p-1">
      {/* Tabs */}
      <div className="flex space-x-8 mb-8">
        <button
          className={`text-xl font-medium ${
            activeTab === "Inventory"
              ? "border-b-4 border-black"
              : "border-b-4 border-transparent"
          } pb-2`}
          onClick={() => setActiveTab("Inventory")}
        >
         Inventory
        </button>
        <button
          className={`text-xl font-medium ${
            activeTab === "Daily Stock"
              ? "border-b-4 border-black"
              : "border-b-4 border-transparent"
          } pb-2`}
          onClick={() => setActiveTab("Daily Stock")}
        >
         Daily Stock
        </button>
        <button
          className={`text-xl font-medium ${
            activeTab === "Tools"
              ? "border-b-4 border-black"
              : "border-b-4 border-transparent"
          } pb-2`}
          onClick={() => setActiveTab("Tools")}
        >
          Tools
        </button>
    
      </div>

      {/* Render the selected component */}
      {activeTab === "Inventory" && <SalesPage />}
      {activeTab === "Daily Stock" && <DailyStock />}
      {activeTab === "Tools" && < InvenTools/>}
      
    </div>
  );
}

export default Stock;
