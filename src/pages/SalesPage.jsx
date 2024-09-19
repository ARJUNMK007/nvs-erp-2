import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const SalesPage = () => {
  // Initialize deals with an empty array
  const [deals, setDeals] = useState([]);

  // State to store form values
  const [newDeal, setNewDeal] = useState({
    buyer: '',
    supplier: '',
    startDate: '',
    endDate: '',
    dealStatus: 'Pending', // Default value for the dropdown
    nextActionDate: '',
  });

  // State to manage edit mode
  const [editId, setEditId] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setNewDeal({ ...newDeal, [e.target.name]: e.target.value });
  };

  // Add or Edit deal
  const handleAddOrEditDeal = () => {
    if (newDeal.buyer && newDeal.supplier) {
      if (editId !== null) {
        // Edit existing deal
        setDeals(
          deals.map((deal) =>
            deal.id === editId ? { ...deal, ...newDeal, id: editId } : deal
          )
        );
        setEditId(null); // Clear edit mode
      } else {
        // Add new deal
        const newId = deals.length ? deals[deals.length - 1].id + 1 : 1;
        setDeals([...deals, { ...newDeal, id: newId }]);
      }
      setNewDeal({
        buyer: '',
        supplier: '',
        startDate: '',
        endDate: '',
        dealStatus: 'Pending', // Reset to default
        nextActionDate: '',
      }); // Clear form
    } else {
      alert('Please complete the form before submitting.');
    }
  };

  // Delete deal
  const handleDelete = (id) => {
    setDeals(deals.filter((deal) => deal.id !== id));
  };

  // Set edit mode
  const handleEdit = (deal) => {
    setEditId(deal.id);
    setNewDeal(deal); // Populate form with deal data for editing
  };

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
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          {editId !== null ? 'Update Deal' : 'Add Deal'}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-left">SL NO</th> {/* Serial Number */}
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
            {deals.map((deal, index) => (
              <tr key={deal.id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td> {/* Auto-incremented S No */}
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
