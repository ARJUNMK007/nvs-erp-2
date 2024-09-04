import React from 'react';

function MoCreator() {
  return (
    <div className="flex justify-between items-center py-4">
      {/* Left side heading */}
      <h1 className="text-xl font-semibold">Create Machine Order</h1>

      {/* Right side buttons */}
      <div className="flex space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
          + Add New MO
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-600 transition duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7v13a2 2 0 002 2h14a2 2 0 002-2V7M8 7V4a2 2 0 012-2h4a2 2 0 012 2v3M16 11l-4 4m0 0l-4-4m4 4V7"
            />
          </svg>
          Export to Excel
        </button>
      </div>
    </div>
  );
}

export default MoCreator;
