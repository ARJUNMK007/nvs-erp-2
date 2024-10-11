import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { dataRef } from '../utils/Firebabse';
import * as XLSX from "xlsx"; // Import XLSX library

const SalesPage = () => {
  const [options, setOptions] = useState([
    { value: "kg", label: "Kilograms (Kg)" },
    { value: "g", label: "Grams" },
    { value: "cm", label: "Centimeters (Cm)" },
    { value: "m", label: "Meters (M)" },
    { value: "pcs", label: "Pieces" },
  ]);

  const [newOption, setNewOption] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedDeal, setSelectedDeal] = useState(null); // For popup

  const handleAddOption = (e) => {
    e.preventDefault();
    if (newOption && !options.some((option) => option.value === newOption.toLowerCase())) {
      setOptions([...options, { value: newOption.toLowerCase(), label: newOption }]);
      setNewOption("");
      setShowInput(false);
      setSelectedValue(newOption.toLowerCase());
    }
  };

 

  const [rakOptions, setRakOptions] = useState([
    { value: "rak-1", label: "RAK No 1" },
    { value: "rak-2", label: "RAK No 2" },
    { value: "rak-3", label: "RAK No 3" },
  ]);
  const [newRakOption, setNewRakOption] = useState("");
  const [showRakInput, setShowRakInput] = useState(false);
  const [selectedRak, setSelectedRak] = useState("");

  const handleAddRakOption = (e) => {
    e.preventDefault();
    if (newRakOption && !rakOptions.some((option) => option.value === newRakOption.toLowerCase())) {
      setRakOptions([...rakOptions, { value: newRakOption.toLowerCase(), label: newRakOption }]);
      setNewRakOption("");
      setShowRakInput(false);
      setSelectedRak(newRakOption.toLowerCase());
    }
  };
  const handleSEdit = (deal) => {
    setEditId(deal.id);
    setNewDeal(deal); // Populate form with deal data for editing
    setSelectedValue(deal.unit); // Preselect the unit in the dropdown
    setSelectedRak(deal.RackNo); // Preselect the RackNo in the dropdown
  };
  
  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === "add-new") {
      setShowInput(true);
    } else {
      setSelectedValue(value);
      setNewDeal((prevDeal) => ({
        ...prevDeal,
        unit: value, // Update the unit in the newDeal object
      }));
      setShowInput(false);
    }
  };
  
  const handleRakSelectChange = (e) => {
    const value = e.target.value;
    if (value === "add-new-rak") {
      setShowRakInput(true);
    } else {
      setSelectedRak(value);
      setNewDeal((prevDeal) => ({
        ...prevDeal,
        RackNo: value, // Update the RackNo in the newDeal object
      }));
      setShowRakInput(false);
    }
  };
  
  

  const [deals, setDeals] = useState([]); // Initialize deals array
  const SalesRef = dataRef.child('Stock'); // Reference to Sales in Firebase
  const [newDeal, setNewDeal] = useState({
    itemName: '',
    itemCategory: '',
    currentStock: '',
    unit: '', // Unit (Dropdown selection)
    RackNo: '',
    movingStock: '',
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
    if (newDeal.itemName && newDeal.supplier) {
      if (editId !== null) {
        SalesRef.child(editId).update(newDeal)
          .then(() => {
            setEditId(null); // Reset edit ID after updating
            setNewDeal({
              itemName: '',
              itemCategory: '',
              currentStock: '',
              unit: '',
              RackNo: '',
              movingStock: '',
              itemPrice: '',
              averagePrice: '',
              supplier: '',
            });
          })
          .catch(error => {
            console.error("Error updating deal:", error);
          });
      } else {
        const newDealRef = SalesRef.push();
        newDealRef.set(newDeal)
          .then(() => {
            setNewDeal({
              itemName: '',
              itemCategory: '',
              currentStock: '',
              unit: '',
              RackNo: '',
              movingStock: '',
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

  // Open Popup with deal details
  const handleRowClick = (deal) => {
    setSelectedDeal(deal);
  };

  const handleExportToExcel = () => {
    const orderedDeals = deals.map(deal => ({
      SL_NO: deals.indexOf(deal) + 1,
      ITEM_NAME: deal.itemName,
      ITEM_CATEGORY: deal.itemCategory,
      CURRENT_STOCK: deal.currentStock,
      UNIT: deal.unit,
      RACK_NO: deal.RackNo,
      MOVING_STOCK: deal.movingStock,
      ITEM_PRICE: deal.itemPrice,
      AVERAGE_PRICE: deal.averagePrice,
      SUPPLIER: deal.supplier
    }));
   
    const ws = XLSX.utils.json_to_sheet(orderedDeals);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Stock Data");
    XLSX.writeFile(wb, "StockData.xlsx");
  };
// Handle delete unit option
const handleDeleteUnit = (value) => {
  setOptions(options.filter(option => option.value !== value));
};

// Handle delete rack option
const handleDeleteRak = (value) => {
  setRakOptions(rakOptions.filter(option => option.value !== value));
};
  return (
    <div >
      <div className="flex justify-between items-center mb-4">
        <button className="text-xl font-medium border-b-4 border-black pb-2">
          Inventory
        </button>
        <button onClick={handleExportToExcel} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none flex items-center">
          <i className="fas fa-download mr-2"></i>
          Export to Excel
        </button>
      </div>

      {/* Input Form */}
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
     <div className="relative">
    <select
      name="unit"
      value={newDeal.unit}
      onChange={handleSelectChange}
      className="border px-2 py-1 mr-2"
    >
      <option value="">Select Unit</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label} 
        </option>
      ))}
      <option value="add-new">Add New Unit</option>
    </select>

    {/* List of units with delete option */}
    <div className="w-[255px] h-[100px] overflow-auto bg-white m-[5px]">
    <ul >
      {options.map((option) => (
        <li key={option.value} className="flex items-center">
          <span>{option.label}</span>
          <button
            onClick={() => handleDeleteUnit(option.value)}
            className="ml-2 text-red-500"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
    </div>
  </div>

  {/* Conditional input to add a new unit */}
  {showInput && (
    <div>
      <input
        type="text"
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
        placeholder="Enter new unit"
        className="border px-2 py-1 mr-2"
      />
      <button onClick={handleAddOption} className="px-2 py-1 bg-blue-500 text-white">
        Add
      </button>
    </div>
  )}

  {/* Rack Number Selection Dropdown */}
  <div className="relative">
    <select
      name="rakNo"
      value={newDeal.RackNo}
      onChange={handleRakSelectChange}
      className="border px-2 py-1 mr-2"
    >
      <option value="">Select RAK No</option>
      {rakOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
      <option value="add-new-rak">Add New RAK No</option>
    </select>

    {/* List of rack numbers with delete option */}
    <div className="w-[255px] h-[100px] overflow-auto bg-white m-[5px]">
    <ul>
      {rakOptions.map((option) => (
        <li key={option.value} className="flex items-center">
          <span>{option.label}</span>
          <button
            onClick={() => handleDeleteRak(option.value)}
            className="ml-2 text-red-500"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
    </div>
  </div>

  {/* Conditional input to add a new rack */}
  {showRakInput && (
    <div>
      <input
        type="text"
        value={newRakOption}
        onChange={(e) => setNewRakOption(e.target.value)}
        placeholder="Enter new RAK No"
        className="border px-2 py-1 mr-2"
      />
      <button onClick={handleAddRakOption} className="px-2 py-1 bg-blue-500 text-white">
        Add
      </button>
    </div>
  )}
   
        <input
          type="number"
          name="movingStock"
          placeholder="Moving Stock"
          value={newDeal.movingStock}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
          hidden
        />
        <input
          type="number"
          name="itemPrice"
          placeholder="Item Price"
          value={newDeal.itemPrice}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
        {/* <input
          type="number"
          name="averagePrice"
          placeholder="Average Price"
          value={newDeal.averagePrice}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        /> */}
        <input
          type="text"
          name="supplier"
          placeholder="Supplier"
          value={newDeal.supplier}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />

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
              <th className="px-4 py-2 text-left">UNIT</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, index) => (
              <tr key={deal.id} className="border-b cursor-pointer" >
                {/* <td  className="px-4 py-2">{index + 1}</td> */}
                <td onClick={() => handleRowClick(deal)} className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{deal.itemName}</td>
                <td className="px-4 py-2">{deal.itemCategory}</td>
                <td className="px-4 py-2">{deal.currentStock}</td>
                <td className="px-4 py-2">{deal.unit}</td>
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

      {/* Popup/Modal */}
      {selectedDeal && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded shadow-lg w-96">
      <h2 className="text-xl font-semibold mb-4">Deal Details</h2>
      <table className="min-w-full bg-white border">
        <tbody>
          <tr>
            <td className="px-4 py-2 font-semibold border">Rack No:</td>
            <td className="px-4 py-2 border">{selectedDeal.RackNo}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold border">Moving Stock:</td>
            <td className="px-4 py-2 border">{selectedDeal.movingStock}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold border">Item Price:</td>
            <td className="px-4 py-2 border">{selectedDeal.itemPrice}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold border">Average Price:</td>
            <td className="px-4 py-2 border">{selectedDeal.averagePrice}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold border">Supplier:</td>
            <td className="px-4 py-2 border">{selectedDeal.supplier}</td>
          </tr>
        </tbody>
      </table>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => setSelectedDeal(null)}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default SalesPage;
