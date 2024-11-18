import React, { useState, useEffect } from "react";  
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome for icons
import { dataRef } from '../utils/Firebabse';

const DailyStock = () => {
  const [deals, setDeals] = useState([]); // Stock data
  const [newDeal, setNewDeal] = useState({
    itemName: '',
    subCategory: '',
    moveInQty: '',
    moveInDate: '',
    moveOutQty: '',
    moveOutDate: '',
    employee: '',
    balanceQty: '' // Add balanceQty field to newDeal
  });
  const [editId, setEditId] = useState(null);
  const DailyStkRef = dataRef.child('Daily Stock');
  const DailyCatRef = dataRef.child('Daily Stock-Cat'); // New reference for categories
  const SalesRef = dataRef.child('Stock'); // SalesRef path to fetch itemName
  const [categoryOptions, setCategoryOptions] = useState([]); 
  const [newCategory, setNewCategory] = useState('');
  const [openCategory, setOpenCategory] = useState(false);
  
  // State for items from SalesRef and search functionality
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  

  // Fetching all data from Firebase on load
  useEffect(() => {
    // Fetch stock data
    DailyStkRef.on('value', (snapshot) => {
      const stockData = [];
      snapshot.forEach((childSnapshot) => {
        stockData.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setDeals(stockData);
    });

    // Fetch category data
    DailyCatRef.on('value', (snapshot) => {
      const categories = [];
      snapshot.forEach((childSnapshot) => {
        categories.push(childSnapshot.val());
      });
      setCategoryOptions(categories);
    });

    // Fetch items (itemName) from SalesRef
    SalesRef.on('value', (snapshot) => {
      const itemList = [];
      snapshot.forEach((childSnapshot) => {
        itemList.push(childSnapshot.val().itemName); // Assuming each child has an itemName field
      });
      setItems(itemList);
    });

    // Cleanup subscription on unmount
    return () => {
      DailyStkRef.off();
      DailyCatRef.off();
      SalesRef.off();
    };
  }, []);

  // Handling input changes for the form
  const handleChange = (e) => {
    setNewDeal({ ...newDeal, [e.target.name]: e.target.value });
  };

  // Adding or editing deal (stock) in Firebase
  const handleAddOrEditDeal = () => {
    if (newDeal.itemName) {
      const moveInQty = parseInt(newDeal.moveInQty) || 0;
      const moveOutQty = parseInt(newDeal.moveOutQty) || 0;
      const balanceQty = moveInQty - moveOutQty; // Calculate Balance Qty
  
      const dealToSave = {
        ...newDeal,
        balanceQty, // Include balance quantity in the saved data
      };
  
      if (editId !== null) {
        // Editing an existing stock entry
        DailyStkRef.child(editId).update(dealToSave);
        setEditId(null); // Reset edit mode
      } else {
        // Adding a new stock entry
        DailyStkRef.push(dealToSave);
      }
  
      // Reset form
      setNewDeal({
        itemName: '',
        subCategory: '',
        moveInQty: '',
        moveInDate: '',
        moveOutQty: '',
        moveOutDate: '',
        employee: ''
      });
    } else {
      // alert('Please fill in all required fields.');
    }
  };
  

  // Deleting a stock entry from Firebase
  const handleDelete = (id) => {
    DailyStkRef.child(id).remove();
  };

  // Edit an existing deal
  const handleEdit = (deal) => {
    setEditId(deal.id);
    setNewDeal(deal);
  };

  // Filtered items based on search term
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding a new category
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newCategoryObj = { value: newCategory.toLowerCase(), label: newCategory };
      setCategoryOptions((prevOptions) => [...prevOptions, newCategoryObj]);
      setNewCategory(''); // Clear the input field
      setNewDeal((prevDeal) => ({ ...prevDeal, itemCategory: newCategoryObj.value })); // Set the selected category to the new one
      
      // Save the new category to Firebase
      DailyCatRef.push(newCategoryObj);
    }
  };
    // Filtered items based on search term (itemName or subCategory)
    const filteredDeals = deals.filter((deal) =>
      deal.itemName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      deal.subCategory.toLowerCase().includes(searchTerm.toLowerCase())
    );
  

  return (
    <div className="h-[80vh] overflow-x-auto invent-parents p-4">
      <h1 className="text-2xl font-bold mb-4">Daily Stock Management</h1>

      {/* Input Form */}
      <div className="mb-4">
        {/* Searchable Item Dropdown */}
        <input
          type="text"
          placeholder="Search Item"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-2 py-1 mb-2"
        />

        <select
          name="itemName"
          value={newDeal.itemName}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        >
          <option value="" disabled>Select Item</option> {/* Placeholder */}
          {filteredItems.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Category select dropdown with adding new category functionality */}
        <div className="relative">
          <select
            name="subCategory"
            value={newDeal.subCategory}
            onChange={handleChange}
            className="border px-2 py-1 mr-2 mt-[4px]"
          >
            <option value="">Sub Category</option>
            {categoryOptions.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
            <option value="add-new">Add New Category</option>
          </select>

          {newDeal.subCategory === 'add-new' && (
            <div>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category"
                className="border px-2 py-1 mr-2 mt-2"
              />
              <button
                onClick={handleAddCategory}
                className="px-2 py-1 bg-blue-500 text-white"
                disabled={!newCategory.trim()}
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Other form fields */}
        {/* <input
          type="text"
          name="supplier"
          placeholder="Supplier"
          value={newDeal.supplier}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        /> */}
        <input
          type="number"
          name="moveInQty"
          placeholder="Move In Qty"
          value={newDeal.moveInQty}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="date"
          name="moveInDate"
          value={newDeal.moveInDate}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="number"
          name="moveOutQty"
          placeholder="Move Out Qty"
          value={newDeal.moveOutQty}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="date"
          name="moveOutDate"
          value={newDeal.moveOutDate}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          name="employee"
          placeholder="Employee Name"
          value={newDeal.employee}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
        <button
          onClick={handleAddOrEditDeal}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {editId !== null ? 'Update Entry' : 'Add Entry'}
        </button>
      </div>

          {/* Table Display */}
          <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2">SL NO</th>
              <th className="px-4 py-2">Item Name</th>
              <th className="px-4 py-2">Sub Category</th>
              {/* <th className="px-4 py-2">Supplier</th> */}
              <th className="px-4 py-2">Move In Qty</th>
              <th className="px-4 py-2">Move In Date</th>
              <th className="px-4 py-2">Move Out Qty</th>
              <th className="px-4 py-2">Move Out Date</th>
              <th className="px-4 py-2">Employee</th>
              <th className="px-4 py-2">Balance Qty</th> {/* New column for Balance Qty */}
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
          {filteredDeals.map((deal, index) => {
              const moveInQty = parseInt(deal.moveInQty) || 0; // Ensure we have a number
              const moveOutQty = parseInt(deal.moveOutQty) || 0; // Ensure we have a number
              const balanceQty = moveInQty - moveOutQty; // Calculate Balance Qty

              return (
                <tr key={deal.id} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{deal.itemName}</td>
                  <td className="px-4 py-2">{deal.subCategory}</td>
                  {/* <td className="px-4 py-2">{deal.supplier}</td> */}
                  <td className="px-4 py-2">{moveInQty}</td>
                  <td className="px-4 py-2">{deal.moveInDate}</td>
                  <td className="px-4 py-2">{moveOutQty}</td>
                  <td className="px-4 py-2">{deal.moveOutDate}</td>
                  <td className="px-4 py-2">{deal.employee}</td>
                  <td className="px-4 py-2">{balanceQty}</td> {/* Displaying Balance Qty */}
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEdit(deal)}
                      className="text-blue-500 mr-2"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(deal.id)}
                      className="text-red-500"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyStock;

 
