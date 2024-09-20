import React, { useState } from 'react';
import MOCreator from './MoCreator';
import PoCreator from './POCreator';
import Invoice from './Invoice';
import POTracker from './POTracker';




function Production() {
  const [activeTab, setActiveTab] = useState("MO Creator");

  return (
    <div className="relative max-w-full h-[100%] overflow-x-scroll scrollbar-hide p-4">
      {/* Tabs */}
      <div className="flex space-x-8 mb-8">
        <button
          className={`text-xl font-medium ${
            activeTab === "MO Creator"
              ? "border-b-4 border-black"
              : "border-b-4 border-transparent"
          } pb-2`}
          onClick={() => setActiveTab("MO Creator")}
        >
          MO Creator
        </button>
        <button
          className={`text-xl font-medium ${
            activeTab === "PO Creator"
              ? "border-b-4 border-black"
              : "border-b-4 border-transparent"
          } pb-2`}
          onClick={() => setActiveTab("PO Creator")}
        >
          PO Creator
        </button>
        <button
          className={`text-xl font-medium ${
            activeTab === "PO Tracker"
              ? "border-b-4 border-black"
              : "border-b-4 border-transparent"
          } pb-2`}
          onClick={() => setActiveTab("PO Tracker")}
        >
          PO Tracker
        </button>
        <button
          className={`text-xl font-medium ${
            activeTab === "Invoice"
              ? "border-b-4 border-black"
              : "border-b-4 border-transparent"
          } pb-2`}
          onClick={() => setActiveTab("Invoice")}
        >
          Invoice
        </button>
      </div>

      {/* Render the selected component */}
      {activeTab === "MO Creator" && <MOCreator />}
      {activeTab === "PO Creator" && <PoCreator />}
      {activeTab === "PO Tracker" && <POTracker />}
      {activeTab === "Invoice" && <Invoice />}
    </div>
  );
}

export default Production;
