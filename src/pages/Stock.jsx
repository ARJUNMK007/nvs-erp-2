import React, { useState } from 'react';
import SalesPage from './Inventory';
import DailyStock from './DailyStock';
import InvenTools from './InvenTools';
import MoqStock from './MoqStock';

function Stock({ defaultTab = "Inventory" }) { // Add defaultTab prop
  const [activeTab, setActiveTab] = useState(defaultTab); // Use defaultTab for initial state

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
        <button
          className={`text-xl font-medium ${
            activeTab === "Stock Moq"
              ? "border-b-4 border-black"
              : "border-b-4 border-transparent"
          } pb-2`}
          onClick={() => setActiveTab("Stock Moq")}
        >
          Stock Moq
        </button>
      </div>

      {/* Render the selected component */}
      {activeTab === "Inventory" && <SalesPage />}
      {activeTab === "Daily Stock" && <DailyStock />}
      {activeTab === "Tools" && <InvenTools />}
      {activeTab === "Stock Moq" && <MoqStock />}
    </div>
  );
}

export default Stock;
