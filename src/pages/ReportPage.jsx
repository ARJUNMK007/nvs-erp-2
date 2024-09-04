import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

const ReportPage = () => {
  return (
    <div className="w-full h-full p-6">
      <h1 className="text-2xl font-semibold mb-4">Reports</h1>
      <p className="text-sm text-gray-500 mb-6">Here You Can See The Reports Details</p>

      <div className="flex mb-4 border-b">
        <button className="py-2 px-4 text-sm font-medium border-b-2 border-blue-500">
          ALL REPORTS
        </button>
        <button className="py-2 px-4 text-sm font-medium text-gray-500 hover:text-blue-500">
          MRP reports
        </button>
      </div>

      <div className="flex items-center p-4 bg-white shadow rounded-md">
        <FontAwesomeIcon icon={faFilePdf} className="text-red-600 text-2xl mr-4" />
        <div className="flex flex-col flex-grow">
          <span className="text-sm font-medium">Sales REPORT .pdf</span>
          <span className="text-xs text-red-500">18 MB</span>
        </div>
        <button className="py-2 px-4 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
          Download .pdf
        </button>
      </div>
    </div>
  );
};

export default ReportPage;
