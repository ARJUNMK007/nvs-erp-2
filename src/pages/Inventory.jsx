import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { dataRef } from '../utils/Firebabse';

const SalesPage = () => {
  const [deals, setDeals] = useState([]); // Initialize deals array
  const SalesRef = dataRef.child('Stock'); // Reference to Sales in Firebase
  const [newDeal, setNewDeal] = useState({
    itemName: '',
    itemCategory: '',
    currentStock: '',
    itemPrice: '',
    averagePrice: '',
    supplier: '',
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
  // Ensure all required fields are filled out
  if (newDeal.itemName && newDeal.supplier) {
    if (editId !== null) {
      // Update existing deal in Firebase
      SalesRef.child(editId).update(newDeal)
        .then(() => {
          setEditId(null); // Reset edit ID after updating
          setNewDeal({
            itemName: '',
            itemCategory: '',
            currentStock: '',
            itemPrice: '',
            averagePrice: '',
            supplier: '',
          });
        })
        .catch(error => {
          console.error("Error updating deal:", error);
        });
    } else {
      // Add new deal to Firebase
      const newDealRef = SalesRef.push();
      newDealRef.set(newDeal)
        .then(() => {
          setNewDeal({
            itemName: '',
            itemCategory: '',
            currentStock: '',
            itemPrice: '',
            averagePrice: '',
            supplier: '',
          });
        })
        .catch(error => {
          console.error("Error adding deal:", error);
        });
    }
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

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button className="text-xl font-medium border-b-4 border-black pb-2">
          Inventory
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
          name="itemName"
          placeholder="Item Name"
          value={newDeal.itemName}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          name="itemCategory"
          placeholder="Item Category"
          value={newDeal.itemCategory}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="number"
          name="currentStock"
          placeholder="Current Stock"
          value={newDeal.currentStock}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="number"
          name="itemPrice"
          placeholder="Item Price"
          value={newDeal.itemPrice}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="number"
          name="averagePrice"
          placeholder="Average Price"
          value={newDeal.averagePrice}
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

        {/* Deal Status Dropdown */}
       
      
        <button
          onClick={handleAddOrEditDeal}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          {editId !== null ? 'Update Stock' : 'Add Stock'}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-left">SL NO</th>
              <th className="px-4 py-2 text-left">ITEM NAME</th>
              <th className="px-4 py-2 text-left">ITEM CATEGORY</th>
              <th className="px-4 py-2 text-left">CURRENT STOCK</th>
              <th className="px-4 py-2 text-left">ITEM PRICE</th>
              <th className="px-4 py-2 text-left">AVERAGE PRICE</th>
              <th className="px-4 py-2 text-left">SUPPLIER</th>
              <th className="px-4 py-2 text-left">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, index) => (
              <tr key={deal.id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{deal.itemName}</td>
                <td className="px-4 py-2">{deal.itemCategory}</td>
                <td className="px-4 py-2">{deal.currentStock}</td>
                <td className="px-4 py-2">{deal.itemPrice}</td>
                <td className="px-4 py-2">{deal.averagePrice}</td>
                <td className="px-4 py-2">{deal.supplier}</td>
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
