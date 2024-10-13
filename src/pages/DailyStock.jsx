import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome for icons

const DailyStock= () => {
  const [deals, setDeals] = useState([]); // Stock data
  const [newDeal, setNewDeal] = useState({
    itemName: '',
    subCategory: '',
    supplier: '',
    moveInQty: '',
    moveInDate: '',
    moveOutQty: '',
    moveOutDate: '',
    employee: ''
  });
  const [editId, setEditId] = useState(null);

  // Handling input changes for the form
  const handleChange = (e) => {
    setNewDeal({ ...newDeal, [e.target.name]: e.target.value });
  };

  // Adding or editing deal (stock)
  const handleAddOrEditDeal = () => {
    if (newDeal.itemName && newDeal.supplier) {
      if (editId !== null) {
        // Editing an existing stock entry
        const updatedDeals = deals.map((deal) =>
          deal.id === editId ? { ...deal, ...newDeal } : deal
        );
        setDeals(updatedDeals);
        setEditId(null); // Reset edit mode
      } else {
        // Adding a new stock entry
        setDeals([...deals, { ...newDeal, id: Date.now() }]);
      }

      // Reset form
      setNewDeal({
        itemName: '',
        subCategory: '',
        supplier: '',
        moveInQty: '',
        moveInDate: '',
        moveOutQty: '',
        moveOutDate: '',
        employee: ''
      });
    } else {
      alert('Please fill in all required fields.');
    }
  };

  // Deleting a stock entry
  const handleDelete = (id) => {
    setDeals(deals.filter((deal) => deal.id !== id));
  };

  // Edit an existing deal
  const handleEdit = (deal) => {
    setEditId(deal.id);
    setNewDeal(deal);
  };
  const [categoryOptions, setCategoryOptions] = useState([
    { value: 'electronics', label: 'Electronics' },
    { value: 'books', label: 'Books' },
    { value: 'clothing', label: 'Clothing' },
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [openCategory, setOpenCategory] = useState(false);

  // Handle category selection changes
  const handleSelectChanges = (e) => {
    const { name, value } = e.target;
    setNewDeal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle toggle of category list
  const handleOpenCategory = (value) => {
    setOpenCategory(value);
  };

  // Handle adding a new category
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newCategoryObj = { value: newCategory.toLowerCase(), label: newCategory };
      setCategoryOptions((prevOptions) => [...prevOptions, newCategoryObj]);
      setNewCategory(''); // Clear the input field
      setNewDeal((prevDeal) => ({ ...prevDeal, itemCategory: newCategoryObj.value })); // Set the selected category to the new one
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = (categoryValue) => {
    const filteredCategories = categoryOptions.filter(
      (category) => category.value !== categoryValue
    );
    setCategoryOptions(filteredCategories);
  };

  return (
    <div className="w-full h-[80vh] overflow-x-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daily Stock Management</h1>

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
       <div className="relative">
      {/* Category Select Dropdown */}
      <select
        name="itemCategory"
        value={newDeal.itemCategory}
        onChange={handleSelectChanges}
        className="border px-2 py-1 mr-2 mt-[4px]"
      >
        <option value="">Sub Category</option>
        {categoryOptions.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
        <option value="add-new">Add New Category</option> {/* Option to add new category */}
      </select>

      {/* Edit Icon to Toggle Category List */}
      <i
        className="fas fa-edit text-blue-500 cursor-pointer"
        onClick={() => handleOpenCategory(!openCategory)}
      ></i>

      {/* Category List with Delete Option */}
      {openCategory && (
        <div className="w-[255px] h-[100px] overflow-auto bg-white m-[5px]">
          <ul>
            {categoryOptions.map((category) => (
              <li key={category.value} className="flex items-center">
                <span>{category.label}</span>
                <button
                  onClick={() => {
                    const confirmDelete = window.confirm(`Delete ${category.label}?`);
                    if (confirmDelete) handleDeleteCategory(category.value);
                  }}
                  className="ml-2 text-red-500"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Input to Add a New Category */}
      {newDeal.itemCategory === 'add-new' && (
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
            disabled={!newCategory.trim()} // Disable button if input is empty
          >
            Add
          </button>
        </div>
      )}
    </div>
        <input
          type="text"
          name="supplier"
          placeholder="Supplier"
          value={newDeal.supplier}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
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
              <th className="px-4 py-2">Supplier</th>
              <th className="px-4 py-2">Move In Qty</th>
              <th className="px-4 py-2">Move In Date</th>
              <th className="px-4 py-2">Move Out Qty</th>
              <th className="px-4 py-2">Move Out Date</th>
              <th className="px-4 py-2">Employee</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, index) => (
              <tr key={deal.id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{deal.itemName}</td>
                <td className="px-4 py-2">{deal.subCategory}</td>
                <td className="px-4 py-2">{deal.supplier}</td>
                <td className="px-4 py-2">{deal.moveInQty}</td>
                <td className="px-4 py-2">{deal.moveInDate}</td>
                <td className="px-4 py-2">{deal.moveOutQty}</td>
                <td className="px-4 py-2">{deal.moveOutDate}</td>
                <td className="px-4 py-2">{deal.employee}</td>
                <td className="px-4 py-2">
                <i
                    className="fas fa-edit text-blue-500 cursor-pointer"
                    onClick={() => handleEdit(deal)}
                  ></i>
                  <i
                    className="fas fa-trash-alt text-red-500 cursor-pointer ml-[4px]"
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

export default DailyStock;
