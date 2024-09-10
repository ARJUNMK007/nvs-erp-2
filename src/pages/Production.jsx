import React, { useState } from 'react';
import POCreator from './POCreator';
import POTracker from './POTracker';
import MOCreator from './MOCreator'; // Import MO Creator component

function Production() {
  const [activeTab, setActiveTab] = useState("PO Creator");

  return (
    <div className="relative max-w-full h-screen overflow-x-scroll scrollbar-hide p-4">
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
          PO Creator
        </button>
        <button
          className={`text-xl font-medium ${
            activeTab === "PO Creator"
              ? "border-b-4 border-black"
              : "border-b-4 border-transparent"
          } pb-2`}
          onClick={() => setActiveTab("PO Creator")}
        >
          MO Creator
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
      </div>

      {/* Render the selected component */}
      {activeTab === "MO Creator" && <POCreator />}
      {activeTab === "PO Tracker" && <POTracker />}
      {activeTab === "PO Creator" && <MOCreator />}
    </div>
  );
}

export default Production;
