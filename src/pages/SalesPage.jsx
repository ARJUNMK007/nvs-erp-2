import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const SalesPage = () => {
    const deals = [
        {
          id: 1,
          buyer: 'SSS Pvt Ltd',
          supplier: 'NVS',
          startDate: '23-07-2024',
          endDate: '23-07-2024',
          dealStatus: 'On Progress',
          nextActionDate: '27-08-2024',
        },
      
      ];
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button className="text-xl font-medium border-b-4 border-black pb-2">
          Enquiry Management
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none flex items-center">
          <i className="fas fa-download mr-2"></i>
          Export to Excel
        </button>
      </div>
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left">S NO</th>
            <th className="px-4 py-2 text-left">BUYER</th>
            <th className="px-4 py-2 text-left">SUPPLIER</th>
            <th className="px-4 py-2 text-left">START DATE</th>
            <th className="px-4 py-2 text-left">END DATE</th>
            <th className="px-4 py-2 text-left">DEAL STATUS</th>
            <th className="px-4 py-2 text-left">NEXT ACTION DATE</th>
            <th className="px-4 py-2 text-left">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr key={deal.id} className="border-b">
              <td className="px-4 py-2">{deal.id}</td>
              <td className="px-4 py-2">{deal.buyer}</td>
              <td className="px-4 py-2">{deal.supplier}</td>
              <td className="px-4 py-2">{deal.startDate}</td>
              <td className="px-4 py-2">{deal.endDate}</td>
              <td className="px-4 py-2">
                <span className="text-yellow-500 font-semibold">{deal.dealStatus}</span>
              </td>
              <td className="px-4 py-2">{deal.nextActionDate}</td>
              <td className="px-4 py-2 flex space-x-4">
                <i className="fas fa-check-circle text-green-500 cursor-pointer"></i>
                <i className="fas fa-edit text-blue-500 cursor-pointer"></i>
                <i className="fas fa-trash-alt text-red-500 cursor-pointer"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default SalesPage;
