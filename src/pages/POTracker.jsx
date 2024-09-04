import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const POTracker = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 rounded-lg shadow-md">
      <h1 className="text-lg font-semibold mb-6">
        Here You Can See The Tracking Details
      </h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search Current Stock here..."
          className="border rounded px-4 py-2 w-full max-w-sm"
        />
        <button className="flex items-center px-3 py-1 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none">
          <i className="fas fa-filter mr-2"></i> Filter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="w-full bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">PO NO</th>
              <th className="py-3 px-6">Product Name</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6">1124445555</td>
              <td className="py-3 px-6">SASDDDDD</td>
              <td className="py-3 px-6">23-08-2024</td>
              <td className="py-3 px-6 text-red-500">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default POTracker;
