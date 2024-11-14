import React, { useState, useEffect } from "react"; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import { dataRef } from '../utils/Firebabse'; 
import * as XLSX from "xlsx";  // Import XLSX library
import "./General.css"

const SalesPage = () => {
  const [deals, setDeals] = useState([]); // Initialize deals array
  const SalesRef = dataRef.child('Sales'); // Reference to Sales in Firebase
  const [newDeal, setNewDeal] = useState({
    buyer: '',
    supplier: '',
    startDate: '',
    endDate: '',
    dealStatus: 'Pending',
    nextActionDate: '',
  });
  const [editId, setEditId] = useState(null);

  // Fetch deals from Firebase on component mount
  useEffect(() => {
    SalesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dealsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setDeals(dealsArray);
      }
    });
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setNewDeal({ ...newDeal, [e.target.name]: e.target.value });
  };

  // Add or Edit deal
  const handleAddOrEditDeal = () => {
    if (newDeal.buyer && newDeal.supplier) {
      if (editId !== null) {
        // Update existing deal in Firebase
        SalesRef.child(editId).update(newDeal);
        setEditId(null);
      } else {
        // Add new deal to Firebase
        const newDealRef = SalesRef.push();
        newDealRef.set(newDeal);
      }
      setNewDeal({
        buyer: '',
        supplier: '',
        startDate: '',
        endDate: '',
        dealStatus: 'Pending',
        nextActionDate: '',
      });
    } else {
      alert('Please complete the form before submitting.');
    }
  };

  // Delete deal from Firebase
  const handleDelete = (id) => {
    SalesRef.child(id).remove();
  };

  // Set edit mode
  const handleEdit = (deal) => {
    setEditId(deal.id);
    setNewDeal(deal); // Populate form with deal data for editing
  };
  //excel export
  const exportToExcel = () => {
    const formattedData = deals.map((deal, index) => ({
      "SL NO": index + 1,
      "BUYER": deal.buyer,
      "SUPPLIER": deal.supplier,
      "START DATE": deal.startDate,
      "END DATE": deal.endDate,
      "DEAL STATUS": deal.dealStatus,
      "NEXT ACTION DATE": deal.nextActionDate
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData); // Convert ordered data to sheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Deals"); // Append the sheet to the workbook

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, "deals.xlsx");
  };

  return (
    <div className="p-6 bg-[#f0f4f8] w-full h-[92vh] overflow-y-scroll overflow-x-auto invent-parent">
      <div className="flex justify-between items-center mb-4">
        <button className="text-xl font-medium border-b-4 border-black pb-2">
          Enquiry Management
        </button>
        <button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none flex items-center">
          <i className="fas fa-download mr-2"></i>
          Export to Excel
        </button>
      </div>

      {/* Input Form */}
      <div className="mb-4">
        <input
          type="text"
          name="buyer"
          placeholder="Buyer"
          value={newDeal.buyer}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          name="supplier"
          placeholder="Supplier"
          value={newDeal.supplier}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={newDeal.startDate}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={newDeal.endDate}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />

        {/* Deal Status Dropdown */}
        <select
          name="dealStatus"
          value={newDeal.dealStatus}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Done">Done</option>
          <option value="On Progress">On Progress</option>
        </select>

        <input
          type="date"
          name="nextActionDate"
          placeholder="Next Action Date"
          value={newDeal.nextActionDate}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
        <button
          onClick={handleAddOrEditDeal}
          className="bg-blue-500 text-white px-4 py-2 mt-1 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          {editId !== null ? 'Update Deal' : 'Add Deal'}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-left">SL NO</th>
              <th className="px-4 py-2 text-left">BUYER</th>
              <th className="px-4 py-2 text-left">SUPPLIER</th>
              <th className="px-4 py-2 text-left">START DATE</th>
              <th className="px-4 py-2 text-left">END DATE</th>
              <th className="px-4 py-2 text-left">DEAL STATUS</th>
              <th className="px-4 py-2 text-left">NEXT ACTION DATE</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, index) => (
              <tr key={deal.id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{deal.buyer}</td>
                <td className="px-4 py-2">{deal.supplier}</td>
                <td className="px-4 py-2">{deal.startDate}</td>
                <td className="px-4 py-2">{deal.endDate}</td>
                <td className="px-4 py-2">
                  <span className="text-yellow-500 font-semibold">{deal.dealStatus}</span>
                </td>
                <td className="px-4 py-2">{deal.nextActionDate}</td>
                <td className="px-4 py-2 flex space-x-4">
                  <i
                    className="fas fa-edit text-blue-500 cursor-pointer"
                    onClick={() => handleEdit(deal)}
                  ></i>
                  <i
                    className="fas fa-trash-alt text-red-500 cursor-pointer"
                    onClick={() => handleDelete(deal.id)}
                  ></i>
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